import svgPaths from "./svg-uht81957yr";

function PopoverContent() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="PopoverContent">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#f9fafb] text-[16px] w-full whitespace-pre-wrap">Meus apps</p>
    </div>
  );
}

function IconBot() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Bot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Bot">
          <path d={svgPaths.p30c73800} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Button" style={{ backgroundImage: "linear-gradient(90deg, rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.2) 100%), linear-gradient(90deg, rgb(31, 41, 55) 0%, rgb(31, 41, 55) 100%)" }}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <IconBot />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Manu • Assistente IA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconSchool() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / School">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_11509)" id="Icon / School">
          <path d={svgPaths.p8aa9a00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_46_11509">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <IconSchool />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Trilhas de aprendizado</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconAppWindowMac() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / AppWindowMac">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / AppWindowMac">
          <path d={svgPaths.p3d29b700} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <IconAppWindowMac />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Todos os Apps</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PopoverContent1() {
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
      <PopoverContent1 />
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