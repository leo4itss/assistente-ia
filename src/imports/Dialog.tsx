function DialogHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Dialog Header">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[18px] w-full">Pretende excluir esta conversa?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-full">Esta ação é irreversível. Ao excluir a conversa, todas as mensagens serão permanentemente removidas e não poderão ser recuperadas.</p>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Separator">
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 377 1">
          <g id="Separator">
            <line id="Separator_2" stroke="var(--stroke-0, white)" strokeOpacity="0.1" x2="377" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Cancel</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f87171] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Excluir</p>
      </div>
    </div>
  );
}

function DialogFooter() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-full" data-name="Dialog Footer">
      <Button />
      <Button1 />
    </div>
  );
}

function DialogCloseIcon() {
  return (
    <div className="absolute right-[16px] rounded-[2px] size-[16px] top-[16px]" data-name="Dialog / Close Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / X" opacity="0.7">
          <path d="M12 4L4 12M4 4L12 12" id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

export default function Dialog() {
  return (
    <div className="bg-[#111827] content-stretch flex flex-col gap-[32px] items-end p-[24px] relative rounded-[10px] size-full" data-name="Dialog">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <DialogHeader />
      <Separator />
      <DialogFooter />
      <DialogCloseIcon />
    </div>
  );
}