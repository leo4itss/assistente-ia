import svgPaths from "./svg-mo598ores2";

function IconPin() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Pin">
          <path d={svgPaths.p21c81680} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <IconPin />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Fixar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconPen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Pen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_45_10867)" id="Icon / Pen">
          <path d={svgPaths.p25a5e900} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_45_10867">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <IconPen />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Renomear</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconTrash() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Trash2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Trash2">
          <path d={svgPaths.p3e869f80} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <IconTrash />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Excluir</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PopoverContent() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="PopoverContent">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function PopoverContentExample() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Popover / Content Example">
      <PopoverContent />
    </div>
  );
}

export default function Popover() {
  return (
    <div className="bg-[#1f2937] content-stretch flex flex-col items-start p-[16px] relative rounded-[8px] size-full" data-name="Popover">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <PopoverContentExample />
    </div>
  );
}