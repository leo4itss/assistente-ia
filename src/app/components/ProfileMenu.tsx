import svgPaths from "@/imports/svg-tykfxcr6sn";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

function Avatar() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[32px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function ItemMedia({ children }: { children: React.ReactNode }) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      {children}
    </div>
  );
}

function ItemContent({ title, subtitle, titleColor = "text-[#f9fafb]" }: { title: string, subtitle?: string, titleColor?: string }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative text-[14px]">
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 ${titleColor} w-full`}>{title}</p>
      {subtitle && (
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] overflow-hidden relative shrink-0 text-[#9ca3af] text-ellipsis w-full">{subtitle}</p>
      )}
    </div>
  );
}

function IconLanguages() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p33610900} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
      </svg>
    </div>
  );
}

function IconChevronsUpDown() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p13531500} stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
      </svg>
    </div>
  );
}

function IconTrash() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p31921400} stroke="#F87171" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
      </svg>
    </div>
  );
}

function IconChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d="M9 18L15 12L9 6" stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
      </svg>
    </div>
  );
}

function IconBot() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p12482100} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
      </svg>
    </div>
  );
}

function IconFolderOpen() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p1dfbdc00} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
      </svg>
    </div>
  );
}

function IconLogOut() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p4297060} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
      </svg>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-px relative shrink-0 w-full bg-[rgba(255,255,255,0.1)]" />
  );
}

function MenuItem({ 
  icon, 
  title, 
  subtitle, 
  titleColor, 
  action, 
  onClick,
  className = ""
}: { 
  icon: React.ReactNode, 
  title: string, 
  subtitle?: string, 
  titleColor?: string, 
  action?: React.ReactNode,
  onClick?: () => void,
  className?: string
}) {
  return (
    <div className={`relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer ${className || "h-[64px]"}`} onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] relative w-full h-full">
          <ItemMedia>{icon}</ItemMedia>
          <ItemContent title={title} subtitle={subtitle} titleColor={titleColor} />
          {action && (
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex gap-[8px] h-full items-center justify-end relative shrink-0">
                {action}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProfileMenuProps {
  onCustomizationClick?: () => void;
}

export default function ProfileMenu({ onCustomizationClick }: ProfileMenuProps) {
  return (
    <div className="bg-[#1F2937] flex flex-col items-start p-[16px] relative rounded-[16px] w-[416px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.1)]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <MenuItem
          icon={<Avatar />}
          title="Perfil"
          subtitle="nome.sobrenome@email.com"
        />

        <Separator />

        <MenuItem
          icon={<IconLanguages />}
          title="Idioma do aplicativo"
          action={
            <div className="bg-[rgba(255,255,255,0)] flex gap-[8px] h-[32px] items-center justify-center px-[12px] py-[8px] rounded-[8px]">
              <span className="font-medium text-[#9ca3af] text-[12px]">Português (Brasil)</span>
              <IconChevronsUpDown />
            </div>
          }
        />

        <Separator />

        <MenuItem
          icon={<IconTrash />}
          title="Excluir todas as conversas"
          titleColor="text-[#f87171]"
          action={<div className="flex items-center justify-center size-[24px]"><IconChevronRight /></div>}
        />

        <Separator />

        <MenuItem
          icon={<IconBot />}
          title="Customização IA"
          onClick={onCustomizationClick}
          action={<div className="flex items-center justify-center size-[24px]"><IconChevronRight /></div>}
        />

        <Separator />
          
        <MenuItem 
          icon={<IconFolderOpen />} 
          title="Base de conhecimento" 
          action={<div className="flex items-center justify-center size-[24px]"><IconChevronRight /></div>}
        />
        
        <Separator />
        
        <MenuItem 
          icon={<IconLogOut />} 
          title="Sair" 
          action={<div className="flex items-center justify-center size-[24px]"><IconChevronRight /></div>}
        />
      </div>
    </div>
  );
}
