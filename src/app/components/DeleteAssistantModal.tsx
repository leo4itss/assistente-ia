import svgPaths from "../../imports/Dialog/svg-qy3hpqah86";
import type { Assistant } from "@/app/App";

interface DeleteAssistantModalProps {
  assistant: Assistant;
  onConfirm: () => void;
  onCancel: () => void;
}

function DialogHeader({ assistantName }: { assistantName: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full" data-name="Dialog Header">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[18px] w-full">Pretende deletar esse assistente?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        Esta ação é irreversível. Ao excluir o assistente <strong className="text-[#f9fafb]">{assistantName}</strong>, todas as conversas serão permanentemente removidas e não poderão ser recuperadas.
      </p>
    </div>
  );
}

function DialogFooter({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-full" data-name="Dialog Footer">
      <button
        onClick={onCancel}
        className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        data-name="Button"
      >
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Cancelar</p>
        </div>
      </button>
      <button
        onClick={onConfirm}
        className="bg-[#f87171] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 hover:bg-[#ef4444] transition-colors"
        data-name="Button"
      >
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Deletar</p>
        </div>
      </button>
    </div>
  );
}

export default function DeleteAssistantModal({ assistant, onConfirm, onCancel }: DeleteAssistantModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#111827] content-stretch drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col gap-[32px] items-end p-[24px] relative rounded-[10px] w-[425px]" data-name="Dialog">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <DialogHeader assistantName={assistant.name} />
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Orientation=Horizontal">
          <div className="h-0 relative shrink-0 w-full" data-name="Separator">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 377 1">
                <line id="Separator" stroke="white" strokeOpacity="0.1" x2="377" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
        <DialogFooter onCancel={onCancel} onConfirm={onConfirm} />
        <button
          onClick={onCancel}
          className="absolute right-[16px] rounded-[2px] size-[16px] top-[16px] hover:opacity-100 transition-opacity"
          data-name="Dialog / Close Icon"
        >
          <div className="absolute inset-0 opacity-70 overflow-clip rounded-[2px]" data-name="Icon / X">
            <div className="absolute inset-1/4" data-name="Vector">
              <div className="absolute inset-[-8.31%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33 9.33">
                  <path d={svgPaths.p2d1e680} id="Vector" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
