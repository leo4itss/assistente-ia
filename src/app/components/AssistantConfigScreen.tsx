import { useState, useEffect, useRef } from "react";
import { PanelLeft } from "lucide-react";
import { toast } from "sonner";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import Editor from "@monaco-editor/react";
import { toastSuccess } from "@/app/lib/toast";
import SourcesSection from "@/app/components/resources/sources/SourcesSection";
import CapabilitiesSection from "@/app/components/resources/capabilities/CapabilitiesSection";
import IdentitySection from "@/app/components/resources/identity/IdentitySection";
import BuiltinsSection from "@/app/components/resources/builtins/BuiltinsSection";
import ConfigSection from "@/app/components/resources/config/ConfigSection";
import AssistantSelectorPopover from "@/app/components/AssistantSelectorPopover";
import CreateAssistantScreen from "@/app/components/CreateAssistantScreen";
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
type SectionId = "identity" | "sources" | "capabilities" | "builtins" | "config";

const NAV_GROUPS: { label: string; items: SectionId[] }[] = [
  { label: "ASSISTENTE", items: ["identity"] },
  { label: "CATÁLOGO", items: ["sources", "capabilities"] },
  { label: "PLATAFORMA", items: ["builtins", "config"] },
];

const SECTION_META: Record<SectionId, { label: string; description: string }> = {
  identity: {
    label: "Persona",
    description: "Configure as capacidades do assistente: fontes de dados, documentos e integrações externas.",
  },
  sources: {
    label: "Fontes",
    description: "Catálogo físico de conexões. As capacidades é que decidem quando usar cada fonte.",
  },
  capabilities: {
    label: "Capacidades",
    description:
      "Opt-in do tenant: se não estiver aqui, o supervisor não enxerga. Bind em source + routing para o supervisor + instructions para o motor.",
  },
  builtins: {
    label: "Recursos Nativos",
    description: "Plataforma (default ON). Podem ser ativadas/desativadas, mas não removidas nem adicionadas pelo usuário.",
  },
  config: {
    label: "Configurações",
    description:
      "Overrides vs Infisical/env. Campos omitidos/null → default da plataforma. Provider/endpoint/credencial Azure não são sobrescrevíveis aqui.",
  },
};

