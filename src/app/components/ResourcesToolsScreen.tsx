import { useState, useRef, useEffect } from "react";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import svgPaths from "@/imports/CustomizacaoIaPersona/svg-1m8jzas3y7";
import AssistantSelectorPopover from "@/app/components/AssistantSelectorPopover";
import CreateAssistantScreen from "@/app/components/CreateAssistantScreen";
import ResourcesTab from "@/app/components/resources/ResourcesTab";
import GlobalToolsTab from "@/app/components/resources/GlobalToolsTab";
import type { Assistant } from "@/app/App";
import type {
  Resource,
  GlobalTool,
  ValidationErrors,
} from "@/app/types/resourcesTools";

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
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none text-[#f9fafb] text-[18px] w-full">Salvar Resources e Tools?</p>
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
  const [assistantDropdownOpen, setAssistantDropdownOpen] = useState(false);
  const [showCreateAssistant, setShowCreateAssistant] = useState(false);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [currentAssistant, setCurrentAssistant] = useState<Assistant | null>(initialAssistant || null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("recursos");
  const [resources, setResources] = useState<Resource[]>([]);
  const [globalTools, setGlobalTools] = useState<GlobalTool[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const assistantButtonRef = useRef<HTMLDivElement>(null);
  const assistantPopoverRef = useRef<HTMLDivElement>(null);

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
    if (!currentAssistant) return;
    try {
      if (currentAssistant.resources) setResources(JSON.parse(currentAssistant.resources));
      if (currentAssistant.tools) setGlobalTools(JSON.parse(currentAssistant.tools));
    } catch {
      // JSON inválido no storage — ignora e começa vazio
    }
  }, [currentAssistant?.id]);

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
  };

  const jsonPreview = JSON.stringify(
    { resources, tools: globalTools },
    null,
    2
  );

  if (showCreateAssistant) {
    return (
      <CreateAssistantScreen
        onBack={() => {
          setShowCreateAssistant(false);
          const stored = localStorage.getItem("assistants");
          if (stored) {
            setAssistants(JSON.parse(stored));
            const selectedId = localStorage.getItem("selectedAssistantId");
            if (selectedId) {
              const all = JSON.parse(stored);
              const selected = all.find((a: Assistant) => a.id === selectedId);
              if (selected) setCurrentAssistant(selected);
            }
          }
        }}
      />
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <SaveConfirmationDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onConfirm={handleConfirmSave}
      />

      <div className="content-stretch flex items-start relative w-full h-full bg-[#030712]">
        {/* Sidebar */}
        <div className="bg-[#111827] content-stretch flex flex-col h-full items-start relative shrink-0 w-[256px]">
          <div className="bg-[#111827] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start p-[8px] relative size-full">
              <div className="relative rounded-[8px] shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px relative">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none overflow-hidden text-[#f9fafb] text-[14px] text-ellipsis w-full whitespace-nowrap">Customização IA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[1_0_0] min-h-px relative w-full">
            <div className="content-stretch flex flex-col items-start py-[8px] relative size-full">
              <div className="relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-start p-[8px] relative size-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <button onClick={onBack} className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                      <div className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                            <svg className="shrink-0 size-[16px]" fill="none" viewBox="0 0 11.33 11.33">
                              <path d={svgPaths.p2ac09e6f} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px overflow-hidden text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Voltar para o chat</p>
                          </div>
                        </div>
                      </div>
                    </button>
                    {[
                      { label: "Persona", active: false, onClick: onBack },
                      { label: "Restrições", active: false, onClick: () => {} },
                      { label: "Cenário de Negócio", active: false, onClick: () => {} },
                      { label: "Resources e Tools", active: true, onClick: () => {} },
                    ].map(({ label, active, onClick }) => (
                      <button key={label} onClick={onClick} className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                        <div className={`h-[32px] relative rounded-[8px] shrink-0 w-full transition-colors ${active ? "bg-[#1f2937]" : "hover:bg-[rgba(255,255,255,0.05)]"}`}>
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px overflow-hidden text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">{label}</p>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content-stretch flex flex-col flex-1 h-full items-start relative">
          {/* Header */}
          <div className="bg-[#030712] content-stretch flex h-[64px] items-center justify-between px-[32px] py-[16px] relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
            <div className="relative">
              <div
                ref={assistantButtonRef}
                onClick={() => setAssistantDropdownOpen(!assistantDropdownOpen)}
                className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[228px] cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="relative rounded-[9999px] shrink-0 size-[20px]">
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
                    <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                    <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
                  </div>
                </div>
                <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-w-px overflow-hidden text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">
                  {currentAssistant ? currentAssistant.name : "Assistentes"}
                </p>
                <div className="opacity-50 overflow-clip relative shrink-0 size-[16px]">
                  <div className="absolute inset-[16.67%_29.17%]">
                    <div className="absolute inset-[-6.23%_-9.97%_-6.23%_-9.98%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99667 11.9967">
                        <path d={svgPaths.p297c1100} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {assistantDropdownOpen && (
                <div ref={assistantPopoverRef} className="absolute top-[calc(100%+8px)] left-0 z-50">
                  <AssistantSelectorPopover
                    assistants={assistants}
                    onCreateClick={() => { setShowCreateAssistant(true); setAssistantDropdownOpen(false); }}
                    onSelectAssistant={(assistant) => {
                      setCurrentAssistant(assistant);
                      localStorage.setItem("selectedAssistantId", assistant.id);
                      setAssistantDropdownOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Page Header + Tabs */}
          <div className="bg-[#030712] relative shrink-0 w-full">
            <div className="border-b border-[rgba(255,255,255,0.1)] px-[32px]">
              <div className="flex items-center gap-[4px]">
                {(["recursos", "ferramentas", "avancado"] as ActiveTab[]).map((tab) => {
                  const labels: Record<ActiveTab, string> = {
                    recursos: "Recursos",
                    ferramentas: "Ferramentas globais",
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
                        <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] whitespace-nowrap ${isActive ? "text-[#f9fafb]" : "text-[#9ca3af] font-normal font-['Inter:Regular',sans-serif]"}`}>
                          {labels[tab]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between px-[32px] h-[66px]">
              <div>
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-none text-[#f9fafb] text-[20px]">Resources e Tools</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px] mt-[4px]">Configure bancos de dados, documentos e pesquisa para o assistente.</p>
              </div>
              {hasErrors && (
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[14px]">Corrija os erros antes de salvar.</p>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-[#030712] flex-[1_0_0] min-h-0 overflow-y-auto relative w-full">
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
              <div className="flex flex-row justify-center w-full p-[32px]">
                <div className="w-full max-w-[800px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] mb-[12px]">JSON atual (somente leitura)</p>
                  <pre className="bg-[#0d1117] border border-[rgba(255,255,255,0.1)] rounded-[8px] p-[16px] text-[#9ca3af] text-[12px] leading-[20px] overflow-auto whitespace-pre-wrap break-all">
                    {jsonPreview}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer Save Button */}
          <div className="bg-[#030712] border-t border-[rgba(255,255,255,0.1)] flex items-center justify-end px-[32px] py-[16px] shrink-0 w-full gap-[12px]">
            <button
              onClick={onBack}
              className="bg-[rgba(255,255,255,0.05)] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Voltar</span>
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
