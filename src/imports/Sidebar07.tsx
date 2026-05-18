import svgPaths from "./svg-u3bi0j2sg9";
import imgAvatar from "figma:asset/c866b4a357fc53387b13b52af16a58d195f9b81f.png";

function Avatar() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
        <div className="absolute bg-[#030712] inset-0 rounded-[10px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[10px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function SidebarMediaAsset() {
  return (
    <div className="bg-[#111827] content-stretch flex items-center relative rounded-[10px] shrink-0" data-name="Sidebar / MediaAsset">
      <Avatar />
    </div>
  );
}

function FlexVertical() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-h-px min-w-px relative" data-name="Flex Vertical">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic overflow-hidden relative shrink-0 text-[#f9fafb] text-[14px] text-ellipsis w-full whitespace-nowrap">ITSS</p>
    </div>
  );
}

function IconPanelLeft() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / PanelLeft">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / PanelLeft">
          <path d={svgPaths.paee2100} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[8px] shrink-0 size-[16px]" data-name="Button">
      <div className="flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] px-[16px] py-[8px] relative size-full">
          <IconPanelLeft />
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuButton() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <SidebarMediaAsset />
          <FlexVertical />
          <Button />
        </div>
      </div>
    </div>
  );
}

function SidebarHeader() {
  return (
    <div className="bg-[#111827] relative shrink-0 w-full" data-name="SidebarHeader">
      <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
        <SidebarSidebarMenuButton />
      </div>
    </div>
  );
}

function IconSquarePen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / SquarePen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / SquarePen">
          <path d={svgPaths.p32baa780} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SidebarSidebarMenuButton1() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <IconSquarePen />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Novo chat</p>
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton1 />
    </div>
  );
}

function IconSearch() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Search">
          <path d={svgPaths.p3114e300} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SidebarSidebarMenuButton2() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <IconSearch />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Pesquisar</p>
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton2 />
    </div>
  );
}

function IconBookOpen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / BookOpen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / BookOpen">
          <path d={svgPaths.p33c82600} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconChevronRight() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Icon / ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / ChevronRight">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SidebarCollapseIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Sidebar / CollapseIcon">
      <IconChevronRight />
    </div>
  );
}

function SidebarSidebarMenuButton3() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <IconBookOpen />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Assistentes</p>
          <SidebarCollapseIcon />
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton3 />
    </div>
  );
}

function SidebarMenu() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="SidebarMenu">
      <SidebarSidebarMenuItem />
      <SidebarSidebarMenuItem1 />
      <SidebarSidebarMenuItem2 />
    </div>
  );
}

function SidebarSidebarGroup() {
  return (
    <div className="relative shrink-0 w-full" data-name="Sidebar / SidebarGroup">
      <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
        <SidebarMenu />
      </div>
    </div>
  );
}

function SidebarSidebarGroupLabel() {
  return (
    <div className="h-[32px] opacity-70 relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarGroupLabel">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[12px] text-ellipsis whitespace-nowrap">23/12/25</p>
        </div>
      </div>
    </div>
  );
}

function IconEllipsis() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Ellipsis">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Ellipsis">
          <g id="Vector">
            <path d={svgPaths.p36e45a00} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1a14b300} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2295f880} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SidebarSidebarMenuButton4() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Quantas peças ainda estão pendentes</p>
          <IconEllipsis />
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton4 />
    </div>
  );
}

function SidebarSidebarMenuButton5() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">elétrica para análise detalh</p>
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton5 />
    </div>
  );
}

function SidebarSidebarMenuButton6() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">conexões soltas ou desgas</p>
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton6 />
    </div>
  );
}

function IconEllipsis1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Ellipsis">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Ellipsis">
          <g id="Vector">
            <path d={svgPaths.p36e45a00} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1a14b300} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p2295f880} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SidebarSidebarMenuButton7() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <IconEllipsis1 />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Ver mais</p>
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem6() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-70 relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton7 />
    </div>
  );
}

function SidebarMenu1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="SidebarMenu">
      <SidebarSidebarMenuItem3 />
      <SidebarSidebarMenuItem4 />
      <SidebarSidebarMenuItem5 />
      <SidebarSidebarMenuItem6 />
    </div>
  );
}

function SidebarSidebarGroup1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Sidebar / SidebarGroup">
      <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
        <SidebarSidebarGroupLabel />
        <SidebarMenu1 />
      </div>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative w-full" data-name="SidebarContent">
      <SidebarSidebarGroup />
      <SidebarSidebarGroup1 />
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="bg-[#111827] content-stretch flex flex-col items-start relative size-full" data-name="Sidebar 07.">
      <SidebarHeader />
      <SidebarContent />
    </div>
  );
}