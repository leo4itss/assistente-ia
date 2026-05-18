import { useState, useRef, useEffect } from "react";
import svgPaths from "@/imports/svg-vtaynlf815";
import imgAvatar1 from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import AssistantSelectorPopover from "@/app/components/AssistantSelectorPopover";
import type { Assistant } from "@/app/App";

interface AssistantSelectorProps {
  onCreateClick?: () => void;
  assistants?: Assistant[];
  selectedAssistant?: Assistant | null;
  onSelectAssistant?: (assistant: Assistant) => void;
}

export default function AssistantSelector({ onCreateClick, assistants = [], selectedAssistant, onSelectAssistant }: AssistantSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[228px] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-left"
      >
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        <div className="relative rounded-[9999px] shrink-0 size-[20px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
            <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
          </div>
        </div>
        <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis">
          {selectedAssistant ? selectedAssistant.name : "Assistentes"}
        </p>
        <div className="relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g opacity="0.5">
              <path d={svgPaths.p15233480} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </g>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50">
          <AssistantSelectorPopover
            assistants={assistants}
            onCreateClick={() => {
              const MAX_ASSISTANTS = 5;
              if (assistants.length >= MAX_ASSISTANTS) {
                alert("Você atingiu o limite de 5 assistentes no plano gratuito. Faça upgrade para criar mais assistentes!");
                setIsOpen(false);
                return;
              }
              if (onCreateClick) {
                onCreateClick();
                setIsOpen(false);
              }
            }}
            onSelectAssistant={(assistant) => {
              if (onSelectAssistant) {
                onSelectAssistant(assistant);
              }
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
