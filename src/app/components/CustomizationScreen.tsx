import { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "sonner";
import svgPaths from "@/imports/CustomizacaoIaPersona/svg-1m8jzas3y7";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import AssistantSelectorPopover from "@/app/components/AssistantSelectorPopover";
import CreateAssistantScreen from "@/app/components/CreateAssistantScreen";
import EditAssistantScreen from "@/app/components/EditAssistantScreen";
import type { Assistant } from "@/app/App";

interface CustomizationScreenProps {
  onBack: () => void;
  assistant?: Assistant | null;
  onResourcesToolsClick?: () => void;
}

export default function CustomizationScreen({ onBack, assistant: initialAssistant, onResourcesToolsClick }: CustomizationScreenProps) {
  const [assistantDropdownOpen, setAssistantDropdownOpen] = useState(false);
  const [showCreateAssistant, setShowCreateAssistant] = useState(false);
  const [showEditAssistant, setShowEditAssistant] = useState(false);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [currentAssistant, setCurrentAssistant] = useState<Assistant | null>(initialAssistant || null);
  const assistantButtonRef = useRef<HTMLDivElement>(null);
  const assistantPopoverRef = useRef<HTMLDivElement>(null);

  // Carregar assistentes do localStorage
  useEffect(() => {
    const loadAssistants = () => {
      const stored = localStorage.getItem("assistants");
      if (stored) {
        setAssistants(JSON.parse(stored));
      }
    };
    loadAssistants();

    // Listener para atualizar quando assistentes são salvos
    const handleStorageChange = () => {
      loadAssistants();
    };
    window.addEventListener("assistants-updated", handleStorageChange);

    return () => {
      window.removeEventListener("assistants-updated", handleStorageChange);
    };
  }, []);


  const handleEdit = () => {
    if (!currentAssistant) {
      toast.error("Nenhum assistente selecionado");
      return;
    }
    setShowEditAssistant(true);
  };

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

    if (assistantDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [assistantDropdownOpen]);

  if (showEditAssistant && currentAssistant) {
    return <EditAssistantScreen
      assistant={currentAssistant}
      onBack={() => {
        setShowEditAssistant(false);
        // Recarregar assistentes
        const stored = localStorage.getItem("assistants");
        if (stored) {
          setAssistants(JSON.parse(stored));

          // Atualizar assistente atual
          const allAssistants = JSON.parse(stored);
          const updated = allAssistants.find((a: Assistant) => a.id === currentAssistant.id);
          if (updated) {
            setCurrentAssistant(updated);
          }
        }
      }}
    />;
  }

  if (showCreateAssistant) {
    return <CreateAssistantScreen onBack={() => {
      setShowCreateAssistant(false);
      // Recarregar assistentes
      const stored = localStorage.getItem("assistants");
      if (stored) {
        setAssistants(JSON.parse(stored));

        // Carregar o assistente recém-criado se for o selecionado
        const selectedId = localStorage.getItem("selectedAssistantId");
        if (selectedId) {
          const allAssistants = JSON.parse(stored);
          const selected = allAssistants.find((a: Assistant) => a.id === selectedId);
          if (selected) {
            setCurrentAssistant(selected);
          }
        }
      }
    }} />;
  }

  return (
    <div className="content-stretch flex items-start relative w-full h-full bg-[#030712]">
      <Toaster theme="dark" position="bottom-right" />
      {/* Sidebar */}
      <div className="bg-[#111827] content-stretch flex flex-col h-full items-start relative shrink-0 w-[256px]">
        <div className="bg-[#111827] relative shrink-0 w-full" data-name="SidebarHeader">
          <div className="content-stretch flex flex-col items-start p-[8px] relative size-full">
            <div className="relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px relative" data-name="Flex Vertical">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic overflow-hidden relative shrink-0 text-[#f9fafb] text-[14px] text-ellipsis w-full whitespace-nowrap">Customização IA</p>
                  </div>
                  <button className="bg-[rgba(255,255,255,0)] max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[8px] shrink-0 size-[16px] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <div className="flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] size-full">
                      <div className="content-stretch flex items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] px-[16px] py-[8px] relative size-full">
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / Circle">
                          <div className="absolute inset-[8.33%]" data-name="Vector">
                            <div className="absolute inset-[-5%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                                <path d={svgPaths.pb60700} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] min-h-px relative w-full" data-name="SidebarContent">
          <div className="content-stretch flex flex-col items-start py-[8px] relative size-full">
            <div className="relative shrink-0 w-full" data-name="Sidebar / SidebarGroup">
              <div className="content-stretch flex flex-col gap-[16px] items-start p-[8px] relative size-full">
                <div className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="SidebarMenu">
                  <button onClick={onBack} className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Sidebar / SidebarMenuButton">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / ArrowLeft">
                            <div className="absolute inset-[20.83%]" data-name="Vector">
                              <div className="absolute inset-[-10.71%]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3333 11.3333">
                                  <path d={svgPaths.p2ac09e6f} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Voltar para o chat</p>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                    <div className="bg-[#1f2937] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Persona</p>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Sidebar / SidebarMenuButton">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Restrições</p>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Sidebar / SidebarMenuButton">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Cenário de Negócio</p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-stretch flex flex-col flex-1 h-full items-start relative" data-name="Main">
        {/* Header */}
        <div className="bg-[#030712] content-stretch flex h-[64px] items-center justify-between px-[32px] py-[16px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
          <div className="relative">
            <div
              ref={assistantButtonRef}
              onClick={() => setAssistantDropdownOpen(!assistantDropdownOpen)}
              className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[228px] cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              data-name="Combobox"
            >
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
                  <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                  <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
                </div>
              </div>
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">{currentAssistant ? currentAssistant.name : "Assistentes"}</p>
              <div className="opacity-50 overflow-clip relative shrink-0 size-[16px]" data-name="Icon / ChevronsUpDown">
                <div className="absolute inset-[16.67%_29.17%]" data-name="Vector">
                  <div className="absolute inset-[-6.23%_-9.97%_-6.23%_-9.98%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99667 11.9967">
                      <path d={svgPaths.p297c1100} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {assistantDropdownOpen && (
              <div
                ref={assistantPopoverRef}
                className="absolute top-[calc(100%+8px)] left-0 z-50"
              >
                <AssistantSelectorPopover
                  assistants={assistants}
                  onCreateClick={() => {
                    setShowCreateAssistant(true);
                    setAssistantDropdownOpen(false);
                  }}
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

        {/* Page Header */}
        <div className="bg-[#030712] border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between px-[32px] py-[16px] relative shrink-0 w-full">
          <div className="flex items-center gap-[24px]">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-none not-italic text-[#f9fafb] text-[20px]">Persona</p>
            <button
              onClick={onResourcesToolsClick}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#f9fafb] text-[14px] whitespace-nowrap">Resource e Tools</p>
            </button>
          </div>
          <div className="flex flex-col items-end gap-[6px]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none text-[#f9fafb] text-[16px]">
              {assistants.length} de 5 assistentes utilizados
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px]">
              {5 - assistants.length > 0
                ? `Você pode adicionar mais ${5 - assistants.length} assistente${5 - assistants.length > 1 ? "s" : ""}.`
                : "Limite de assistentes atingido."}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-[#030712] flex-[1_0_0] min-h-0 overflow-y-auto relative w-full [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full" data-name="Div">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex items-start justify-center px-[32px] pt-[32px] pb-[80px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[28px] h-full items-end max-w-[640px] min-w-px relative" data-name="FieldSet">
                <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full" data-name="Field Group">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Div">
                    <div className="content-stretch flex items-start pb-[12px] relative shrink-0 w-full" data-name="Field / Legend">
                      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#f9fafb] text-[16px]">Dados do assistente</p>
                    </div>
                  </div>

                  {/* Avatar Upload */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Insira uma novo avatar</p>
                    </div>
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar / Form Field">
                      <div className="relative rounded-[9999px] shrink-0 size-[48px]" data-name="Avatar">
                        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
                          <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                          <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
                        </div>
                      </div>
                      <button className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[rgba(255,255,255,0.08)] transition-colors" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">Fazer upload</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Nome do Assistente */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Nome do Assistente<span className="text-[#f9fafb]">*</span></p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full">
                      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
                          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">
                            {currentAssistant?.name || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Descrição da Persona */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Descrição da persona</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full">
                      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="h-[64px] min-h-[64px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
                          <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[12px] relative size-full">
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">
                              {currentAssistant?.personaDescription || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[min-content]">Descreva a persona do assistente virtual, incluindo personalidade, tom de voz, estilo de comunicação e propósito. Isso garantirá uma experiência natural e alinhada às expectativas dos usuários.</p>
                  </div>

                  {/* Controle de Criatividade */}
                  <div className="bg-[#111827] relative rounded-[14px] shrink-0 w-full" data-name="Card">
                    <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip py-[24px] relative rounded-[inherit] size-full">
                      <div className="relative shrink-0 w-full" data-name="Card Header">
                        <div className="content-stretch flex items-start px-[24px] relative size-full">
                          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px not-italic relative" data-name="Text">
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[16px] w-full">Controle de Criatividade</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-full">Defina o nível de criatividade que o assistente deve adotar.</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full" data-name="Card Content">
                        <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
                          <div className="content-stretch flex gap-[8px] h-[68px] items-center relative shrink-0 w-full" data-name="Slider-02">
                            <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[9px]" data-name="ItemContent">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">0</p>
                            </div>
                            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px py-[5px] relative rounded-[9999px]" data-name="Slider">
                              <div className="bg-[#1f2937] content-stretch flex flex-col items-start relative rounded-[9999px] shrink-0 w-full" data-name="Track">
                                <div className="h-[6px] relative shrink-0 w-full" data-name="Range">
                                  <div className="content-stretch flex flex-col items-start relative size-full">
                                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="SliderTrack">
                                      <div
                                        className="bg-[#2563eb] h-[6px] relative rounded-[9999px] shrink-0"
                                        style={{ width: `${(currentAssistant?.creativity || 0.5) * 100}%` }}
                                        data-name="Track"
                                      />
                                      <div
                                        className="-translate-y-1/2 absolute bg-[#030712] rounded-[9999px] size-[16px] top-1/2 cursor-default"
                                        style={{ left: `calc(${(currentAssistant?.creativity || 0.5) * 100}% - 8px)` }}
                                        data-name="Slider / Item"
                                      >
                                        <div aria-hidden="true" className="absolute border border-[#2563eb] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[7px]" data-name="ItemContent">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-[32px]">1</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                  </div>

                  {/* Apresentação Resumida */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Apresentação Resumida</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full">
                      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="h-[64px] min-h-[64px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
                          <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[12px] relative size-full">
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">
                              {currentAssistant?.briefPresentation || "Digite um resumo breve da apresentação do assistente."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Link de Apresentação */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Link de Apresentação em Vídeo</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full">
                      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
                          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">
                            {currentAssistant?.videoLink || "Cole aqui o link do vídeo de apresentação do assistente."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-[#030712] border-t border-[rgba(255,255,255,0.1)] flex items-center justify-end px-[32px] py-[16px] shrink-0 w-full gap-[12px]">
          <button
            onClick={handleEdit}
            disabled={!currentAssistant}
            className="bg-[#2563eb] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">Editar</p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
