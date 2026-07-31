// Adaptador de leitura: converte o formato antigo persistido no localStorage
// ({ resources, tools }) para o shape v3 (AssistantConfig), sem perder dados já salvos.
//
// O back-end (Pedro Augusto) ainda está refatorando o contrato JSON. Este adaptador
// isola a UI dessa transição: lê o que existir e devolve sempre um AssistantConfig válido.

import type {
  AssistantConfig,
  Source,
  SourceDatabase,
  SourceDocuments,
  DatabaseType,
  SourceTransport,
} from "@/app/types/assistantConfig";
import { DEFAULT_CONNECTION_META } from "@/app/types/assistantConfig";

function newId() {
  return Math.random().toString(36).slice(2);
}

function withConnectionMeta(s: any) {
  return {
    ...DEFAULT_CONNECTION_META,
    ...s,
    connection_status: s.connection_status ?? DEFAULT_CONNECTION_META.connection_status,
    connection_tested_at: s.connection_tested_at ?? DEFAULT_CONNECTION_META.connection_tested_at,
    connection_error: s.connection_error ?? DEFAULT_CONNECTION_META.connection_error,
  };
}

function defaultModelOverride(model_name: string | null, api_version: string | null) {
  return { model_name, api_version };
}

export function emptyAssistantConfig(): AssistantConfig {
  return {
    schema_version: 3,
    identity: { assistantName: "", avatar: "", persona: "", briefPresentation: "", videoLink: "", restrictions: [] },
    sources: [],
    capabilities: [],
    builtins: {
      knowledge: {
        enabled: true,
        tools: { current_datetime: true, code_execution: true, fetch_url: true, attachments: true },
        mcp_sources: [],
      },
      schedule: { enabled: true },
      visualization: { enabled: true },
    },
    config: {
      use_dag_executor: true,
      use_semantic_namespace_per_resource: true,
      global_temperature: 0.2,
      temperature_decision: 0,
      temperature_generation: 0.3,
      temperature_creative: 0.9,
      answer_depth: "concise",
      insight_enrichment_enabled: false,
      model_large: defaultModelOverride("gpt-4o", "2024-12-01-preview"),
      model_small: defaultModelOverride("gpt-4o-mini", "2024-12-01-preview"),
      model_coding: defaultModelOverride(null, null),
    },
  };
}

/** Já está no shape v3? (tem a chave `sources`) */
function isV3(parsed: any): parsed is AssistantConfig {
  return parsed && typeof parsed === "object" && Array.isArray(parsed.sources);
}

/** Converte o array antigo `resources` (agent_database / agent_documents) em Sources v3. */
function sourcesFromLegacyResources(resources: any[]): Source[] {
  const sources: Source[] = [];
  if (!Array.isArray(resources)) return sources;

  for (const r of resources) {
    if (r?.type === "agent_database" && Array.isArray(r.tools)) {
      for (const p of r.tools) {
        const s: SourceDatabase = {
          id: newId(),
          kind: "database",
          label: "",
          database: (p.database as DatabaseType) || "",
          connection_string: p.connection_string || "",
          use_mcp: !!p.use_mcp,
          introspect: false,
          mcp_host: p.mcp_host || "",
          mcp_port: p.mcp_port || "",
          mcp_transport: (p.mcp_transport as SourceTransport) || "",
          mcp_secret_key: p.mcp_secret_key || "",
          structure: "",
          ...DEFAULT_CONNECTION_META,
        };
        sources.push(s);
      }
    }
    if (r?.type === "agent_documents" && Array.isArray(r.tools)) {
      for (const d of r.tools) {
        const s: SourceDocuments = {
          id: newId(),
          kind: "documents",
          external_id: "",
          label: "",
          connection_string: d.connection_string || "",
          files: [],
          links: [],
          ...DEFAULT_CONNECTION_META,
        };
        sources.push(s);
      }
    }
    // agent_research não tem correspondente em Sources (vira Capability no modelo v3 — etapa 2)
  }
  return sources;
}

/**
 * Lê os campos persistidos do assistente e devolve um AssistantConfig v3.
 * Aceita tanto o novo campo `config` (JSON v3) quanto o legado `resources`/`tools`.
 */
export function readAssistantConfig(fields: {
  config?: string;
  resources?: string;
  tools?: string;
  /** Campo legado da tela Persona — migrado para identity.persona. */
  personaDescription?: string;
  /** Nome do assistente — migrado para identity.assistantName. */
  name?: string;
  /** Criatividade legada (0–1) — migrada para config.global_temperature. */
  creativity?: number;
  /** Apresentação resumida legada — migrada para identity.briefPresentation. */
  briefPresentation?: string;
  /** Link de vídeo legado — migrado para identity.videoLink. */
  videoLink?: string;
}): AssistantConfig {
  // 1. Formato v3 já salvo
  if (fields.config) {
    try {
      const parsed = JSON.parse(fields.config);
      if (isV3(parsed)) {
        const defaults = emptyAssistantConfig();
        // Merge raso por seção — evita que builtins/config salvos antes dessas
        // camadas existirem (ex.: "{}" de etapas anteriores) apaguem os defaults.
        return {
          schema_version: parsed.schema_version ?? defaults.schema_version,
          identity: { ...defaults.identity, ...parsed.identity },
          // Backfill de campos adicionados em etapas posteriores (files/links em
          // Documents, items em FAQ) — sources/capabilities salvas antes deles
          // existirem não têm essas chaves.
          sources: (parsed.sources ?? defaults.sources).map((s: any) => {
            if (s.kind === "mcp") return withConnectionMeta({ external_id: "", ...s });
            if (s.kind !== "documents") return withConnectionMeta(s);
            const fallbackUpdatedAt = new Date().toISOString();
            const merged = withConnectionMeta({ external_id: "", files: [], links: [], ...s });
            merged.files = merged.files.map((f: any) => ({ updatedAt: fallbackUpdatedAt, ...f }));
            merged.links = merged.links.map((l: any) => ({ updatedAt: fallbackUpdatedAt, ...l }));
            return merged;
          }),
          capabilities: (parsed.capabilities ?? defaults.capabilities).map((c: any) =>
            c.kind === "faq" ? { items: [], ...c } : c,
          ),
          builtins: {
            knowledge: {
              ...defaults.builtins.knowledge,
              ...parsed.builtins?.knowledge,
              tools: { ...defaults.builtins.knowledge.tools, ...parsed.builtins?.knowledge?.tools },
            },
            schedule: { ...defaults.builtins.schedule, ...parsed.builtins?.schedule },
            visualization: { ...defaults.builtins.visualization, ...parsed.builtins?.visualization },
          },
          config: { ...defaults.config, ...parsed.config },
        };
      }
    } catch {
      // ignora e tenta legado
    }
  }

  // 2. Legado { resources, tools, personaDescription, name, creativity, briefPresentation, videoLink }
  const base = emptyAssistantConfig();
  if (fields.personaDescription) {
    base.identity.persona = fields.personaDescription;
  }
  if (fields.name) {
    base.identity.assistantName = fields.name;
  }
  if (typeof fields.creativity === "number") {
    base.config.global_temperature = fields.creativity;
  }
  if (fields.briefPresentation) {
    base.identity.briefPresentation = fields.briefPresentation;
  }
  if (fields.videoLink) {
    base.identity.videoLink = fields.videoLink;
  }
  if (fields.resources) {
    try {
      base.sources = sourcesFromLegacyResources(JSON.parse(fields.resources));
    } catch {
      // storage inválido — começa vazio
    }
  }
  return base;
}
