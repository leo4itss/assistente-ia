import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import svgPaths from "@/imports/CustomizacaoIaPersonaEditarPersona/svg-ujv0in80jo";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import DeleteAssistantModal from "@/app/components/DeleteAssistantModal";
import type { Assistant } from "@/app/App";

interface EditAssistantScreenProps {
  onBack: () => void;
  assistant: Assistant;
}

export default function EditAssistantScreen({ onBack, assistant }: EditAssistantScreenProps) {
  const [assistantName, setAssistantName] = useState("");
  const [personaDescription, setPersonaDescription] = useState("");
  const [creativity, setCreativity] = useState(0.5);
  const [briefPresentation, setBriefPresentation] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assistantsCount, setAssistantsCount] = useState(0);

  const MAX_ASSISTANTS = 5;

  useEffect(() => {
    if (assistant) {
      setAssistantName(assistant.name || "");
      setPersonaDescription(assistant.personaDescription || "");
      setCreativity(assistant.creativity || 0.5);
      setBriefPresentation(assistant.briefPresentation || "");
      setVideoLink(assistant.videoLink || "");
    }
    const stored = localStorage.getItem("assistants");
    if (stored) setAssistantsCount(JSON.parse(stored).length);
  }, [assistant]);

  const handleDelete = () => {
    const existingAssistants = JSON.parse(localStorage.getItem("assistants") || "[]");
    const filtered = existingAssistants.filter((a: Assistant) => a.id !== assistant.id);
    localStorage.setItem("assistants", JSON.stringify(filtered));
    localStorage.removeItem("selectedAssistantId");
    window.dispatchEvent(new Event("assistants-updated"));
    setShowDeleteModal(false);
    toast.success("Assistente excluído com sucesso!");
    onBack();
  };

  const handleSave = () => {
    const updatedAssistant = {
      ...assistant,
      name: assistantName,
      personaDescription,
      creativity,
      briefPresentation,
      videoLink,
      updatedAt: new Date().toISOString(),
    };

    // Atualizar no localStorage
    const existingAssistants = JSON.parse(localStorage.getItem("assistants") || "[]");
    const assistantIndex = existingAssistants.findIndex((a: Assistant) => a.id === assistant.id);

    if (assistantIndex !== -1) {
      existingAssistants[assistantIndex] = updatedAssistant;
    }

    localStorage.setItem("assistants", JSON.stringify(existingAssistants));

    // Disparar evento custom para atualizar a lista
    window.dispatchEvent(new Event("assistants-updated"));

    // Feedback visual e voltar
    toast.success("Assistente atualizado com sucesso!");
    onBack();
  };

  return (
    <>
    <Toaster theme="dark" position="bottom-right" />
    <div className="content-stretch flex items-start relative w-full h-full bg-[#030712]">
      {/* Main Content */}
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px relative">
        {/* Header */}
        <div className="bg-[#030712] h-[64px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
              <button
                onClick={onBack}
                className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="overflow-clip relative shrink-0 size-[16px]">
                  <div className="absolute inset-[20.83%]">
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
        <div className="bg-[#030712] relative shrink-0 w-full">
          <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-center px-[32px] py-[16px] relative size-full">
              <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
                  <p className="font-['Inter:Bold',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[#f9fafb] text-[20px] w-full">Editar Persona</p>
                </div>
                <div className="flex flex-col items-end gap-[6px]">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none text-[#f9fafb] text-[16px]">
                    {assistantsCount} de {MAX_ASSISTANTS} assistentes utilizados
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px]">
                    {MAX_ASSISTANTS - assistantsCount > 0
                      ? `Você pode adicionar mais ${MAX_ASSISTANTS - assistantsCount} assistente${MAX_ASSISTANTS - assistantsCount > 1 ? "s" : ""}.`
                      : "Limite de assistentes atingido."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
        </div>

        {/* Form Content */}
        <div className="bg-[#030712] flex-[1_0_0] min-h-0 overflow-y-auto relative w-full [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="flex flex-row justify-center w-full">
            <div className="content-stretch flex items-start justify-center px-[32px] pt-[32px] pb-[80px] relative w-full">
              <div className="content-stretch flex flex-col gap-[28px] items-end max-w-[640px] min-w-px relative w-full">
                {/* Field Group */}
                <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
                  {/* Legend */}
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="content-stretch flex items-start pb-[12px] relative shrink-0 w-full">
                      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#f9fafb] text-[16px]">Dados do assistente</p>
                    </div>
                  </div>

                  {/* Avatar Field */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Insira uma novo avatar</p>
                    </div>
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                      <div className="relative rounded-[9999px] shrink-0 size-[48px]">
                        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
                          <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                          <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
                        </div>
                      </div>
                      <button className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">Fazer upload</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Nome do Assistente */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Nome do Assistente<span className="text-[#f9fafb]">*</span></p>
                    </div>
                    <input
                      type="text"
                      value={assistantName}
                      onChange={(e) => setAssistantName(e.target.value)}
                      className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] px-[12px] py-[4px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] outline-none focus:border-[rgba(255,255,255,0.3)]"
                    />
                  </div>

                  {/* Descrição da persona */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Descrição da persona</p>
                    </div>
                    <textarea
                      value={personaDescription}
                      onChange={(e) => setPersonaDescription(e.target.value)}
                      className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] h-[64px] min-h-[64px] p-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] outline-none focus:border-[rgba(255,255,255,0.3)] resize-none"
                    />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[min-content]">Descreva a persona do assistente virtual, incluindo personalidade, tom de voz, estilo de comunicação e propósito. Isso garantirá uma experiência natural e alinhada às expectativas dos usuários.</p>
                  </div>

                  {/* Controle de Criatividade */}
                  <div className="bg-[#111827] relative rounded-[14px] shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip py-[24px] relative rounded-[inherit] size-full">
                      <div className="relative shrink-0 w-full">
                        <div className="content-stretch flex items-start px-[24px] relative size-full">
                          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px not-italic relative">
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[16px] w-full">Controle de Criatividade</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-full">Defina o nível de criatividade que o assistente deve adotar.</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
                          <div className="content-stretch flex gap-[8px] h-[68px] items-center relative shrink-0 w-full">
                            <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[9px]">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">0</p>
                            </div>
                            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px py-[5px] relative rounded-[9999px]">
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={creativity}
                                onChange={(e) => setCreativity(parseFloat(e.target.value))}
                                className="w-full h-[6px] bg-[#1f2937] rounded-[9999px] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#030712] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#2563eb] [&::-webkit-slider-thumb]:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                                style={{
                                  background: `linear-gradient(to right, #2563eb 0%, #2563eb ${creativity * 100}%, #1f2937 ${creativity * 100}%, #1f2937 100%)`
                                }}
                              />
                            </div>
                            <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[7px]">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-[32px]">1</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                  </div>

                  {/* Apresentação Resumida */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Apresentação Resumida</p>
                    </div>
                    <textarea
                      value={briefPresentation}
                      onChange={(e) => setBriefPresentation(e.target.value)}
                      placeholder="Digite um resumo breve da apresentação do assistente."
                      className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] h-[64px] min-h-[64px] p-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] outline-none focus:border-[rgba(255,255,255,0.3)] resize-none placeholder:text-[#9ca3af]"
                    />
                  </div>

                  {/* Link de Apresentação em Vídeo */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Link de Apresentação em Vídeo</p>
                    </div>
                    <input
                      type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      placeholder="Cole aqui o link do vídeo de apresentação do assistente."
                      className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full border border-[rgba(255,255,255,0.15)] px-[12px] py-[4px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f9fafb] text-[14px] outline-none focus:border-[rgba(255,255,255,0.3)] placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-[#030712] border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between px-[32px] py-[16px] shrink-0 w-full">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-[rgba(248,113,113,0.6)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[rgba(248,113,113,0.8)] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">Deletar</p>
            </div>
          </button>
          <div className="flex gap-[12px] items-center">
            <button
              onClick={onBack}
              className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">Cancelar</p>
              </div>
            </button>
            <button
              onClick={handleSave}
              disabled={!assistantName.trim()}
              className="bg-[#2563eb] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">Salvar</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    {showDeleteModal && (
      <DeleteAssistantModal
        assistant={assistant}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    )}
    </>
  );
}
