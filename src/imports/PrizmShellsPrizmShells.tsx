import svgPaths from "./svg-ewdgo6szg9";
import imgAvatar from "figma:asset/c866b4a357fc53387b13b52af16a58d195f9b81f.png";
import imgAvatar1 from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

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

function IconBot() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Bot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / Bot">
          <path d={svgPaths.p30c73800} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconChevronRight() {
  return (
    <div className="relative size-[16px]" data-name="Icon / ChevronRight">
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
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-1/2 size-[16px] top-1/2" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "153" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <IconChevronRight />
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuButton3() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <IconBot />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Assistentes</p>
          <SidebarCollapseIcon />
        </div>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function SidebarSidebarMenuSubItem() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuSubItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] relative size-full">
          <Avatar1 />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Manu</p>
        </div>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function SidebarSidebarMenuSubItem1() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuSubItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] relative size-full">
          <Avatar2 />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Aura</p>
        </div>
      </div>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function SidebarSidebarMenuSubItem2() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuSubItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] relative size-full">
          <Avatar3 />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">{`Logika  `}</p>
        </div>
      </div>
    </div>
  );
}

function Avatar4() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function SidebarSidebarMenuSubItem3() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuSubItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] relative size-full">
          <Avatar4 />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Sofia</p>
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuSub() {
  return (
    <div className="relative shrink-0 w-full" data-name="Sidebar / SidebarMenuSub">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[24px] py-[2px] relative w-full">
        <SidebarSidebarMenuSubItem />
        <SidebarSidebarMenuSubItem1 />
        <SidebarSidebarMenuSubItem2 />
        <SidebarSidebarMenuSubItem3 />
        <div className="absolute bottom-0 left-[16px] top-0 w-0" data-name="Border">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 128">
              <path d="M0.5 0V128" id="Border" stroke="var(--stroke-0, white)" strokeOpacity="0.1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarSidebarMenuItem2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
      <SidebarSidebarMenuButton3 />
      <SidebarSidebarMenuSub />
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
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">problema na rede elétrica</p>
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

function SidebarSidebarAssistent() {
  return (
    <div className="bg-[#111827] content-stretch flex flex-col h-full items-start relative shrink-0 w-[256px]" data-name="Sidebar / Sidebar Assistent-01">
      <SidebarHeader />
      <SidebarContent />
    </div>
  );
}

function Avatar5() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function IconChevronsUpDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / ChevronsUpDown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / ChevronsUpDown" opacity="0.5">
          <path d={svgPaths.p15233480} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function Combobox() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[228px]" data-name="Combobox">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Avatar5 />
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Assistentes</p>
      <IconChevronsUpDown />
    </div>
  );
}

function IconLayoutGrid() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / LayoutGrid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / LayoutGrid">
          <g id="Vector">
            <path d={svgPaths.p1cfa1bc0} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            <path d={svgPaths.p2cfdb900} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            <path d={svgPaths.p17f25d40} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            <path d={svgPaths.p15fb5e00} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <IconLayoutGrid />
    </div>
  );
}

function IconEllipsisVertical() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / EllipsisVertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon / EllipsisVertical">
          <g id="Vector">
            <path d={svgPaths.p36e45a00} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            <path d={svgPaths.p150f5b00} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            <path d={svgPaths.p2d6e5280} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <IconEllipsisVertical />
    </div>
  );
}

function Avatar6() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[36px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Flex() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Flex">
      <Button1 />
      <Button2 />
      <Avatar6 />
    </div>
  );
}

function HeaderHeaderAssitent() {
  return (
    <div className="bg-[#030712] h-[64px] relative shrink-0 w-full" data-name="Header /Header Assitent-01">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
          <Combobox />
          <Flex />
        </div>
      </div>
    </div>
  );
}

function IconCopy() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Copy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_55_18588)" id="Icon / Copy">
          <path d={svgPaths.p5752d00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_55_18588">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] opacity-0 px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <IconCopy />
    </div>
  );
}

function FlexVertical1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Flex Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full whitespace-pre-wrap">Quantas peças ainda estão pendentes para concluir o lote de produção programado para esta semana e quais verificações devem ser feitas para validar essa quantidade no sistema?</p>
    </div>
  );
}

function Question() {
  return (
    <div className="bg-[#2563eb] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]" data-name="Question">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
        <FlexVertical1 />
      </div>
    </div>
  );
}

function ChatMessageQuestion() {
  return (
    <div className="content-stretch flex gap-[8px] items-start max-w-[480px] relative shrink-0 w-full" data-name="chat-message-question">
      <Button3 />
      <Question />
    </div>
  );
}

function Avatar7() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Separator">
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 1">
          <g id="Separator">
            <line id="Separator_2" stroke="var(--stroke-0, white)" strokeOpacity="0.1" x2="600" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FlexVertical5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full" data-name="Flex Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 w-full whitespace-pre-wrap">Quantas peças faltam para concluir o lote da semana?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-60 overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">
        Informar com precisão a quantidade de peças pendentes para finalização do lote semanal. Instruções de Comportamento
        <br aria-hidden="true" />
        Ao receber essa pergunta, o assistente deve:
      </p>
    </div>
  );
}

function FlexVertical4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[28px] items-start justify-center min-h-px min-w-px relative" data-name="Flex Vertical">
      <FlexVertical5 />
    </div>
  );
}

