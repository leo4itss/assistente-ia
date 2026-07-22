// Modelo de configuração do assistente — shape v3 (Sources + Capabilities + Builtins + Config + Identity).
//
// Baseado no protótipo "Assistant Config v3" apresentado no Check Point de 20/07/2026.
// A camada de SOURCES é o catálogo físico (conexões). A camada de CAPABILITIES é semântica:
// cada capability faz bind a UMA source e diz ao agente quando/como usar aquela fonte.
// Múltiplas capabilities podem apontar para a mesma source — esse é o ponto central do modelo.
//
// Nesta etapa (0+1) apenas SOURCES está totalmente modelado e funcional. As demais camadas
// estão declaradas como stubs para o root JSON já nascer no formato final e serem preenchidas
// nas próximas etapas.

// ─────────────────────────────────────────────────────────────────────────────
// Sources (Bloco B) — catálogo físico de conexões
// ─────────────────────────────────────────────────────────────────────────────

export type SourceKind = "documents" | "database" | "mcp";

export type DatabaseType = "postgresql" | "mysql" | "sqlserver";
export type SourceTransport = "sse" | "stdio" | "http" | "websocket";

/** Arquivo enviado para a base de RAG. Validação (extensão/tamanho) acontece no cliente. */
export interface DocumentFile {
  id: string;
  name: string;
  size: number;
  extension: string;
  status: "ready" | "error";
  /** Motivo da rejeição (extensão não suportada / excede tamanho) — sempre visível ao usuário. */
  error?: string;
}

/** Link de página — passa por extração/web scraping no back-end antes de ir para o RAG. */
export interface DocumentLink {
  id: string;
  url: string;
  status: "ready" | "error";
  error?: string;
}

/** Source de documentos — base de RAG (upload de arquivos e/ou links; extração no back-end). */
export interface SourceDocuments {
  id: string;
  kind: "documents";
  label: string;
  connection_string: string;
  files: DocumentFile[];
  links: DocumentLink[];
}

/** Source de banco de dados — conexão direta ou via MCP com introspecção. */
export interface SourceDatabase {
  id: string;
  kind: "database";
  label: string;
  database: DatabaseType | "";
  connection_string: string;
  use_mcp: boolean;
  introspect: boolean;
  // Config MCP (usada quando use_mcp = true)
  mcp_host: string;
  mcp_port: string;
  mcp_transport: SourceTransport | "";
  mcp_secret_key: string;
  // Estrutura emulada em JSON — usada quando introspect = false (catálogo manual)
  structure: string;
}

/** Source MCP — conexão via camada MCP (tools genéricas / conhecimento). */
export interface SourceMcp {
  id: string;
  kind: "mcp";
  label: string;
  url: string;
  transport: SourceTransport | "";
  secret_key: string;
}

export type Source = SourceDocuments | SourceDatabase | SourceMcp;

// ─────────────────────────────────────────────────────────────────────────────
// Capabilities (Bloco C) — camada semântica; cada capability faz bind a UMA source.
// Múltiplas capabilities podem apontar para a mesma source (ex.: um banco só, uma
// capability "RH" e outra "Contas a Pagar", cada uma com seu próprio scope/instructions).
// ─────────────────────────────────────────────────────────────────────────────

export type CapabilityKind = "database" | "documents" | "research" | "faq";

/** O que o SUPERVISOR lê para decidir quando acionar esta capability. */
export interface CapabilityRouting {
  description: string;
  /** Exemplos de perguntas/temas — um por linha na UI. */
  examples: string[];
}

/** Um par schema → lista de tabelas/views liberadas para esta capability. */
export interface CapabilityScopeEntry {
  id: string;
  schema: string;
  /** Lista de tabelas/views, texto livre separado por vírgula (espelha o protótipo). */
  tables: string;
}

interface CapabilityBase {
  id: string;
  /** Identificador semântico da capability (ex.: "gq_ocorrencias") — o `ID` do protótipo. */
  name: string;
  routing: CapabilityRouting;
  /** O que o MOTOR da capability segue (ex-system_prompt). */
  instructions: string;
}

/** Capability de banco — bind a uma Source kind=database, com recorte de schema/tabelas. */
export interface CapabilityDatabase extends CapabilityBase {
  kind: "database";
  sourceId: string;
  scope: CapabilityScopeEntry[];
}

/** Capability de documentos — bind a uma Source kind=documents. */
export interface CapabilityDocuments extends CapabilityBase {
  kind: "documents";
  sourceId: string;
}

/** Capability de pesquisa — bind opcional a uma Source kind=mcp (ex.: web/search tools). */
export interface CapabilityResearch extends CapabilityBase {
  kind: "research";
  sourceId: string;
}

/** Anexo (arquivo ou link) vinculado a um par pergunta/resposta de FAQ. */
export interface FaqAttachment {
  id: string;
  type: "file" | "link";
  label: string;
}

