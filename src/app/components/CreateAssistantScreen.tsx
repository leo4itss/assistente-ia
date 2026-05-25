import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import svgPaths from "@/imports/CustomizacaoIaPersonaCriarPersona/svg-iyj974iz86";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

interface CreateAssistantScreenProps {
  onBack: () => void;
}

export default function CreateAssistantScreen({ onBack }: CreateAssistantScreenProps) {
  const [assistantName, setAssistantName] = useState("");
  const [personaDescription, setPersonaDescription] = useState("");
  const [creativity, setCreativity] = useState(0.5);
  const [briefPresentation, setBriefPresentation] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [currentAssistantsCount, setCurrentAssistantsCount] = useState(0);

  const MAX_ASSISTANTS = 5;

  useEffect(() => {
    const stored = localStorage.getItem("assistants");
    if (stored) {
      const assistants = JSON.parse(stored);
      setCurrentAssistantsCount(assistants.length);
    }
  }, []);

  const remainingSlots = MAX_ASSISTANTS - currentAssistantsCount;

  const handleSave = () => {
    // Verificar se atingiu o limite
    const existingAssistants = JSON.parse(localStorage.getItem("assistants") || "[]");
    if (existingAssistants.length >= MAX_ASSISTANTS) {
      toast.error(`Você atingiu o limite de ${MAX_ASSISTANTS} assistentes. Faça upgrade para criar mais!`);
      return;
    }

    const newAssistant = {
      id: Date.now().toString(),
      name: assistantName,
      personaDescription,
      creativity,
      briefPresentation,
      videoLink,
      createdAt: new Date().toISOString(),
    };

    // Salvar no localStorage
    existingAssistants.push(newAssistant);
    localStorage.setItem("assistants", JSON.stringify(existingAssistants));

    // Selecionar o novo assistente automaticamente
    localStorage.setItem("selectedAssistantId", newAssistant.id);

    // Disparar evento custom para atualizar a lista
    window.dispatchEvent(new Event("assistants-updated"));

    toast.success("Assistente criado com sucesso!");
    onBack();
  };

  return (
    <div className="content-stretch flex items-start relative w-full h-full bg-[#030712]">
      <Toaster theme="dark" position="bottom-right" />
      {/* Main Content */}
      <div className="content-stretch flex flex-col flex-1 h-full items-start relative" data-name="Main">
        {/* Header */}
        <div className="bg-[#030712] h-[64px] relative shrink-0 w-full" data-name="Header">
          <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
              <button
                onClick={onBack}
                className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                data-name="Button"
              >
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / ArrowLeft">
                  <div className="absolute inset-[20.83%]" data-name="Vector">
                    <div className="absolute inset-[-7.13%_-7.12%_-7.12%_-7.13%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6633 10.6633">
                        <path d={svgPaths.p458e400} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-[#030712] relative shrink-0 w-full" data-name="Page Header">
          <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-center px-[32px] py-[16px] relative size-full">
              <div className="content-stretch flex gap-[24px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Div">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#f9fafb] text-[20px] w-full">Criar Persona</p>
                </div>
                <div className="content-stretch flex flex-col gap-[6px] items-end not-italic relative shrink-0 text-right w-[682px]" data-name="Text">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[16px] w-[682px]">{currentAssistantsCount} de {MAX_ASSISTANTS} assistentes utilizados</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-[451px]">
                    {remainingSlots > 0
                      ? `Você pode adicionar mais ${remainingSlots} ${remainingSlots === 1 ? 'assistente' : 'assistentes'}.`
                      : 'Você atingiu o limite de assistentes. Faça upgrade para criar mais.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
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
                      <button className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[rgba(255,255,255,0.1)] transition-colors" data-name="Button">
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
                    <input
                      type="text"
                      value={assistantName}
                      onChange={(e) => setAssistantName(e.target.value)}
                      placeholder="Digite o nome que identificará o assistente."
                      className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] px-[12px] py-[4px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] placeholder:text-[#9ca3af] outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors"
                    />
                  </div>

                  {/* Descrição da Persona */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Descrição da persona</p>
                    </div>
                    <textarea
                      value={personaDescription}
                      onChange={(e) => setPersonaDescription(e.target.value)}
                      placeholder="Descreva a personalidade e o propósito do assistente."
                      className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] min-h-[64px] p-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] placeholder:text-[#9ca3af] outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors resize-none"
                      rows={3}
                    />
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
                                  <div className="content-stretch flex flex-col items-start pr-[150px] relative size-full">
                                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="SliderTrack">
                                      <div className="bg-[#2563eb] h-[6px] relative rounded-[9999px] shrink-0 w-full" data-name="Track" />
                                      <div className="-translate-y-1/2 absolute bg-[#030712] right-[-8px] rounded-[9999px] size-[16px] top-1/2 cursor-pointer" data-name="Slider / Item">
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
                    <textarea
                      value={briefPresentation}
                      onChange={(e) => setBriefPresentation(e.target.value)}
                      placeholder="Digite um resumo breve da apresentação do assistente."
                      className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] min-h-[64px] p-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] placeholder:text-[#9ca3af] outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Link de Apresentação */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Link de Apresentação em Vídeo</p>
                    </div>
                    <input
                      type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      placeholder="Cole aqui o link do vídeo de apresentação do assistente."
                      className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] px-[12px] py-[4px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] placeholder:text-[#9ca3af] outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-[#030712] border-t border-[rgba(255,255,255,0.1)] flex items-center justify-end px-[32px] py-[16px] shrink-0 w-full gap-[12px]">
          <button
            onClick={handleSave}
            disabled={!assistantName.trim() || remainingSlots <= 0}
            className="bg-[#2563eb] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">{remainingSlots <= 0 ? 'Limite atingido' : 'Salvar'}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
