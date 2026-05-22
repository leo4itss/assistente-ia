import { useState } from "react";
import type { AgentResearch, TavilyTool, WebSearchTool, ResearchToolItem, ValidationErrors } from "@/app/types/resourcesTools";

function newId() { return Math.random().toString(36).slice(2); }

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[12px] mt-[4px]">{message}</p>;
}

function PasswordInput({ value, onChange, placeholder, hasValue }: {
  value: string; onChange: (v: string) => void; placeholder?: string; hasValue?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center px-[12px] size-full gap-[8px]">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={hasValue && !value ? "••••••••  (deixe em branco para manter)" : (placeholder || "")}
          className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] min-w-0"
        />
        <button type="button" onClick={() => setShow(!show)} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity" tabIndex={-1}>
          <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
            {show
              ? <><path d="M2 8s2.667-4.667 6-4.667S14 8 14 8s-2.667 4.667-6 4.667S2 8 2 8z" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" /><path d="M8 9.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666z" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" /></>
              : <path d="M9.413 9.414A2 2 0 016.586 6.586M13.36 13.36C12.05 14.37 10.1 15.333 8 15.333 4.667 15.333 2 11.333 2 8a10.4 10.4 0 011.64-3.36M6.4 3.067A6.94 6.94 0 018 2.667c3.333 0 6 4 6 5.333a9.36 9.36 0 01-1.64 2.72M2 2l12 12" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            }
          </svg>
        </button>
      </div>
    </div>
  );
}

function TextInput({ value, onChange, placeholder, maxLength }: {
  value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center px-[12px] size-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] min-w-0"
        />
      </div>
    </div>
  );
}

const RESEARCH_TYPE_LABELS: Record<string, string> = {
  tavily: "Tavily",
  web_search: "Web Search",
};

interface ResearchFormProps {
  resource: AgentResearch;
  onChange: (updated: AgentResearch) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

function TavilyItem({ tool, idx, onChange, onDelete, errors, errorPrefix }: {
  tool: TavilyTool; idx: number; onChange: (t: TavilyTool) => void; onDelete: () => void;
  errors: ValidationErrors; errorPrefix: string;
}) {
  const e = (f: string) => errors[`${errorPrefix}.tools.${idx}.${f}`];
  return (
    <div className="flex flex-col gap-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[16px]">
      <div className="flex items-center justify-between">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">Tavily</p>
        <button onClick={onDelete} className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
          <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
            <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">API Key<span className="text-[#f87171] ml-[2px]">*</span></p>
        <PasswordInput value={tool.api_key} onChange={(v) => onChange({ ...tool, api_key: v })} placeholder="tvly-..." hasValue={!!tool.api_key} />
        <FieldError message={e("api_key")} />
      </div>
    </div>
  );
}

function WebSearchItem({ tool, idx, onChange, onDelete, errors, errorPrefix }: {
  tool: WebSearchTool; idx: number; onChange: (t: WebSearchTool) => void; onDelete: () => void;
  errors: ValidationErrors; errorPrefix: string;
}) {
  const e = (f: string) => errors[`${errorPrefix}.tools.${idx}.${f}`];
  return (
    <div className="flex flex-col gap-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[16px]">
      <div className="flex items-center justify-between">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">Web Search</p>
        <button onClick={onDelete} className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
          <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
            <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">País (código ISO)</p>
        <TextInput value={tool.country} onChange={(v) => onChange({ ...tool, country: v.toUpperCase().slice(0, 2) })} placeholder="BR" maxLength={2} />
        <FieldError message={e("country")} />
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">Opcional. Ex.: BR, US, PT</p>
      </div>
    </div>
  );
}

export default function ResearchForm({ resource, onChange, errors, errorPrefix }: ResearchFormProps) {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const hasTavily = resource.tools.some((t) => t.type === "tavily");
  const hasWebSearch = resource.tools.some((t) => t.type === "web_search");

  const addTool = (type: "tavily" | "web_search") => {
    let newTool: ResearchToolItem;
    if (type === "tavily") newTool = { id: newId(), type: "tavily", api_key: "" };
    else newTool = { id: newId(), type: "web_search", country: "" };
    onChange({ ...resource, tools: [...resource.tools, newTool] });
    setAddMenuOpen(false);
  };

  const updateTool = (idx: number, updated: ResearchToolItem) => {
    const tools = [...resource.tools];
    tools[idx] = updated;
    onChange({ ...resource, tools });
  };

  const deleteTool = (idx: number) =>
    onChange({ ...resource, tools: resource.tools.filter((_, i) => i !== idx) });

  const availableTypes = [
    !hasTavily && "tavily",
    !hasWebSearch && "web_search",
  ].filter(Boolean) as Array<"tavily" | "web_search">;

  return (
    <div className="flex flex-col gap-[16px]">
      {resource.tools.map((tool, idx) => {
        if (tool.type === "tavily") {
          return (
            <TavilyItem
              key={tool.id}
              tool={tool}
              idx={idx}
              onChange={(updated) => updateTool(idx, updated)}
              onDelete={() => deleteTool(idx)}
              errors={errors}
              errorPrefix={errorPrefix}
            />
          );
        }
        return (
          <WebSearchItem
            key={tool.id}
            tool={tool}
            idx={idx}
            onChange={(updated) => updateTool(idx, updated)}
            onDelete={() => deleteTool(idx)}
            errors={errors}
            errorPrefix={errorPrefix}
          />
        );
      })}

      {availableTypes.length > 0 && (
        <div className="relative self-start">
          <button
            type="button"
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="flex items-center gap-[8px] bg-[rgba(255,255,255,0.05)] h-[32px] px-[12px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <svg className="size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
              <path d="M7 2.333v9.334M2.333 7h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Adicionar ferramenta de pesquisa</span>
          </button>
          {addMenuOpen && (
            <div className="absolute top-[calc(100%+4px)] left-0 z-50 bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[8px] py-[4px] min-w-[180px] shadow-lg">
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => addTool(type)}
                  className="flex items-center w-full px-[12px] py-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px]">{RESEARCH_TYPE_LABELS[type]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {resource.tools.length === 0 && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">Adicione Tavily ou Web Search para habilitar pesquisa.</p>
      )}
    </div>
  );
}
