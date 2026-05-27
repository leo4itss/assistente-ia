import GlobalToolCard from "@/app/components/resources/GlobalToolCard";
import type { GlobalTool, ValidationErrors } from "@/app/types/resourcesTools";

interface GlobalToolsTabProps {
  tools: GlobalTool[];
  onChange: (updated: GlobalTool[]) => void;
  errors: ValidationErrors;
}

export default function GlobalToolsTab({ tools, onChange, errors }: GlobalToolsTabProps) {
  const handleDelete = (idx: number) => onChange(tools.filter((_, i) => i !== idx));

  const handleUpdate = (idx: number, updated: GlobalTool) => {
    const copy = [...tools];
    copy[idx] = updated;
    onChange(copy);
  };

  const visibleTools = tools.filter((t) => t.type !== "azure_ai_search");

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="flex flex-col items-start gap-[24px] px-[32px] pt-[32px] pb-[80px] w-full max-w-[800px]">
        {/* Empty state */}
        {visibleTools.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full py-[64px] gap-[16px]">
            <div className="flex items-center justify-center size-[48px] rounded-full bg-[rgba(255,255,255,0.05)]">
              <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[16px]">Nenhuma integração configurada</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px] text-center max-w-[320px]">Adicione uma integração MCP para conectar serviços externos.</p>
          </div>
        )}

        {/* Tool cards — azure_ai_search is hidden from UI but preserved in serialization */}
        {tools.map((tool, idx) => tool.type === "azure_ai_search" ? null : (
          <GlobalToolCard
            key={tool.id}
            tool={tool}
            idx={idx}
            onChange={(updated) => handleUpdate(idx, updated)}
            onDelete={() => handleDelete(idx)}
            errors={errors}
            errorPrefix={`tool.${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
