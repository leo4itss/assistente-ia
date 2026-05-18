import svgPaths from "./svg-b4ekyyz1g8";

function IconSquarePen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / SquarePen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / SquarePen">
          <path d={svgPaths.p32baa780} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SidebarSidebarMenuButton() {
  return (
    <div className="bg-[#f3f4f6] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <IconSquarePen />
          <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#111827] text-[14px] text-ellipsis">Novo chat</p>
        </div>
      </div>
    </div>
  );
}

export default function SidebarSidebarMenuItem() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton />
    </div>
  );
}