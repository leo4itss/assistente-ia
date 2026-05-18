import svgPaths from "./svg-tykfxcr6sn";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

function Avatar() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function ItemMedia() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item / Media">
      <Avatar />
    </div>
  );
}

function ItemContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative text-[14px]" data-name="ItemContent">
      <p className="css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#f9fafb] w-full">Perfil</p>
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[20px] overflow-hidden relative shrink-0 text-[#9ca3af] text-ellipsis w-full">nome.sobrenome@email.com</p>
    </div>
  );
}

function Item() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <ItemMedia />
          <ItemContent />
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Separator">
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 1">
          <g id="Separator">
            <line id="Separator_2" stroke="var(--stroke-0, white)" strokeOpacity="0.1" x2="384" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconLanguages() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon / Languages">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_22_6098)" id="Icon / Languages">
          <path d={svgPaths.p33610900} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
        <defs>
          <clipPath id="clip0_22_6098">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ItemMedia1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item / Media">
      <IconLanguages />
    </div>
  );
}

function ItemContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="ItemContent">
      <p className="css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">Idioma do aplicativo</p>
    </div>
  );
}

function IconChevronsUpDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / ChevronsUpDown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_22_6083)" id="Icon / ChevronsUpDown">
          <path d={svgPaths.p13531500} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_22_6083">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px]">
        <p className="css-ew64yg leading-[16px]">Português (Brasil)</p>
      </div>
      <IconChevronsUpDown />
    </div>
  );
}

function ItemActions() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-end relative shrink-0" data-name="Item / Actions">
      <Button />
    </div>
  );
}

function Item1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <ItemMedia1 />
          <ItemContent1 />
          <div className="flex flex-row items-center self-stretch">
            <ItemActions />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconTrash() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon / Trash2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_22_6080)" id="Icon / Trash2">
          <path d={svgPaths.p31921400} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
        <defs>
          <clipPath id="clip0_22_6080">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ItemMedia2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item / Media">
      <IconTrash />
    </div>
  );
}

function ItemContent2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="ItemContent">
      <p className="css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f87171] text-[14px] w-full">Excluir todas as conversas</p>
    </div>
  );
}

function IconChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_22_6104)" id="Icon / ChevronRight">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_22_6104">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="aspect-[36/36] bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <IconChevronRight />
    </div>
  );
}

function ItemActions1() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-end relative shrink-0" data-name="Item / Actions">
      <Button1 />
    </div>
  );
}

function Item2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <ItemMedia2 />
          <ItemContent2 />
          <div className="flex flex-row items-center self-stretch">
            <ItemActions1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconBot() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon / Bot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_22_6077)" id="Icon / Bot">
          <path d={svgPaths.p12482100} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
        <defs>
          <clipPath id="clip0_22_6077">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ItemMedia3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item / Media">
      <IconBot />
    </div>
  );
}

function ItemContent3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="ItemContent">
      <p className="css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">Customização IA</p>
    </div>
  );
}

function IconChevronRight1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_22_6104)" id="Icon / ChevronRight">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_22_6104">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="aspect-[36/36] bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <IconChevronRight1 />
    </div>
  );
}

function ItemActions2() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-end relative shrink-0" data-name="Item / Actions">
      <Button2 />
    </div>
  );
}

function Item3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <ItemMedia3 />
          <ItemContent3 />
          <div className="flex flex-row items-center self-stretch">
            <ItemActions2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconFolderOpen() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon / FolderOpen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon / FolderOpen">
          <path d={svgPaths.p1dfbdc00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ItemMedia4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item / Media">
      <IconFolderOpen />
    </div>
  );
}

function ItemContent4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="ItemContent">
      <p className="css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">Base de conhecimento</p>
    </div>
  );
}

function IconChevronRight2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_22_6104)" id="Icon / ChevronRight">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_22_6104">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="aspect-[36/36] bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <IconChevronRight2 />
    </div>
  );
}

function ItemActions3() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-end relative shrink-0" data-name="Item / Actions">
      <Button3 />
    </div>
  );
}

function Item4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <ItemMedia4 />
          <ItemContent4 />
          <div className="flex flex-row items-center self-stretch">
            <ItemActions3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconLogOut() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon / LogOut">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_22_6074)" id="Icon / LogOut">
          <path d={svgPaths.p4297060} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
        <defs>
          <clipPath id="clip0_22_6074">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ItemMedia5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item / Media">
      <IconLogOut />
    </div>
  );
}

function ItemContent5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="ItemContent">
      <p className="css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">Sair</p>
    </div>
  );
}

function IconChevronRight3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_22_6104)" id="Icon / ChevronRight">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_22_6104">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="aspect-[36/36] bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <IconChevronRight3 />
    </div>
  );
}

function ItemActions4() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-end relative shrink-0" data-name="Item / Actions">
      <Button4 />
    </div>
  );
}

function Item5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <ItemMedia5 />
          <ItemContent5 />
          <div className="flex flex-row items-center self-stretch">
            <ItemActions4 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator1() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Separator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 0">
        <g id="Separator"></g>
      </svg>
    </div>
  );
}

function ItemGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="ItemGroup">
      <Item />
      <Separator />
      <Item1 />
      <Separator />
      <Item2 />
      <Separator />
      <Item3 />
      <Separator />
      <Item4 />
      <Separator />
      <Item5 />
      <Separator1 />
      <Separator1 />
    </div>
  );
}

export default function Popover() {
  return (
    <div className="bg-[#1f2937] content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] size-full" data-name="Popover">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <ItemGroup />
    </div>
  );
}