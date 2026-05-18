import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import svgPaths from "../../imports/ComboboxCommandMenuAvatars/svg-d2yrjvc9z6";
import svgPathsUpgrade from "../../imports/ComboboxCommandMenuAvatars-1/svg-14nn5w9gy1";
import type { Assistant } from "@/app/App";
import { DEFAULT_ASSISTANTS } from "@/app/constants/defaultAssistants";

function Avatar({ src = imgAvatar }: { src?: string }) {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={src} />
      </div>
    </div>
  );
}

function ComboboxMenuItem({ name, onClick, assistant }: { name: string; onClick?: () => void; assistant?: Assistant }) {
  return (
    <div onClick={onClick} className="relative rounded-[6px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors" data-name="Combobox / Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <Avatar />
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">{name}</p>
        </div>
      </div>
    </div>
  );
}

function CreateAssistantMenuItem({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="relative rounded-[6px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors" data-name="Combobox / Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / CirclePlus">
            <div className="absolute inset-[8.33%]" data-name="Vector">
              <div className="absolute inset-[-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p355cbf00} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              </div>
            </div>
          </div>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Criar assistente</p>
        </div>
      </div>
    </div>
  );
}

function UpgradeMenuItem({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="relative rounded-[6px] shrink-0 w-full hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors" data-name="Combobox / Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / ExternalLink">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <div className="absolute inset-[-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 13.33">
                  <path d={svgPathsUpgrade.p6d5c680} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Fazer upgrade</p>
        </div>
      </div>
    </div>
  );
}

function Group({ assistants, onSelectAssistant }: { assistants?: Assistant[]; onSelectAssistant?: (assistant: Assistant) => void }) {
  const displayAssistants = assistants && assistants.length > 0 ? assistants : DEFAULT_ASSISTANTS;

  return (
    <div className="relative shrink-0 w-full" data-name="Group">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-[4px] relative w-full">
        {displayAssistants.map((assistant) => (
          <ComboboxMenuItem
            key={assistant.id}
            name={assistant.name}
            assistant={assistant}
            onClick={() => onSelectAssistant && onSelectAssistant(assistant)}
          />
        ))}
      </div>
    </div>
  );
}

function Group1({ onCreateClick, assistantCount }: { onCreateClick?: () => void; assistantCount: number }) {
  const MAX_ASSISTANTS = 5;
  const hasReachedLimit = assistantCount >= MAX_ASSISTANTS;

  const handleUpgradeClick = () => {
    alert("Você atingiu o limite de 5 assistentes no plano gratuito. Faça upgrade para criar mais assistentes!");
  };

  return (
    <div className="relative shrink-0 w-full" data-name="Group">
      <div className="content-stretch flex flex-col items-start p-[4px] relative w-full">
        {hasReachedLimit ? (
          <UpgradeMenuItem onClick={handleUpgradeClick} />
        ) : (
          <CreateAssistantMenuItem onClick={onCreateClick} />
        )}
      </div>
    </div>
  );
}

interface AssistantSelectorPopoverProps {
  onCreateClick?: () => void;
  assistants?: Assistant[];
  onSelectAssistant?: (assistant: Assistant) => void;
}

export default function AssistantSelectorPopover({ onCreateClick, assistants = [], onSelectAssistant }: AssistantSelectorPopoverProps) {
  return (
    <div className="bg-[#1f2937] content-stretch flex flex-col items-start relative rounded-[8px] w-[228px]" data-name="Combobox / Command Menu - Avatars">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <Group assistants={assistants} onSelectAssistant={onSelectAssistant} />
      <Group1 onCreateClick={onCreateClick} assistantCount={assistants.length} />
    </div>
  );
}
