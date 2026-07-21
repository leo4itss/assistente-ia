import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { toastSuccess } from "@/app/lib/toast";
import SourcesSection from "@/app/components/resources/sources/SourcesSection";
import CapabilitiesSection from "@/app/components/resources/capabilities/CapabilitiesSection";
import IdentitySection from "@/app/components/resources/identity/IdentitySection";
import BuiltinsSection from "@/app/components/resources/builtins/BuiltinsSection";
import ConfigSection from "@/app/components/resources/config/ConfigSection";
import { readAssistantConfig, emptyAssistantConfig } from "@/app/lib/assistantConfigAdapter";
import type { Assistant } from "@/app/App";
import type {
  AssistantConfig,
  Source,
  Capability,
  Identity,
  Builtins,
  AssistantRuntimeConfig,
  ValidationErrors,
} from "@/app/types/assistantConfig";

// ─── Navegação (espelha o protótipo v3) ────────────────────────────────────────
type SectionId = "geral" | "identity" | "sources" | "capabilities" | "builtins" | "config";

const NAV_GROUPS: { label: string; items: { id: SectionId; label: string; ready: boolean }[] }[] = [
  {
    label: "ASSISTENTE",
    items: [
      { id: "geral", label: "Geral", ready: false },
      { id: "identity", label: "Identity", ready: true },
    ],
  },
  {
    label: "CATÁLOGO",
    items: [
      { id: "sources", label: "Sources", ready: true },
      { id: "capabilities", label: "Capabilities", ready: true },
    ],
  },
  {
    label: "PLATAFORMA",
    items: [
      { id: "builtins", label: "Builtins", ready: true },
      { id: "config", label: "Config", ready: true },
    ],
  },
];

const initialSectionParam = new URLSearchParams(window.location.search).get("section");
const VALID_SECTIONS: SectionId[] = ["geral", "identity", "sources", "capabilities", "builtins", "config"];
const initialSection: SectionId = VALID_SECTIONS.includes(initialSectionParam as SectionId)
  ? (initialSectionParam as SectionId)
  : "sources";

interface Props {
  onBack: () => void;
  assistant?: Assistant | null;
}

