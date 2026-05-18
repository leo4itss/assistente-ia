import svgPaths from "./svg-vecvfzm07c";

function IconPlus() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Plus">
          <path d={svgPaths.p36bdefc0} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
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
          <path d={svgPaths.p37eb9700} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
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

function InputChatPlaceholder() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="InputChat-placeholder">
      <Button />
      <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis">Placeholder</p>
      <Button1 />
    </div>
  );
}

function FlexVertical() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Flex Vertical">
      <InputChatPlaceholder />
    </div>
  );
}

function InputChat() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[8px] items-center max-w-[640px] p-[8px] relative rounded-[9999px] shrink-0 w-[640px]" data-name="InputChat">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <FlexVertical />
    </div>
  );
}

export default function ChatBar() {
  return (
    <div className="bg-[#030712] content-stretch flex flex-col gap-[4px] items-center pb-[10px] px-[20px] relative size-full" data-name="ChatBar">
      <InputChat />
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[#b5b5b5] text-[10px] text-center w-[min-content]">As conversas neste assistente não são usadas para treinar modelos. O assistente pode cometer erros.</p>
    </div>
  );
}