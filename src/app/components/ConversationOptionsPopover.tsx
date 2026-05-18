import { useState } from "react";
import { createPortal } from "react-dom";
import svgPaths from "@/imports/svg-mo598ores2";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

function IconPin() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p21c81680} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
      </svg>
    </div>
  );
}

function OptionPin() {
  return (
    <button className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors group">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <IconPin />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Fixar</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function IconPen() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_pen)">
          <path d={svgPaths.p25a5e900} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_pen">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function OptionRename() {
  return (
    <button className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors group">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <IconPen />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Renomear</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function IconTrash() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p3e869f80} stroke="#F87171" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
      </svg>
    </div>
  );
}

function OptionDelete() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors group"
      >
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
            <IconTrash />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">Excluir</p>
            </div>
          </div>
        </div>
      </button>
      {showDialog &&
        createPortal(
          <DeleteConfirmationDialog
            isOpen={showDialog}
            onClose={() => setShowDialog(false)}
            onConfirm={() => {
              setShowDialog(false);
            }}
          />,
          document.body
        )}
    </>
  );
}

export default function ConversationOptionsPopover() {
  return (
    <div className="bg-[#1f2937] flex flex-col items-start p-[8px] relative rounded-[8px] min-w-[160px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-10">
        <OptionPin />
        <OptionRename />
        <OptionDelete />
      </div>
    </div>
  );
}