/**
 * Par pergunta/resposta de FAQ. A informação semântica vem da própria pergunta e
 * resposta — diferente de Documents, os attachments aqui NÃO passam por File
 * Processing/RAG; ficam disponíveis apenas como referência anexada.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  attachments: FaqAttachment[];
}

/** Capability de FAQ — sem bind a source (attachments por par pergunta/resposta — Bloco E). */
export interface CapabilityFaq extends CapabilityBase {
  kind: "faq";
  items: FaqItem[];
}

export type Capability = CapabilityDatabase | CapabilityDocuments | CapabilityResearch | CapabilityFaq;

/** Kinds de Source compatíveis para bind, por kind de Capability. Vazio = sem bind. */
export const CAPABILITY_SOURCE_COMPATIBILITY: Record<CapabilityKind, SourceKind[]> = {
  database: ["database"],
  documents: ["documents"],
  research: ["mcp"],
  faq: [],
};

export const CAPABILITY_KIND_LABELS: Record<CapabilityKind, string> = {
  database: "Banco de dados",
  documents: "Documentos",
  research: "Pesquisa",
  faq: "FAQ",
};

// ─────────────────────────────────────────────────────────────────────────────
// Identity (Bloco A) — persona e guardrails de produto. Não entra no catálogo de
// roteamento do supervisor (diferente de Capabilities). Hoje é soft prompt; o
// enforcement via rails é um plano separado — aqui só a configuração.
// ─────────────────────────────────────────────────────────────────────────────

export interface Restriction {
  id: string;
  title: string;
  /** Regra que o modelo deve seguir. */
  instruction: string;
  /** Resposta padrão a dar ao usuário quando a restrição é acionada. */
  instructionAnswer: string;
  restrictedWords: string[];
}

export interface Identity {
  /** Nome do assistente. Campo fixo (sempre existe). Espelhado em Assistant.name ao salvar. */
  assistantName: string;
  /** Avatar do assistente (data URL). Campo fixo; cosmético nesta etapa. */
  avatar: string;
  persona: string;
  /** Resumo breve do assistente — migrado de Assistant.briefPresentation (tela de criação). */
  briefPresentation: string;
  /** Link de vídeo de apresentação — migrado de Assistant.videoLink (tela de criação). */
  videoLink: string;
  restrictions: Restriction[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Builtins (Bloco D) — capacidades nativas da plataforma. Entram no agente por
// padrão (default ON); podem ser ativadas/desativadas mas não removidas nem
// adicionadas pelo usuário. Sem routing/description na config — isso vem do código.
// ─────────────────────────────────────────────────────────────────────────────

export interface BuiltinKnowledge {
  enabled: boolean;
  tools: {
    current_datetime: boolean;
    code_execution: boolean;
    fetch_url: boolean;
    attachments: boolean;
  };
  /** IDs de sources com kind="mcp" referenciadas por este builtin. */
  mcp_sources: string[];
}

export interface BuiltinToggle {
  enabled: boolean;
}

export interface Builtins {
  knowledge: BuiltinKnowledge;
  schedule: BuiltinToggle;
  visualization: BuiltinToggle;
}

// ─────────────────────────────────────────────────────────────────────────────
// Config (Bloco D) — overrides de plataforma vs. Infisical/env. Campos omitidos
// ou null usam o default da plataforma. Provider/endpoint/credencial Azure não
// são sobrescrevíveis aqui.
// ─────────────────────────────────────────────────────────────────────────────

export interface ModelOverride {
  model_name: string | null;
  api_version: string | null;
}

export type AnswerDepth = "concise" | "balanced" | "detailed";

export const ANSWER_DEPTH_LABELS: Record<AnswerDepth, string> = {
  concise: "concise — só o pedido",
  balanced: "balanced — contexto moderado",
  detailed: "detailed — explicação completa",
};

export interface AssistantRuntimeConfig {
  use_dag_executor: boolean;
  use_semantic_namespace_per_resource: boolean;
  global_temperature: number;
  temperature_decision: number;
  temperature_generation: number;
  temperature_creative: number;
  answer_depth: AnswerDepth;
  insight_enrichment_enabled: boolean;
  model_large: ModelOverride;
  model_small: ModelOverride;
  model_coding: ModelOverride;
}

/** Root do JSON de configuração do assistente (v3). */
export interface AssistantConfig {
  /** Versão do schema — usada pelo back-end para versionamento/rollback. Read-only na UI. */
  schema_version: number;
  identity: Identity;
  sources: Source[];
  capabilities: Capability[];
  builtins: Builtins;
  config: AssistantRuntimeConfig;
}

// ─────────────────────────────────────────────────────────────────────────────
// Validação
// ─────────────────────────────────────────────────────────────────────────────

export interface ValidationErrors {
  [fieldPath: string]: string;
}

export const SOURCE_KIND_LABELS: Record<SourceKind, string> = {
  documents: "Documentos",
  database: "Banco de dados",
  mcp: "MCP",
};
