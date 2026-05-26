import { toast } from "sonner";

function SuccessToast({ message, id }: { message: string; id: string | number }) {
  return (
    <div className="bg-[#1f2937] border border-[rgba(255,255,255,0.1)] drop-shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex gap-[8px] items-center p-[16px] rounded-[8px] w-full">
      <div className="overflow-clip relative shrink-0 size-[20px]">
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.33" />
          <path d="M6.5 10.5L9 13L13.5 7.5" stroke="#f9fafb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#f9fafb] text-[14px]">
        {message}
      </p>
      <button
        onClick={() => toast.dismiss(id)}
        className="bg-[#2563eb] flex h-[24px] items-center justify-center px-[8px] rounded-[4px] shrink-0 hover:bg-[#1d4ed8] transition-colors"
      >
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#f9fafb] text-[12px] whitespace-nowrap">Ok</span>
      </button>
    </div>
  );
}

export function toastSuccess(message: string) {
  toast.custom((id) => <SuccessToast message={message} id={id} />, {
    duration: 5000,
  });
}
