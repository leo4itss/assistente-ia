import svgPaths from "./svg-hujl1n6kp5";

function IconPlus() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Plus">
          <path d={svgPaths.p36bdefc0} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Button">
      <IconPlus />
    </div>
  );
}

function IconMic() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Mic">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Mic">
          <path d={svgPaths.p37eb9700} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Button">
      <IconMic />
    </div>
  );
}

function IconSendHorizontal() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / SendHorizontal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / SendHorizontal">
          <path d={svgPaths.pbeac600} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Button">
      <IconSendHorizontal />
    </div>
  );
}

export default function InputChatPlaceholder() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="InputChat-placeholder">
      <Button />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#030712] text-[14px] text-ellipsis whitespace-nowrap">|Placeholder</p>
      <Button1 />
      <Button2 />
    </div>
  );
}