import { useState } from "react";
import MetadataSchemaEditor from "@/app/components/resources/MetadataSchemaEditor";
import type {
  DatabaseProvider,
  DatabaseType,
  McpTransport,
  ValidationErrors,
} from "@/app/types/resourcesTools";

interface DatabaseProviderFormProps {
  provider: DatabaseProvider;
  onChange: (updated: DatabaseProvider) => void;
  onDelete: () => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[12px] mt-[4px]">{message}</p>;
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  hasValue,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hasValue?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
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
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            tabIndex={-1}
          >
            {show ? (
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M2 8s2.667-4.667 6-4.667S14 8 14 8s-2.667 4.667-6 4.667S2 8 2 8z" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                <path d="M8 9.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666z" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            ) : (
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M9.413 9.414A2 2 0 016.586 6.586M13.36 13.36C12.05 14.37 10.1 15.333 8 15.333 4.667 15.333 2 11.333 2 8a10.4 10.4 0 011.64-3.36M6.4 3.067A6.94 6.94 0 018 2.667c3.333 0 6 4 6 5.333a9.36 9.36 0 01-1.64 2.72M2 2l12 12" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
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

function TextareaInput({
  value,
  onChange,
  placeholder,
  maxLength = 500,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div className="relative">
      <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[8px] w-full">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={3}
          className="w-full font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] resize-none p-[12px]"
        />
        <div className="flex justify-end px-[12px] pb-[8px]">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">{value.length}/{maxLength}</span>
        </div>
      </div>
    </div>
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
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

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-[10px]">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-[20px] w-[36px] shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-[#2563eb]" : "bg-[rgba(255,255,255,0.15)]"}`}
      >
        <span
          className={`inline-block size-[16px] rounded-full bg-white shadow transition-transform duration-200 mt-[2px] ${checked ? "translate-x-[18px]" : "translate-x-[2px]"}`}
        />
      </button>
      <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">{label}</span>
    </div>
  );
}

function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addChip = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput("");
  };

  const removeChip = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-wrap gap-[6px] items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-[8px] p-[8px] min-h-[36px]">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-[4px] bg-[#1f2937] rounded-[4px] px-[8px] py-[3px]">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[12px]">{v}</span>
          <button type="button" onClick={() => removeChip(i)} className="opacity-50 hover:opacity-100">
            <svg className="size-[10px]" fill="none" viewBox="0 0 10 10">
              <path d="M8 2L2 8M2 2l6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addChip(); }
        }}
        onBlur={addChip}
        placeholder={values.length === 0 ? (placeholder || "Digite e pressione Enter") : ""}
        className="flex-1 min-w-[100px] font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] bg-transparent border-none outline-none placeholder:text-[#9ca3af]"
      />
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#f9fafb] text-[14px] whitespace-nowrap">
      {children}{required && <span className="text-[#f87171] ml-[2px]">*</span>}
    </p>
  );
}

export default function DatabaseProviderForm({ provider, onChange, onDelete, errors, errorPrefix }: DatabaseProviderFormProps) {
  const e = (field: string) => errors[`${errorPrefix}.${field}`];

  const update = (patch: Partial<DatabaseProvider>) => onChange({ ...provider, ...patch });

  const DB_OPTIONS = [
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "sqlserver", label: "SQL Server" },
  ];

  const TRANSPORT_OPTIONS = [
    { value: "stdio", label: "stdio" },
    { value: "http", label: "http" },
    { value: "websocket", label: "websocket" },
  ];

  return (
    <div className="flex flex-col gap-[20px] w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[15px]">Conexão</p>
        <button
          onClick={onDelete}
          className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          title="Remover conexão"
        >
          <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
            <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
      </div>

      {/* Database type */}
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Banco de dados</FieldLabel>
        <SelectInput
          value={provider.database}
          onChange={(v) => update({ database: v as DatabaseType })}
          options={DB_OPTIONS}
          placeholder="Selecione o banco..."
        />
        <FieldError message={e("database")} />
      </div>

      {/* MCP toggle */}
      <ToggleSwitch
        checked={provider.use_mcp}
        onChange={(v) => update({ use_mcp: v })}
        label="Usar MCP"
      />

      {/* Connection string — hidden when MCP */}
      {!provider.use_mcp && (
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>String de conexão</FieldLabel>
          <PasswordInput
            value={provider.connection_string}
            onChange={(v) => update({ connection_string: v })}
            placeholder="postgresql://user:pass@host:5432/db"
            hasValue={!!provider.connection_string}
          />
          <FieldError message={e("connection_string")} />
        </div>
      )}

      {/* MCP fields — visible when MCP */}
      {provider.use_mcp && (
        <div className="flex flex-col gap-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[16px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">Configuração MCP</p>
          <div className="grid grid-cols-2 gap-[12px]">
            <div className="flex flex-col gap-[8px]">
              <FieldLabel required>Host</FieldLabel>
              <TextInput value={provider.mcp_host} onChange={(v) => update({ mcp_host: v })} placeholder="localhost" />
              <FieldError message={e("mcp_host")} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <FieldLabel>Porta</FieldLabel>
              <TextInput value={provider.mcp_port} onChange={(v) => update({ mcp_port: v })} placeholder="3000" type="number" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <FieldLabel>Transporte</FieldLabel>
            <SelectInput
              value={provider.mcp_transport}
              onChange={(v) => update({ mcp_transport: v as McpTransport })}
              options={TRANSPORT_OPTIONS}
              placeholder="Selecione..."
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <FieldLabel>Chave secreta</FieldLabel>
            <PasswordInput
              value={provider.mcp_secret_key}
              onChange={(v) => update({ mcp_secret_key: v })}
              placeholder="sk-..."
              hasValue={!!provider.mcp_secret_key}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <FieldLabel>Comando MCP</FieldLabel>
            <TextInput value={provider.mcp_command} onChange={(v) => update({ mcp_command: v })} placeholder="npx mcp-server" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <FieldLabel>Argumentos (mcp_args)</FieldLabel>
            <ChipInput
              values={provider.mcp_args}
              onChange={(v) => update({ mcp_args: v })}
              placeholder="Digite um argumento e pressione Enter"
            />
          </div>
        </div>
      )}

      {/* System prompt */}
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>System prompt</FieldLabel>
        <TextareaInput
          value={provider.system_prompt}
          onChange={(v) => update({ system_prompt: v })}
          placeholder="Descreva como o agente deve usar este banco de dados..."
        />
        <FieldError message={e("system_prompt")} />
      </div>

      {/* Metadata schema */}
      <div className="flex flex-col gap-[8px]">
        <FieldLabel>Metadata (schema do banco)</FieldLabel>
        <MetadataSchemaEditor
          schemas={provider.metadata}
          onChange={(schemas) => update({ metadata: schemas })}
          errors={errors}
          errorPrefix={`${errorPrefix}.metadata`}
        />
      </div>

      <div className="h-px bg-[rgba(255,255,255,0.08)] w-full" />
    </div>
  );
}
