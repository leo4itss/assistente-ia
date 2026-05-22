import { useState, useRef, useEffect } from "react";
import GlobalToolCard from "@/app/components/resources/GlobalToolCard";
import type { GlobalTool, GlobalToolType, McpTool, AzureAiSearchTool, ValidationErrors } from "@/app/types/resourcesTools";

function newId() { return Math.random().toString(36).slice(2); }

function createGlobalTool(type: GlobalToolType): GlobalTool {
  if (type === "mcp") {
    const t: McpTool = { id: newId(), type: "mcp", url: "", transport: "", secret_key: "", system_prompt: "" };
    return t;
  }
  const t: AzureAiSearchTool = { id: newId(), type: "azure_ai_search", service_name: "", api_key: "", system_prompt: "" };
  return t;
}

const TOOL_TYPE_LABELS: Record<GlobalToolType, string> = {
  mcp: "MCP",
  azure_ai_search: "Azure AI Search",
};

interface GlobalToolsTabProps {
  tools: GlobalTool[];
  onChange: (updated: GlobalTool[]) => void;
  errors: ValidationErrors;
}

export default function GlobalToolsTab({ tools, onChange, errors }: GlobalToolsTabProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleAdd = (type: GlobalToolType) => {
    onChange([...tools, createGlobalTool(type)]);
    setDropdownOpen(false);
  };

  const handleDelete = (idx: number) => onChange(tools.filter((_, i) => i !== idx));

  const handleUpdate = (idx: number, updated: GlobalTool) => {
    const copy = [...tools];
    copy[idx] = updated;
    onChange(copy);
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="flex flex-col items-start gap-[24px] p-[32px] w-full max-w-[800px]">
        {/* Add button */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[rgba(255,255,255,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
              <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">Adicionar ferramenta</span>
            <svg className="size-[14px] shrink-0 opacity-60" fill="none" viewBox="0 0 14 14">
              <path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
          </button>
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute top-[calc(100%+4px)] left-0 z-50 bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[8px] py-[4px] min-w-[200px] shadow-lg">
              {(["mcp", "azure_ai_search"] as GlobalToolType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleAdd(type)}
                  className="flex items-center w-full px-[12px] py-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px]">{TOOL_TYPE_LABELS[type]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {tools.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full py-[64px] gap-[16px]">
            <div className="flex items-center justify-center size-[48px] rounded-full bg-[rgba(255,255,255,0.05)]">
              <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[16px]">Nenhuma ferramenta global</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px] text-center max-w-[320px]">Adicione ferramentas MCP ou Azure AI Search disponíveis para todos os recursos do assistente.</p>
          </div>
        )}

        {/* Tool cards */}
        {tools.map((tool, idx) => (
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