const initialSectionParam = new URLSearchParams(window.location.search).get("section");
const VALID_SECTIONS: SectionId[] = ["identity", "sources", "capabilities", "builtins", "config"];
const initialSection: SectionId = VALID_SECTIONS.includes(initialSectionParam as SectionId)
  ? (initialSectionParam as SectionId)
  : "identity";

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
  const [showPreview, setShowPreview] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);

  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [currentAssistant, setCurrentAssistant] = useState<Assistant | null | undefined>(assistant);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [assistantDropdownOpen, setAssistantDropdownOpen] = useState(false);
  const [showCreateAssistant, setShowCreateAssistant] = useState(false);
  const assistantButtonRef = useRef<HTMLDivElement>(null);
  const assistantPopoverRef = useRef<HTMLDivElement>(null);
  const importJsonInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentAssistant(assistant);
  }, [assistant?.id]);

  useEffect(() => {
    const loadAssistants = () => {
      const stored = localStorage.getItem("assistants");
      if (stored) setAssistants(JSON.parse(stored));
    };
    loadAssistants();
    window.addEventListener("assistants-updated", loadAssistants);
    return () => window.removeEventListener("assistants-updated", loadAssistants);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        assistantDropdownOpen &&
        assistantPopoverRef.current &&
        !assistantPopoverRef.current.contains(event.target as Node) &&
        assistantButtonRef.current &&
        !assistantButtonRef.current.contains(event.target as Node)
      ) {
        setAssistantDropdownOpen(false);
      }
    };
    if (assistantDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [assistantDropdownOpen]);

  useEffect(() => {
    if (!currentAssistant) return;
    setConfig(
      readAssistantConfig({
        config: currentAssistant.config,
        resources: currentAssistant.resources,
        tools: currentAssistant.tools,
        personaDescription: currentAssistant.personaDescription,
        name: currentAssistant.name,
        creativity: currentAssistant.creativity,
        briefPresentation: currentAssistant.briefPresentation,
        videoLink: currentAssistant.videoLink,
      }),
    );
    setIsDirty(false);
  }, [currentAssistant?.id]);

  const switchToAssistant = (next: Assistant) => {
    setCurrentAssistant(next);
    localStorage.setItem("selectedAssistantId", next.id);
    setAssistantDropdownOpen(false);
  };

  const runOrConfirm = (action: () => void) => {
    if (isDirty) {
      setPendingAction(() => action);
    } else {
      action();
    }
  };

  const handleSelectAssistant = (next: Assistant) => {
    if (next.id === currentAssistant?.id) {
      setAssistantDropdownOpen(false);
      return;
    }
    setAssistantDropdownOpen(false);
    runOrConfirm(() => switchToAssistant(next));
  };

  const handleBackClick = () => runOrConfirm(onBack);

  const handleCreateAssistantClick = () => {
    setAssistantDropdownOpen(false);
    runOrConfirm(() => setShowCreateAssistant(true));
  };

  if (showCreateAssistant) {
    return (
      <CreateAssistantScreen
        onBack={() => {
          setShowCreateAssistant(false);
          const stored = localStorage.getItem("assistants");
          if (stored) {
            const all: Assistant[] = JSON.parse(stored);
            setAssistants(all);
            const selectedId = localStorage.getItem("selectedAssistantId");
            const selected = all.find((a) => a.id === selectedId);
            if (selected) setCurrentAssistant(selected);
          }
        }}
      />
    );
  }

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
    if (!config.identity.assistantName) errs["identity.assistantName"] = "Informe o nome do assistente.";
    config.sources.forEach((s, i) => {
      const p = `source.${i}`;
      if (!s.label) errs[`${p}.label`] = "Informe um rótulo para a fonte.";
      if (s.kind === "documents" && !s.connection_string) errs[`${p}.connection_string`] = "Informe a string de conexão.";
      if (s.kind === "documents" && !s.external_id) errs[`${p}.external_id`] = "Informe o ID.";
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

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonPreview);
      toastSuccess("JSON copiado para a área de transferência.");
    } catch {
      toast.error("Não foi possível copiar o JSON.");
    }
  };

  const handleImportClick = () => importJsonInputRef.current?.click();

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        toast.error("Arquivo inválido: não é um JSON válido.");
        return;
      }
      if (!parsed || typeof parsed !== "object" || !Array.isArray((parsed as { sources?: unknown }).sources)) {
        toast.error("JSON não corresponde ao formato esperado (schema v3).");
        return;
      }
      setConfig(readAssistantConfig({ config: text }));
      setIsDirty(true);
      toastSuccess("JSON importado. Revise os campos e clique em Salvar.");
    };
    reader.readAsText(file);
  };

  const handleSaveClick = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const keys = Object.keys(errs);
      // garante que a seção com erro esteja visível
      if (keys.some((k) => k.startsWith("source."))) setActiveSection("sources");
      else if (keys.some((k) => k.startsWith("capability."))) setActiveSection("capabilities");
      else if (keys.some((k) => k.startsWith("restriction.") || k.startsWith("identity."))) setActiveSection("identity");
      return;
    }
    setShowSaveDialog(true);
  };

  const handleConfirmSave = () => {
    if (!currentAssistant) {
      setShowSaveDialog(false);
      return;
    }
    const all: Assistant[] = JSON.parse(localStorage.getItem("assistants") || "[]");
    const idx = all.findIndex((a) => a.id === currentAssistant.id);
    if (idx !== -1) {
      all[idx] = {
        ...all[idx],
        name: config.identity.assistantName,
        briefPresentation: config.identity.briefPresentation,
        videoLink: config.identity.videoLink,
        config: JSON.stringify(config),
        updatedAt: new Date().toISOString(),
      };
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

      {pendingAction && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setPendingAction(null)} aria-hidden="true" />
          <div className="bg-[#111827] flex flex-col gap-[32px] items-end p-[24px] relative rounded-[10px] w-full max-w-[425px] shadow-xl z-10">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none text-[#f9fafb] text-[18px] w-full">Sair sem salvar?</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px] w-full">
                Você tem alterações não salvas em {currentAssistant?.name ?? "este assistente"}. Se continuar, todas as edições feitas serão perdidas.
              </p>
            </div>
            <div className="h-0 w-full border-t border-[rgba(255,255,255,0.1)]" />
            <div className="flex gap-[8px] items-center justify-end w-full">
              <button onClick={() => setPendingAction(null)} className="bg-[rgba(255,255,255,0.05)] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Continuar editando</span>
              </button>
              <button
                onClick={() => {
                  const action = pendingAction;
                  setPendingAction(null);
                  action?.();
                }}
                className="bg-[#2563eb] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[#1d4ed8] transition-colors"
              >
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Sair sem salvar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showJsonModal && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-[#030712]">
          <div className="flex items-center justify-between px-[32px] py-[16px] border-b border-[rgba(255,255,255,0.1)] shrink-0">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">JSON</p>
            <div className="flex items-center gap-[12px]">
              <input
                ref={importJsonInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleImportFile(e.target.files[0]);
                  e.target.value = "";
                }}
              />
              <button
                onClick={handleImportClick}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Importar JSON</span>
              </button>
              <button
                onClick={handleCopyJson}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Copiar JSON</span>
              </button>
              <button
                onClick={() => setShowJsonModal(false)}
                title="Fechar"
                className="flex items-center justify-center size-[32px] rounded-[8px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="json"
              value={jsonPreview}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                folding: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>
      )}

      <div className="flex w-full h-full bg-[#030712]">
        {/* Sidebar */}
        <div className="w-[256px] shrink-0 bg-[#111827] flex flex-col h-full">
          <div className="flex flex-col gap-[8px] items-start p-[8px] shrink-0 w-full">
            <div className="flex gap-[8px] items-center p-[8px] rounded-[8px] w-full">
              <p className="flex-1 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px] leading-none">Customização IA</p>
              <button
                type="button"
                className="flex items-center justify-center shrink-0 size-[32px] rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                aria-label="Alternar sidebar"
              >
                <PanelLeft className="size-[16px] text-[#f9fafb]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
            <div className="p-[8px] w-full">
              <button
                onClick={handleBackClick}
                className="flex items-center gap-[8px] w-full h-[32px] px-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 11.3333 11.3333">
                  <path d="M5.66667 1L1 5.66667L5.66667 10.3333M1 5.66667H10.3333" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#f9fafb]">Voltar para o chat</span>
              </button>
            </div>
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="p-[8px] w-full">
                <div className="flex h-[32px] items-center opacity-70 px-[8px] w-full">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[#9ca3af] text-[12px] leading-[16px]">{group.label}</p>
                </div>
                {group.items.map((id) => {
                  const active = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`flex items-center gap-[8px] w-full h-[32px] px-[8px] rounded-[8px] transition-colors ${active ? "bg-[#1f2937]" : "hover:bg-[rgba(255,255,255,0.05)]"}`}
                    >
                      <span className={`text-[14px] text-[#f9fafb] ${active ? "font-['Inter:Medium',sans-serif] font-medium" : "font-['Inter:Regular',sans-serif] font-normal"}`}>{SECTION_META[id].label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-col flex-1 min-w-0 h-full">
          {/* Assistant switcher */}
          <div className="bg-[#030712] border-b border-[rgba(255,255,255,0.1)] flex h-[64px] items-center justify-between px-[32px] py-[16px] shrink-0 w-full">
            <div className="relative" ref={assistantButtonRef}>
              <div
                onClick={() => setAssistantDropdownOpen((v) => !v)}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[16px] py-[8px] rounded-[8px] w-[228px] cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <div className="relative rounded-[9999px] shrink-0 size-[20px]">
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
                    <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                    <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
                  </div>
                </div>
                <span className="flex-1 min-w-0 font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] truncate">
                  {currentAssistant?.name ?? "Assistentes"}
                </span>
                <svg className="size-[16px] shrink-0 opacity-50" fill="none" viewBox="0 0 7.99667 11.9967">
                  <path d="M0.665 7.99833L3.99833 11.3317L7.33167 7.99833M0.665 3.99833L3.99833 0.665L7.33167 3.99833" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
              {assistantDropdownOpen && (
                <div ref={assistantPopoverRef} className="absolute top-[calc(100%+8px)] left-0 z-50">
                  <AssistantSelectorPopover
                    assistants={assistants}
                    onCreateClick={handleCreateAssistantClick}
                    onSelectAssistant={handleSelectAssistant}
                  />
                </div>
              )}
            </div>
            <button
              onClick={() => setShowPreview((v) => !v)}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">{showPreview ? "Ocultar JSON" : "Ver JSON"}</span>
            </button>
          </div>

          {/* Body: content | preview */}
          <div className="flex flex-1 min-h-0 w-full">
            {/* Conteúdo + footer (largura acompanha a coluna, encolhe quando o JSON abre) */}
            <div className="flex flex-col flex-1 min-w-0 min-h-0">
              <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="px-[32px] py-[32px] max-w-[640px] mx-auto flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Bold',sans-serif] font-bold text-[#f9fafb] text-[20px] leading-[20px]">
                      {SECTION_META[activeSection].label}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px] leading-[20px]">
                      {SECTION_META[activeSection].description}
                    </p>
                  </div>
                  {activeSection === "sources" ? (
                    <SourcesSection sources={config.sources} onChange={handleSourcesChange} errors={errors} usageBySourceId={usageBySourceId} />
                  ) : activeSection === "capabilities" ? (
                    <CapabilitiesSection capabilities={config.capabilities} onChange={handleCapabilitiesChange} sources={config.sources} errors={errors} />
                  ) : activeSection === "identity" ? (
                    <IdentitySection identity={config.identity} onChange={handleIdentityChange} errors={errors} />
                  ) : activeSection === "builtins" ? (
                    <BuiltinsSection builtins={config.builtins} onChange={handleBuiltinsChange} sources={config.sources} />
                  ) : (
                    <ConfigSection config={config.config} onChange={handleConfigLayerChange} />
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#030712] border-t border-[rgba(255,255,255,0.1)] flex flex-col items-center px-[32px] py-[16px] shrink-0 w-full">
                <div className="flex items-center justify-between max-w-[640px] w-full">
                  <div>
                    {hasErrors && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[14px]">Corrija os erros antes de salvar.</p>
                    )}
                  </div>
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

            {/* Preview JSON — ocupa toda a altura do corpo, sem footer por baixo */}
            {showPreview && (
              <div className="w-[380px] shrink-0 border-l border-[rgba(255,255,255,0.1)] flex flex-col bg-[#0d1117]">
                <div className="flex items-center justify-between px-[16px] h-[44px] border-b border-[rgba(255,255,255,0.1)] shrink-0">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#9ca3af] text-[12px] tracking-[0.5px]">PREVIEW JSON</p>
                  <button
                    onClick={() => setShowJsonModal(true)}
                    title="Expandir editor"
                    className="flex items-center justify-center size-[28px] rounded-[6px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  >
                    <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                      <path d="M2 5V2h3M9 2h3v3M12 9v3H9M5 12H2V9" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                    </svg>
                  </button>
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
        </div>
      </div>
    </>
  );
}
