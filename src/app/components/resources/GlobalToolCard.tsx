import { useState } from "react";
import type { GlobalTool, McpTool, AzureAiSearchTool, GlobalMcpTransport, ValidationErrors } from "@/app/types/resourcesTools";

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

function TextInput({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center px-[12px] size-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] min-w-0"
        />
      </div>
    </div>
  );
}

function SelectInput({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center px-[12px] size-full relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none appearance-none cursor-pointer min-w-0"
          style={{ color: value ? "#f9fafb" : "#9ca3af" }}
        >
          {placeholder && <option value="" disabled style={{ color: "#9ca3af", background: "#111827" }}>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: "#111827", color: "#f9fafb" }}>{opt.label}</option>
          ))}
        </select>
        <svg className="shrink-0 size-[14px] opacity-50 pointer-events-none" fill="none" viewBox="0 0 14 14">
          <path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
      </div>
    </div>
  );
}

function TextareaInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] resize-none p-[12px]"
      />
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#f9fafb] text-[14px]">
      {children}{required && <span className="text-[#f87171] ml-[2px]">*</span>}
    </p>
  );
}

const TOOL_LABELS: Record<GlobalTool["type"], string> = {
  mcp: "MCP",
  azure_ai_search: "Azure AI Search",
};

interface GlobalToolCardProps {
  tool: GlobalTool;
  idx: number;
  onChange: (updated: GlobalTool) => void;
  onDelete: () => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

function McpForm({ tool, onChange, errors, errorPrefix }: {
  tool: McpTool; onChange: (t: McpTool) => void; errors: ValidationErrors; errorPrefix: string;
}) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const TRANSPORT_OPTIONS = [
    { value: "stdio", label: "stdio" },
    { value: "sse", label: "sse" },
  ];
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>URL</FieldLabel>
        <TextInput value={tool.url} onChange={(v) => onChange({ ...tool, url: v })} placeholder="https://mcp.example.com" type="url" />
        <FieldError message={e("url")} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Transporte</FieldLabel>
        <SelectInput value={tool.transport} onChange={(v) => onChange({ ...tool, transport: v as GlobalMcpTransport })} options={TRANSPORT_OPTIONS} placeholder="Selecione..." />
        <FieldError message={e("transport")} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <FieldLabel>Chave secreta</FieldLabel>
        <PasswordInput value={tool.secret_key} onChange={(v) => onChange({ ...tool, secret_key: v })} placeholder="sk-..." hasValue={!!tool.secret_key} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <FieldLabel>System prompt</FieldLabel>
        <TextareaInput value={tool.system_prompt} onChange={(v) => onChange({ ...tool, system_prompt: v })} placeholder="Descreva como o agente deve usar esta ferramenta MCP..." />
      </div>
    </div>
  );
}

function AzureForm({ tool, onChange, errors, errorPrefix }: {
  tool: AzureAiSearchTool; onChange: (t: AzureAiSearchTool) => void; errors: ValidationErrors; errorPrefix: string;
}) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Nome do serviço</FieldLabel>
        <TextInput value={tool.service_name} onChange={(v) => onChange({ ...tool, service_name: v })} placeholder="meu-azure-search" />
        <FieldError message={e("service_name")} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>API Key</FieldLabel>
        <PasswordInput value={tool.api_key} onChange={(v) => onChange({ ...tool, api_key: v })} placeholder="Informe a API key do Azure..." hasValue={!!tool.api_key} />
        <FieldError message={e("api_key")} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>System prompt</FieldLabel>
        <TextareaInput value={tool.system_prompt} onChange={(v) => onChange({ ...tool, system_prompt: v })} placeholder="Descreva como o agente deve usar o Azure AI Search..." />
        <FieldError message={e("system_prompt")} />
      </div>
    </div>
  );
}

export default function GlobalToolCard({ tool, idx, onChange, onDelete, errors, errorPrefix }: GlobalToolCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="bg-[#111827] relative rounded-[14px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      {/* Header */}
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[rgba(255,255,255,0.08)]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">{TOOL_LABELS[tool.type]}</p>
        <div className="flex items-center gap-[8px]">
          {confirmDelete ? (
            <>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">Remover?</span>
              <button onClick={onDelete} className="bg-[rgba(248,113,113,0.15)] flex h-[28px] items-center justify-center px-[10px] rounded-[6px] hover:bg-[rgba(239,68,68,0.25)] transition-colors">
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f87171] text-[13px]">Sim</span>
              </button>
              <button onClick={() => setConfirmDelete(false)} className="bg-[rgba(255,255,255,0.05)] flex h-[28px] items-center justify-center px-[10px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Não</span>
              </button>
            </>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.05)] transition-colors" title="Remover ferramenta">
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* Body */}
      <div className="px-[24px] py-[20px]">
        {tool.type === "mcp" && (
          <McpForm tool={tool} onChange={onChange as (t: McpTool) => void} errors={errors} errorPrefix={errorPrefix} />
        )}
        {tool.type === "azure_ai_search" && (
          <AzureForm tool={tool} onChange={onChange as (t: AzureAiSearchTool) => void} errors={errors} errorPrefix={errorPrefix} />
        )}
      </div>
    </div>
  );
}
