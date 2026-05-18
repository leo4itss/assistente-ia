import { useState, useEffect, useRef } from "react";
import svgPaths from "@/imports/svg-u3bi0j2sg9";
import svgPathsBot from "@/imports/svg-tykfxcr6sn";
import imgAvatar from "figma:asset/c866b4a357fc53387b13b52af16a58d195f9b81f.png";
import imgAvatarAssistant from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import ConversationOptionsPopover from "@/app/components/ConversationOptionsPopover";
import type { Assistant } from "@/app/App";
import { DEFAULT_ASSISTANTS } from "@/app/constants/defaultAssistants";

function IconPanelLeft() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.paee2100} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
      </svg>
    </div>
  );
}

function IconSquarePen() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p32baa780} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function IconSearch() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p3114e300} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function IconBot() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPathsBot.p12482100} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
      </svg>
    </div>
  );
}

function IconChevronRight() {
  return (
    <div className="size-[16px] relative shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d="M6 12L10 8L6 4" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function IconEllipsis() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p36e45a00} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p1a14b300} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p2295f880} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  assistants?: Assistant[];
  onSelectAssistant?: (assistant: Assistant) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, assistants = [], onSelectAssistant }: SidebarProps) {
  const [activePopover, setActivePopover] = useState<{ id: number; top: number; left: number } | null>(null);
  const [assistantsExpanded, setAssistantsExpanded] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };

    if (activePopover) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePopover]);

  const handleEllipsisClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setActivePopover({
      id,
      top: rect.bottom + 4,
      left: rect.left,
    });
  };

  const mockConversations = [
    { id: 1, text: "Quantas peças ainda estão...", hasEllipsis: true },
    { id: 2, text: "elétrica para análise detalh", hasEllipsis: false },
    { id: 3, text: "conexões soltas ou desgas", hasEllipsis: false },
  ];

  return (
    <div
      className={`bg-[#111827] content-stretch flex flex-col items-start relative shrink-0 transition-all duration-300 h-full ${
        sidebarOpen ? "w-[256px]" : "w-0 overflow-hidden"
      }`}
    >
      {/* Header */}
      <div className="bg-[#111827] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
                {/* Avatar */}
                <div className="bg-[#111827] content-stretch flex items-center relative rounded-[10px] shrink-0">
                  <div className="relative rounded-[10px] shrink-0 size-[32px]">
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
                      <div className="absolute bg-[#030712] inset-0 rounded-[10px]" />
                      <img alt="" className="absolute max-w-none object-cover rounded-[10px] size-full" src={imgAvatar} />
                    </div>
                  </div>
                </div>

                {/* ITSS Text */}
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-h-px min-w-px relative">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic overflow-hidden relative shrink-0 text-[#f9fafb] text-[14px] text-ellipsis w-full">
                    ITSS
                  </p>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="bg-[rgba(255,255,255,0)] max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[8px] shrink-0 size-[16px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                >
                  <div className="flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] size-full">
                    <div className="content-stretch flex items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] px-[16px] py-[8px] relative size-full">
                      <IconPanelLeft />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative w-full overflow-y-auto">
        <div className="relative shrink-0 w-full">
          <div className="flex flex-col items-start p-[8px] w-full">
            {/* Menu Buttons */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              {/* Novo Chat */}
              <button className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                    <IconSquarePen />
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap text-left">
                      Novo chat
                    </p>
                  </div>
                </div>
              </button>

              {/* Pesquisar */}
              <button className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                    <IconSearch />
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap text-left">
                      Pesquisar
                    </p>
                  </div>
                </div>
              </button>

              {/* Assistentes */}
              <button
                onClick={() => setAssistantsExpanded(!assistantsExpanded)}
                className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                    <IconBot />
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap text-left">
                      Assistentes
                    </p>
                    <div className={`flex items-center justify-center relative shrink-0 size-[16px] transition-transform ${assistantsExpanded ? 'rotate-90' : ''}`}>
                      <IconChevronRight />
                    </div>
                  </div>
                </div>
              </button>

              {/* Lista de Assistentes Expandida */}
              {assistantsExpanded && (
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full pl-[24px]">
                  {(assistants.length > 0 ? assistants : DEFAULT_ASSISTANTS).map((assistant) => (
                    <button
                      key={assistant.id}
                      onClick={() => {
                        if (onSelectAssistant && 'personaDescription' in assistant) {
                          onSelectAssistant(assistant as Assistant);
                        }
                      }}
                      className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                          <div className="relative rounded-[9999px] shrink-0 size-[16px]">
                            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
                              <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                              <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatarAssistant} />
                            </div>
                          </div>
                          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap text-left">
                            {assistant.name}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conversation History Group */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            {/* Group Label */}
            <div className="h-[32px] opacity-70 relative rounded-[8px] shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
                  <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[12px] text-ellipsis whitespace-nowrap text-left">
                    23/12/25
                  </p>
                </div>
              </div>
            </div>

            {/* Conversation Items */}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              {mockConversations.map((item) => (
                <div
                  key={item.id}
                  className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer group"
                >
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap text-left">
                        {item.text}
                      </p>
                      {item.hasEllipsis && (
                        <div
                          role="button"
                          onClick={(e) => handleEllipsisClick(e, item.id)}
                          className="relative shrink-0 size-[16px] hover:bg-white/10 rounded cursor-pointer"
                        >
                          <IconEllipsis />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Ver mais */}
              <button className="h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors opacity-70">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                    <IconEllipsis />
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap text-left">
                      Ver mais
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {activePopover && (
        <div
          ref={popoverRef}
          className="fixed z-50"
          style={{ top: activePopover.top, left: activePopover.left }}
        >
          <ConversationOptionsPopover />
        </div>
      )}
    </div>
  );
}