function Flex1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Flex">
      <FlexVertical4 />
    </div>
  );
}

function ChatLinkedTasks() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="chat-linked-tasks">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
        <Flex1 />
      </div>
    </div>
  );
}

function FlexVertical7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full" data-name="Flex Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 w-full whitespace-pre-wrap">Quantas peças faltam para concluir o lote da semana?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-60 overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">
        Informar com precisão a quantidade de peças pendentes para finalização do lote semanal. Instruções de Comportamento
        <br aria-hidden="true" />
        Ao receber essa pergunta, o assistente deve:
      </p>
    </div>
  );
}

function FlexVertical6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[28px] items-start justify-center min-h-px min-w-px relative" data-name="Flex Vertical">
      <FlexVertical7 />
    </div>
  );
}

function Flex2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Flex">
      <FlexVertical6 />
    </div>
  );
}

function ChatLinkedTasks1() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="chat-linked-tasks">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
        <Flex2 />
      </div>
    </div>
  );
}

function FlexVertical9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full" data-name="Flex Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 w-full whitespace-pre-wrap">Quantas peças faltam para concluir o lote da semana?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-60 overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">
        Informar com precisão a quantidade de peças pendentes para finalização do lote semanal. Instruções de Comportamento
        <br aria-hidden="true" />
        Ao receber essa pergunta, o assistente deve:
      </p>
    </div>
  );
}

function FlexVertical8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[28px] items-start justify-center min-h-px min-w-px relative" data-name="Flex Vertical">
      <FlexVertical9 />
    </div>
  );
}

function Flex3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Flex">
      <FlexVertical8 />
    </div>
  );
}

function ChatLinkedTasks2() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="chat-linked-tasks">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
        <Flex3 />
      </div>
    </div>
  );
}

function FlexVertical3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Flex Vertical">
      <ChatLinkedTasks />
      <ChatLinkedTasks1 />
      <ChatLinkedTasks2 />
    </div>
  );
}

function FlexVertical2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Flex Vertical">
      <Separator />
      <FlexVertical3 />
    </div>
  );
}

function IconCopy1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Copy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_55_18588)" id="Icon / Copy">
          <path d={svgPaths.p5752d00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_55_18588">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <IconCopy1 />
    </div>
  );
}

function IconNotebookPen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / NotebookPen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_55_18550)" id="Icon / NotebookPen">
          <path d={svgPaths.p2be3cf00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_55_18550">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <IconNotebookPen />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Tarefas</p>
      </div>
    </div>
  );
}

function Flex4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Flex">
      <Button4 />
      <Button5 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative">
      <div className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Status da produção: Lote em andamento</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">📌 Quantidade pendente identificada: ainda faltam 42 peças para finalizar o lote programado para esta semana.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Vamos validar juntos:</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Confira o relatório de produção no sistema e confirme o total planejado para o lote.</p>
        <p className="mb-0">Verifique as peças já finalizadas e aprovadas na inspeção de qualidade.</p>
        <p className="mb-0">Compare com a meta semanal para confirmar se há alguma divergência no apontamento de horas ou na contagem manual.</p>
        <p className="mb-0">&nbsp;</p>
        <p>💡 Se houver diferença entre a quantidade produzida e o que está registrado no sistema, pode ser necessário revisar os apontamentos do turno ou os registros de refugo.</p>
      </div>
      <FlexVertical2 />
      <Flex4 />
    </div>
  );
}

function ChatAssistentResponse() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="chat-assistent-response">
      <Avatar7 />
      <Frame />
    </div>
  );
}

function ChatChatFull() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-end max-w-[640px] relative shrink-0 w-full" data-name="Chat / Chat full">
      <ChatMessageQuestion />
      <ChatAssistentResponse />
    </div>
  );
}

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

function Button6() {
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

function Button7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Button">
      <IconMic />
    </div>
  );
}

function InputChatPlaceholder() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="InputChat-placeholder">
      <Button6 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">Placeholder</p>
      <Button7 />
    </div>
  );
}

function FlexVertical10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Flex Vertical">
      <InputChatPlaceholder />
    </div>
  );
}

function InputChat() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] max-w-[640px] relative rounded-[9999px] shrink-0 w-full" data-name="InputChat">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] p-[8px] relative w-full">
          <FlexVertical10 />
        </div>
      </div>
    </div>
  );
}

function ChatChatBar() {
  return (
    <div className="h-[82px] relative shrink-0 w-full" data-name="Chat / ChatBar">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center pb-[10px] px-[20px] relative size-full">
          <InputChat />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#b5b5b5] text-[10px] text-center w-full whitespace-pre-wrap">As conversas neste assistente não são usadas para treinar modelos. O assistente pode cometer erros.</p>
        </div>
      </div>
    </div>
  );
}

function ChatChatContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-between min-h-px min-w-px relative" data-name="Chat / ChatContainer">
      <ChatChatFull />
      <ChatChatBar />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#030712] flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Div">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pt-[32px] px-[32px] relative size-full">
          <ChatChatContainer />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[1080px] items-start min-h-px min-w-px relative" data-name="Main">
      <HeaderHeaderAssitent />
      <Div />
    </div>
  );
}

export default function PrizmShellsPrizmShells() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="PRIZM Shells / PRIZM Shells">
      <div className="flex flex-row items-center self-stretch">
        <SidebarSidebarAssistent />
      </div>
      <Main />
    </div>
  );
}