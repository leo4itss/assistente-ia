import svgPaths from "./svg-vtaynlf815";
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
      <p className="css-g0mm18 font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic overflow-hidden relative shrink-0 text-[#f9fafb] text-[14px] text-ellipsis w-full">ITSS</p>
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
        <g clipPath="url(#clip0_1_26311)" id="Icon / SquarePen">
          <path d={svgPaths.p3c5c9aa0} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_26311">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SidebarSidebarMenuButton1() {
  return (
    <div className="bg-[#1f2937] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <IconSquarePen />
          <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis">Novo chat</p>
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
          <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis">Pesquisar</p>
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
        <g clipPath="url(#clip0_1_26294)" id="Icon / BookOpen">
          <path d={svgPaths.p453af80} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_26294">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
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
          <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis">Assistentes</p>
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

function SidebarContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative w-full" data-name="SidebarContent">
      <SidebarSidebarGroup />
    </div>
  );
}

function SidebarSidebarAssistent() {
  return (
    <div className="bg-[#111827] content-stretch flex flex-col h-[1080px] items-start relative shrink-0 w-[256px]" data-name="Sidebar / Sidebar Assistent-01">
      <SidebarHeader />
      <SidebarContent />
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
      <Avatar1 />
      <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis">Assistentes</p>
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

function Avatar2() {
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
      <Avatar2 />
    </div>
  );
}

function HeaderHeaderAssitent() {
  return (
    <div className="bg-[#030712] content-stretch flex h-[64px] items-center justify-between px-[32px] py-[16px] relative shrink-0 w-[1664px]" data-name="Header /Header Assitent-01">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Combobox />
      <Flex />
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

function Button3() {
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

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Button">
      <IconMic />
    </div>
  );
}

function InputChatPlaceholder() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="InputChat-placeholder">
      <Button3 />
      <p className="css-g0mm18 flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis">Placeholder</p>
      <Button4 />
    </div>
  );
}

function FlexVertical1() {
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
          <FlexVertical1 />
        </div>
      </div>
    </div>
  );
}

function ChatBar() {
  return (
    <div className="bg-[#030712] relative shrink-0 w-full" data-name="ChatBar">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[20px] py-[16px] relative w-full">
          <InputChat />
        </div>
      </div>
    </div>
  );
}

function FlexVertical2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center justify-center relative shrink-0 w-full" data-name="Flex Vertical">
      <ChatBar />
    </div>
  );
}

function ContentSection() {
  return (
    <div className="bg-[#030712] content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px pt-[408px] relative w-full" data-name="contentSection">
      <FlexVertical2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-h-px min-w-px relative">
      <HeaderHeaderAssitent />
      <ContentSection />
    </div>
  );
}

export default function AssistenteIaChat() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Assistente IA_Chat">
      <SidebarSidebarAssistent />
      <Frame />
    </div>
  );
}