export default function AssistantConfigScreen({ onBack, assistant }: Props) {
  const [config, setConfig] = useState<AssistantConfig>(emptyAssistantConfig());
  const [activeSection, setActiveSection] = useState<SectionId>(initialSection);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDirty, setIsDirty] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!assistant) return;
    setConfig(
      readAssistantConfig({
        config: assistant.config,
        resources: assistant.resources,
        tools: assistant.tools,
        personaDescription: assistant.personaDescription,
      }),
    );
  }, [assistant?.id]);

  const patchConfig = (patch: Partial<AssistantConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
    setIsDirty(true);
    setErrors({});
  };

  const handleSourcesChange = (sources: Source[]) => patchConfig({ sources });
  const handleCapabilitiesChange = (capabilities: Capability[]) => patchConfig({ capabilities });
  const handleIdentityChange = (identity: Identity) => patchConfig({ identity });
  const handleBuiltinsChange = (builtins: Builtins) => patchConfig({ builtins });
  const handleConfigLayerChange = (configLayer: AssistantRuntimeConfig) => patchConfig({ config: configLayer });

  // Quantas capabilities usam cada source — alimenta o badge de relação em SourcesSection.
  const usageBySourceId: Record<string, number> = {};
  config.capabilities.forEach((c) => {
    if ("sourceId" in c && c.sourceId) {
      usageBySourceId[c.sourceId] = (usageBySourceId[c.sourceId] ?? 0) + 1;
    }
  });

  const validate = (): ValidationErrors => {
    const errs: ValidationErrors = {};
    config.sources.forEach((s, i) => {
      const p = `source.${i}`;
      if (!s.label) errs[`${p}.label`] = "Informe um rótulo para a fonte.";
      if (s.kind === "documents" && !s.connection_string) errs[`${p}.connection_string`] = "Informe a string de conexão.";
      if (s.kind === "database") {
        if (!s.database) errs[`${p}.database`] = "Selecione o tipo de banco.";
        if (!s.use_mcp && !s.connection_string) errs[`${p}.connection_string`] = "Informe a string de conexão ou ative use_mcp.";
        if (s.use_mcp && !s.mcp_host) errs[`${p}.mcp_host`] = "Informe o host MCP.";
      }
      if (s.kind === "mcp") {
        if (!s.url) errs[`${p}.url`] = "Informe a URL do MCP.";
        if (!s.transport) errs[`${p}.transport`] = "Selecione o transporte.";
      }
    });
    config.capabilities.forEach((c, i) => {
      const p = `capability.${i}`;
      if (!c.name) errs[`${p}.name`] = "Informe um ID para a capacidade.";
      if ("sourceId" in c && !c.sourceId) errs[`${p}.sourceId`] = "Selecione a source vinculada.";
      if (!c.routing.description) errs[`${p}.routing.description`] = "Descreva quando o supervisor deve acionar esta capacidade.";
      if (!c.instructions) errs[`${p}.instructions`] = "Descreva como o motor deve usar esta capacidade.";
      if (c.kind === "faq") {
        c.items.forEach((item, ii) => {
          const ip = `${p}.items.${ii}`;
          if (!item.question) errs[`${ip}.question`] = "Informe a pergunta.";
          if (!item.answer) errs[`${ip}.answer`] = "Informe a resposta.";
        });
      }
    });
    config.identity.restrictions.forEach((r, i) => {
      const p = `restriction.${i}`;
      if (!r.title) errs[`${p}.title`] = "Informe um título para a restrição.";
      if (!r.instruction) errs[`${p}.instruction`] = "Descreva a regra que o modelo deve seguir.";
    });
    return errs;
  };

  const handleSaveClick = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const keys = Object.keys(errs);
      // garante que a seção com erro esteja visível
      if (keys.some((k) => k.startsWith("source."))) setActiveSection("sources");
      else if (keys.some((k) => k.startsWith("capability."))) setActiveSection("capabilities");
      else if (keys.some((k) => k.startsWith("restriction."))) setActiveSection("identity");
      return;
    }
    setShowSaveDialog(true);
  };

  const handleConfirmSave = () => {
    if (!assistant) {
      setShowSaveDialog(false);
      return;
    }
    const all: Assistant[] = JSON.parse(localStorage.getItem("assistants") || "[]");
    const idx = all.findIndex((a) => a.id === assistant.id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], config: JSON.stringify(config), updatedAt: new Date().toISOString() };
      localStorage.setItem("assistants", JSON.stringify(all));
      window.dispatchEvent(new Event("assistants-updated"));
    }
    setShowSaveDialog(false);
    setIsDirty(false);
    toastSuccess("Configuração salva com sucesso.");
  };

  const hasErrors = Object.keys(errors).length > 0;
  const jsonPreview = JSON.stringify(config, null, 2);

  return (
    <>
      {showSaveDialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowSaveDialog(false)} aria-hidden="true" />
          <div className="bg-[#111827] flex flex-col gap-[32px] items-end p-[24px] relative rounded-[10px] w-full max-w-[425px] shadow-xl z-10">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none text-[#f9fafb] text-[18px] w-full">Salvar configuração?</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px] w-full">As configurações serão salvas e aplicadas ao assistente. Confirma?</p>
            </div>
            <div className="h-0 w-full border-t border-[rgba(255,255,255,0.1)]" />
            <div className="flex gap-[8px] items-center justify-end w-full">
              <button onClick={() => setShowSaveDialog(false)} className="bg-[rgba(255,255,255,0.05)] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Cancelar</span>
              </button>
              <button onClick={handleConfirmSave} className="bg-[#2563eb] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[#1d4ed8] transition-colors">
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Salvar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col w-full h-full bg-[#030712]">
        {/* Header */}
        <div className="bg-[#030712] border-b border-[rgba(255,255,255,0.1)] flex h-[64px] items-center justify-between px-[32px] py-[16px] shrink-0 w-full">
          <div className="flex items-center gap-[16px]">
            <button
              onClick={onBack}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-[8px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M10 12L6 8l4-4" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </button>
            <div className="flex flex-col">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#f9fafb] text-[16px] leading-none">Configuração de IA</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">{assistant?.name ?? "Assistente"}</p>
            </div>
          </div>
          <button
            onClick={() => setShowPreview((v) => !v)}
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">{showPreview ? "Ocultar JSON" : "Ver JSON"}</span>
          </button>
        </div>

        {/* Body: nav | content | preview */}
        <div className="flex flex-1 min-h-0 w-full">
          {/* Nav lateral */}
          <div className="w-[220px] shrink-0 border-r border-[rgba(255,255,255,0.1)] bg-[#0b1220] overflow-y-auto py-[16px]">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-[20px] px-[12px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#6b7280] text-[11px] tracking-[0.5px] px-[8px] mb-[6px]">{group.label}</p>
                {group.items.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-[8px] w-full h-[32px] px-[8px] rounded-[8px] transition-colors ${active ? "bg-[#1f2937]" : "hover:bg-[rgba(255,255,255,0.05)]"}`}
                    >
                      <span className={`font-['Inter:Medium',sans-serif] font-medium text-[14px] ${active ? "text-[#f9fafb]" : "text-[#9ca3af]"}`}>{item.label}</span>
                      {!item.ready && (
                        <span className="ml-auto font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[10px] px-[6px] py-[1px] rounded-full bg-[rgba(255,255,255,0.05)]">em breve</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0 overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="px-[32px] py-[32px] max-w-[820px] mx-auto">
              {activeSection === "sources" ? (
                <SourcesSection sources={config.sources} onChange={handleSourcesChange} errors={errors} usageBySourceId={usageBySourceId} />
              ) : activeSection === "capabilities" ? (
                <CapabilitiesSection capabilities={config.capabilities} onChange={handleCapabilitiesChange} sources={config.sources} errors={errors} />
              ) : activeSection === "identity" ? (
                <IdentitySection identity={config.identity} onChange={handleIdentityChange} errors={errors} />
              ) : activeSection === "builtins" ? (
                <BuiltinsSection builtins={config.builtins} onChange={handleBuiltinsChange} sources={config.sources} />
              ) : activeSection === "config" ? (
                <ConfigSection config={config.config} onChange={handleConfigLayerChange} />
              ) : (
                <SectionPlaceholder id={activeSection} />
              )}
            </div>
          </div>

          {/* Preview JSON */}
          {showPreview && (
            <div className="w-[380px] shrink-0 border-l border-[rgba(255,255,255,0.1)] flex flex-col bg-[#0d1117]">
              <div className="flex items-center justify-between px-[16px] h-[44px] border-b border-[rgba(255,255,255,0.1)] shrink-0">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#9ca3af] text-[12px] tracking-[0.5px]">PREVIEW JSON</p>
              </div>
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={jsonPreview}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: "off",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    renderLineHighlight: "none",
                    folding: true,
                    padding: { top: 12, bottom: 12 },
                    scrollbar: { vertical: "auto", horizontal: "hidden", verticalScrollbarSize: 4 },
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#030712] border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between px-[32px] py-[16px] shrink-0 w-full">
          <div>
            {hasErrors && (
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[14px]">Corrija os erros antes de salvar.</p>
            )}
          </div>
          <div className="flex items-center gap-[12px]">
            <button
              onClick={onBack}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Cancelar</span>
            </button>
            <button
              onClick={handleSaveClick}
              disabled={!isDirty}
              className="bg-[#2563eb] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Salvar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionPlaceholder({ id }: { id: SectionId }) {
  const TITLES: Record<SectionId, { title: string; etapa: string; desc: string }> = {
    geral: { title: "Geral", etapa: "Etapa futura", desc: "Metadados do assistente." },
    identity: { title: "Identity", etapa: "Etapa 3", desc: "Persona e restrictions do assistente." },
    sources: { title: "Sources", etapa: "", desc: "" },
    capabilities: { title: "Capabilities", etapa: "Etapa 2", desc: "Camada semântica: bind a uma source + roteamento + instruções." },
    builtins: { title: "Builtins", etapa: "Etapa 4", desc: "Capacidades nativas: knowledge, schedule, visualization." },
    config: { title: "Config", etapa: "Etapa 4", desc: "Temperatura, modelos, enrichment e feature flags." },
  };
  const t = TITLES[id];
  return (
    <div className="flex flex-col items-center justify-center py-[80px] gap-[12px] text-center">
      <div className="flex items-center justify-center size-[48px] rounded-full bg-[rgba(255,255,255,0.05)]">
        <svg className="size-[22px]" fill="none" viewBox="0 0 24 24">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[18px]">{t.title}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px] max-w-[360px]">{t.desc}</p>
      {t.etapa && (
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#6b7280] text-[12px] px-[10px] py-[3px] rounded-full bg-[rgba(255,255,255,0.05)] mt-[4px]">{t.etapa}</span>
      )}
    </div>
  );
}
