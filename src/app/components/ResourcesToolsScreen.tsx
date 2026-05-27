import { useState, useEffect, useRef } from "react";
import { toastSuccess } from "@/app/lib/toast";
import Editor from "@monaco-editor/react";
import ResourcesTab from "@/app/components/resources/ResourcesTab";
import GlobalToolsTab from "@/app/components/resources/GlobalToolsTab";
import type { Assistant } from "@/app/App";
import type {
  Resource,
  ResourceType,
  AgentDatabase,
  AgentDocuments,
  AgentResearch,
  GlobalTool,
  GlobalToolType,
  McpTool,
  AzureAiSearchTool,
  ValidationErrors,
} from "@/app/types/resourcesTools";

function newId() {
  return Math.random().toString(36).slice(2);
}

function createResource(type: ResourceType): Resource {
  if (type === "agent_database") {
    const r: AgentDatabase = { id: newId(), type: "agent_database", version: "v1", tools: [] };
    return r;
  }
  if (type === "agent_documents") {
    const r: AgentDocuments = { id: newId(), type: "agent_documents", tools: [] };
    return r;
  }
  const r: AgentResearch = { id: newId(), type: "agent_research", tools: [] };
  return r;
}

function createGlobalTool(type: GlobalToolType): GlobalTool {
  if (type === "mcp") {
    const t: McpTool = { id: newId(), type: "mcp", url: "", transport: "", secret_key: "", system_prompt: "" };
    return t;
  }
  const t: AzureAiSearchTool = { id: newId(), type: "azure_ai_search", service_name: "", api_key: "", system_prompt: "" };
  return t;
}

const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  agent_database: "Banco de dados",
  agent_documents: "Documentos",
  agent_research: "Pesquisa",
};

const TOOL_TYPE_LABELS: Record<GlobalToolType, string> = {
  mcp: "MCP",
  azure_ai_search: "Azure AI Search",
};

interface ResourcesToolsScreenProps {
  onBack: () => void;
  assistant?: Assistant | null;
}

type ActiveTab = "recursos" | "ferramentas" | "avancado";

function SaveConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} aria-hidden="true" />
      <div className="bg-[#111827] flex flex-col gap-[32px] items-end p-[24px] relative rounded-[10px] w-full max-w-[425px] shadow-xl z-10">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-col gap-[16px] items-start w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none text-[#f9fafb] text-[18px] w-full">Salvar capacidades?</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px] w-full">As configurações serão salvas e aplicadas ao assistente. Confirma?</p>
        </div>
        <div className="h-0 w-full border-t border-[rgba(255,255,255,0.1)]" />
        <div className="flex gap-[8px] items-center justify-end w-full">
          <button
            onClick={onClose}
            className="bg-[rgba(255,255,255,0.05)] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Cancelar</span>
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#2563eb] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[#1d4ed8] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Salvar</span>
          </button>
        </div>
        <button onClick={onClose} className="absolute right-[16px] rounded-[2px] size-[16px] top-[16px] hover:opacity-80 transition-opacity">
          <svg className="block size-full" fill="none" viewBox="0 0 16 16">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" className="text-[#F9FAFB] opacity-70" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ResourcesToolsScreen({ onBack, assistant: initialAssistant }: ResourcesToolsScreenProps) {
  const [currentAssistant] = useState<Assistant | null>(initialAssistant || null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("recursos");
  const [resources, setResources] = useState<Resource[]>([]);
  const [globalTools, setGlobalTools] = useState<GlobalTool[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [avancadoKey, setAvancadoKey] = useState(0);
  const [jsonEditorError, setJsonEditorError] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const prevTabRef = useRef<ActiveTab>("recursos");
  const [addResourceDropdownOpen, setAddResourceDropdownOpen] = useState(false);
  const addResourceDropdownRef = useRef<HTMLDivElement>(null);
  const addResourceButtonRef = useRef<HTMLButtonElement>(null);
  const [addToolDropdownOpen, setAddToolDropdownOpen] = useState(false);
  const addToolDropdownRef = useRef<HTMLDivElement>(null);
  const addToolButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        addResourceDropdownOpen &&
        addResourceDropdownRef.current && !addResourceDropdownRef.current.contains(e.target as Node) &&
        addResourceButtonRef.current && !addResourceButtonRef.current.contains(e.target as Node)
      ) {
        setAddResourceDropdownOpen(false);
      }
      if (
        addToolDropdownOpen &&
        addToolDropdownRef.current && !addToolDropdownRef.current.contains(e.target as Node) &&
        addToolButtonRef.current && !addToolButtonRef.current.contains(e.target as Node)
      ) {
        setAddToolDropdownOpen(false);
      }
    };
    if (addResourceDropdownOpen || addToolDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [addResourceDropdownOpen, addToolDropdownOpen]);

  useEffect(() => {
    if (!currentAssistant) return;
    try {
      if (currentAssistant.resources) setResources(JSON.parse(currentAssistant.resources));
      if (currentAssistant.tools) setGlobalTools(JSON.parse(currentAssistant.tools));
    } catch {
      // JSON inválido no storage — ignora e começa vazio
    }
  }, [currentAssistant?.id]);

  useEffect(() => {
    if (activeTab === "avancado" && prevTabRef.current !== "avancado") {
      setAvancadoKey((k) => k + 1);
      setJsonEditorError(false);
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

  const handleEditorChange = (val: string | undefined) => {
    if (val === undefined) return;
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed.resources)) setResources(parsed.resources);
      if (Array.isArray(parsed.tools)) setGlobalTools(parsed.tools);
      setIsDirty(true);
      setJsonEditorError(false);
      setErrors({});
    } catch {
      setJsonEditorError(true);
    }
  };

  const handleOpenModal = () => {
    setModalKey((k) => k + 1);
    setShowJsonModal(true);
  };

  const handleCloseModal = () => {
    setShowJsonModal(false);
    setAvancadoKey((k) => k + 1);
  };

  const handleEditorBeforeMount = (monaco: any) => {
    monaco.editor.defineTheme("figma-json", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0d1117",
        "editor.lineHighlightBackground": "#0d111700",
        "scrollbar.shadow": "#0d1117",
        "scrollbarSlider.background": "#37415166",
        "scrollbarSlider.hoverBackground": "#4b556380",
      },
    });
  };

  const handleResourcesChange = (updated: Resource[]) => {
    setResources(updated);
    setIsDirty(true);
    setErrors({});
  };

  const handleGlobalToolsChange = (updated: GlobalTool[]) => {
    setGlobalTools(updated);
    setIsDirty(true);
    setErrors({});
  };

  const validate = (): ValidationErrors => {
    const errs: ValidationErrors = {};

    resources.forEach((resource, ri) => {
      if (resource.type === "agent_database") {
        if (resource.tools.length === 0) {
          errs[`resource.${ri}.tools`] = "Adicione ao menos uma conexão de banco.";
        }
        resource.tools.forEach((provider, pi) => {
          if (!provider.database) errs[`resource.${ri}.tools.${pi}.database`] = "Selecione o tipo de banco.";
          if (!provider.use_mcp && !provider.connection_string) errs[`resource.${ri}.tools.${pi}.connection_string`] = "Informe a string de conexão ou ative MCP.";
          if (!provider.system_prompt) errs[`resource.${ri}.tools.${pi}.system_prompt`] = "Descreva como o agente deve usar esta fonte.";
          if (provider.use_mcp && !provider.mcp_host) errs[`resource.${ri}.tools.${pi}.mcp_host`] = "Informe o host MCP.";
          provider.metadata.forEach((schema, si) => {
            if (!schema.name) errs[`resource.${ri}.tools.${pi}.metadata.${si}.name`] = "Informe o nome do schema.";
            if (schema.tables.length === 0) errs[`resource.${ri}.tools.${pi}.metadata.${si}.tables`] = "Adicione ao menos uma tabela ao schema.";
            schema.tables.forEach((table, ti) => {
              if (!table.name) errs[`resource.${ri}.tools.${pi}.metadata.${si}.tables.${ti}.name`] = "Informe o nome da tabela.";
              table.columns.forEach((col, ci) => {
                if (!col.name) errs[`resource.${ri}.tools.${pi}.metadata.${si}.tables.${ti}.columns.${ci}.name`] = "Toda coluna precisa de um nome.";
              });
            });
          });
        });
      }
      if (resource.type === "agent_documents") {
        resource.tools.forEach((doc, pi) => {
          if (!doc.connection_string) errs[`resource.${ri}.tools.${pi}.connection_string`] = "Informe a string de conexão.";
          if (!doc.system_prompt) errs[`resource.${ri}.tools.${pi}.system_prompt`] = "Descreva como o agente deve usar esta fonte.";
        });
      }
      if (resource.type === "agent_research") {
        resource.tools.forEach((tool, pi) => {
          if (tool.type === "tavily" && !tool.api_key) errs[`resource.${ri}.tools.${pi}.api_key`] = "Informe a API key do Tavily.";
          if (tool.type === "web_search" && tool.country && tool.country.length > 2) errs[`resource.${ri}.tools.${pi}.country`] = "Use código ISO (ex.: BR).";
        });
      }
    });

    globalTools.forEach((tool, ti) => {
      if (tool.type === "mcp") {
        if (!tool.url) errs[`tool.${ti}.url`] = "Informe uma URL válida.";
        if (!tool.transport) errs[`tool.${ti}.transport`] = "Selecione o transporte.";
      }
      if (tool.type === "azure_ai_search") {
        if (!tool.service_name) errs[`tool.${ti}.service_name`] = "Informe o nome do serviço.";
        if (!tool.api_key) errs[`tool.${ti}.api_key`] = "Informe a API key.";
        if (!tool.system_prompt) errs[`tool.${ti}.system_prompt`] = "Descreva como o agente deve usar esta fonte.";
      }
    });

    return errs;
  };

  const handleSaveClick = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setShowSaveDialog(true);
  };

  const handleConfirmSave = () => {
    if (!currentAssistant) return;
    const allAssistants: Assistant[] = JSON.parse(localStorage.getItem("assistants") || "[]");
    const idx = allAssistants.findIndex((a) => a.id === currentAssistant.id);
    if (idx !== -1) {
      allAssistants[idx] = {
        ...allAssistants[idx],
        resources: JSON.stringify(resources),
        tools: JSON.stringify(globalTools),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("assistants", JSON.stringify(allAssistants));
      window.dispatchEvent(new Event("assistants-updated"));
    }
    setShowSaveDialog(false);
    setIsDirty(false);
    toastSuccess("Capacidades salvas com sucesso.");
  };

  const jsonPreview = JSON.stringify(
    { resources, tools: globalTools },
    null,
    2
  );

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <SaveConfirmationDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onConfirm={handleConfirmSave}
      />

      {showJsonModal && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-[#030712]">
          <div className="flex items-center justify-between px-[32px] py-[16px] border-b border-[rgba(255,255,255,0.1)] shrink-0">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">JSON</p>
            <div className="flex items-center gap-[12px]">
              {jsonEditorError && (
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[13px]">JSON inválido — as alterações não serão salvas.</p>
              )}
              <button
                onClick={handleCloseModal}
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
              key={modalKey}
              height="100%"
              defaultLanguage="json"
              defaultValue={jsonPreview}
              onChange={handleEditorChange}
              beforeMount={handleEditorBeforeMount}
              theme="figma-json"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                renderLineHighlight: "none",
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                folding: true,
                padding: { top: 16, bottom: 16 },
                scrollbar: { vertical: "auto", horizontal: "hidden", verticalScrollbarSize: 4 },
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col w-full h-full bg-[#030712]">
        {/* Header */}
        <div className="bg-[#030712] border-b border-[rgba(255,255,255,0.1)] flex h-[64px] items-center px-[32px] py-[16px] shrink-0 w-full">
          <button
            onClick={onBack}
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-[8px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8l4-4" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
          </button>
        </div>

        {/* Page Header: tabs then title */}
        <div className="bg-[#030712] border-b border-[rgba(255,255,255,0.1)] flex flex-col shrink-0 w-full">
          {/* Tabs */}
          <div className="border-b border-[rgba(255,255,255,0.1)] px-[32px]">
            <div className="flex items-center gap-[4px]">
              {(["recursos", "ferramentas", "avancado"] as ActiveTab[]).map((tab) => {
                const labels: Record<ActiveTab, string> = {
                  recursos: "Recursos",
                  ferramentas: "Integrações",
                  avancado: "Avançado (JSON)",
                };
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center justify-center py-[6px] transition-colors ${isActive ? "border-b-2 border-[#2563eb]" : ""}`}
                  >
                    <div className="flex items-center justify-center px-[10px] py-[8px] rounded-[8px]">
                      <p className={`leading-[20px] text-[14px] whitespace-nowrap ${isActive ? "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb]" : "font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af]"}`}>
                        {labels[tab]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Title */}
          <div className="flex items-center justify-between px-[32px] py-[24px]">
            <div className="flex flex-col gap-[4px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-none text-[#f9fafb] text-[20px]">Capacidades</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px]">Configure as capacidades do assistente: fontes de dados, documentos e integrações externas.</p>
            </div>
            <div className="flex items-center gap-[12px]">
              {hasErrors && (
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[14px]">Corrija os erros antes de salvar.</p>
              )}
              {activeTab === "recursos" && (
                <div className="relative">
                  <button
                    ref={addResourceButtonRef}
                    onClick={() => setAddResourceDropdownOpen(!addResourceDropdownOpen)}
                    className="bg-[rgba(255,255,255,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors relative"
                  >
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">Adicionar recurso</span>
                    <svg className="size-[14px] shrink-0 opacity-60" fill="none" viewBox="0 0 14 14">
                      <path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                  </button>
                  {addResourceDropdownOpen && (
                    <div ref={addResourceDropdownRef} className="absolute top-[calc(100%+4px)] right-0 z-50 bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[8px] py-[4px] min-w-[200px] shadow-lg">
                      {(["agent_database", "agent_documents", "agent_research"] as ResourceType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            handleResourcesChange([...resources, createResource(type)]);
                            setAddResourceDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-[12px] py-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                        >
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px]">{RESOURCE_TYPE_LABELS[type]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === "ferramentas" && (
                <div className="relative">
                  <button
                    ref={addToolButtonRef}
                    onClick={() => setAddToolDropdownOpen(!addToolDropdownOpen)}
                    className="bg-[rgba(255,255,255,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors relative"
                  >
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">Adicionar integração</span>
                    <svg className="size-[14px] shrink-0 opacity-60" fill="none" viewBox="0 0 14 14">
                      <path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                  </button>
                  {addToolDropdownOpen && (
                    <div ref={addToolDropdownRef} className="absolute top-[calc(100%+4px)] right-0 z-50 bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[8px] py-[4px] min-w-[200px] shadow-lg">
                      {(["mcp"] as GlobalToolType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            handleGlobalToolsChange([...globalTools, createGlobalTool(type)]);
                            setAddToolDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-[12px] py-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                        >
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px]">{TOOL_TYPE_LABELS[type]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className={`bg-[#030712] flex-[1_0_0] min-h-0 relative w-full [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full ${activeTab === "avancado" ? "overflow-hidden" : "overflow-y-auto"}`}>
          {activeTab === "recursos" && (
            <ResourcesTab
              resources={resources}
              onChange={handleResourcesChange}
              errors={errors}
            />
          )}
          {activeTab === "ferramentas" && (
            <GlobalToolsTab
              tools={globalTools}
              onChange={handleGlobalToolsChange}
              errors={errors}
            />
          )}
          {activeTab === "avancado" && (
            <div className="flex flex-col h-full px-[32px] pt-[32px]">
              <div className="w-full max-w-[800px] mx-auto flex flex-col flex-1 min-h-0 pb-[40px]">
                <div className="flex items-center justify-between mb-[12px] shrink-0">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">JSON</p>
                  <div className="flex items-center gap-[12px]">
                    {jsonEditorError && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[13px]">JSON inválido — as alterações não serão salvas.</p>
                    )}
                    <button
                      onClick={handleOpenModal}
                      title="Expandir editor"
                      className="flex items-center justify-center size-[28px] rounded-[6px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                    >
                      <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                        <path d="M2 5V2h3M9 2h3v3M12 9v3H9M5 12H2V9" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="border border-[rgba(255,255,255,0.1)] rounded-[8px] overflow-hidden flex-1 min-h-0">
                  <Editor
                    key={avancadoKey}
                    height="100%"
                    defaultLanguage="json"
                    defaultValue={jsonPreview}
                    onChange={handleEditorChange}
                    beforeMount={handleEditorBeforeMount}
                    theme="figma-json"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: "on",
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      renderLineHighlight: "none",
                      overviewRulerBorder: false,
                      hideCursorInOverviewRuler: true,
                      folding: true,
                      padding: { top: 12, bottom: 12 },
                      scrollbar: { vertical: "auto", horizontal: "hidden", verticalScrollbarSize: 4 },
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#030712] border-t border-[rgba(255,255,255,0.1)] flex items-center justify-center px-[32px] py-[16px] shrink-0 w-full">
          <div className="flex items-center justify-end gap-[12px] w-full max-w-[800px]">
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
