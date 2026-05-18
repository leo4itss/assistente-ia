import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

function Avatar() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function ComboboxMenuItem() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Combobox / Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <Avatar />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Manu</p>
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
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function ComboboxMenuItem1() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Combobox / Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <Avatar1 />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Aura</p>
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
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function ComboboxMenuItem2() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Combobox / Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <Avatar2 />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">{`Logika  `}</p>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 w-full" data-name="Group">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-[4px] relative w-full">
        <ComboboxMenuItem />
        <ComboboxMenuItem1 />
        <ComboboxMenuItem2 />
      </div>
    </div>
  );
}

export default function ComboboxCommandMenuAvatars() {
  return (
    <div className="bg-[#1f2937] content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="Combobox / Command Menu - Avatars">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <Group />
    </div>
  );
}