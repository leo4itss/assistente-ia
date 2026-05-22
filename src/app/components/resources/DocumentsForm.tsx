import { useState } from "react";
import type { AgentDocuments, Documents, ValidationErrors } from "@/app/types/resourcesTools";

function newId() { return Math.random().toString(36).slice(2); }

function newDocuments(): Documents {
  return { id: newId(), connection_string: "", system_prompt: "" };
}

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

interface DocumentsFormProps {
  resource: AgentDocuments;
  onChange: (updated: AgentDocuments) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

function DocumentItem({ doc, idx, onChange, onDelete, errors, errorPrefix }: {
  doc: Documents; idx: number; onChange: (d: Documents) => void; onDelete: () => void;
  errors: ValidationErrors; errorPrefix: string;
}) {
  const e = (f: string) => errors[`${errorPrefix}.tools.${idx}.${f}`];
  return (
    <div className="flex flex-col gap-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[16px]">
      <div className="flex items-center justify-between">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">Documentos {idx + 1}</p>
        <button onClick={onDelete} className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.05)] transition-colors" title="Remover">
          <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
            <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">String de conexão<span className="text-[#f87171] ml-[2px]">*</span></p>
        <PasswordInput value={doc.connection_string} onChange={(v) => onChange({ ...doc, connection_string: v })} placeholder="Informe a connection string..." hasValue={!!doc.connection_string} />
        <FieldError message={e("connection_string")} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">System prompt<span className="text-[#f87171] ml-[2px]">*</span></p>
        <TextareaInput value={doc.system_prompt} onChange={(v) => onChange({ ...doc, system_prompt: v })} placeholder="Descreva como o agente deve usar este repositório de documentos..." />
        <FieldError message={e("system_prompt")} />
      </div>
    </div>
  );
}

export default function DocumentsForm({ resource, onChange, errors, errorPrefix }: DocumentsFormProps) {
  const updateDoc = (idx: number, doc: Documents) => {
    const tools = [...resource.tools];
    tools[idx] = doc;
    onChange({ ...resource, tools });
  };

  const addDoc = () => onChange({ ...resource, tools: [...resource.tools, newDocuments()] });
  const deleteDoc = (idx: number) => onChange({ ...resource, tools: resource.tools.filter((_, i) => i !== idx) });

  return (
    <div className="flex flex-col gap-[16px]">
      {resource.tools.map((doc, idx) => (
        <DocumentItem
          key={doc.id}
          doc={doc}
          idx={idx}
          onChange={(updated) => updateDoc(idx, updated)}
          onDelete={() => deleteDoc(idx)}
          errors={errors}
          errorPrefix={errorPrefix}
        />
      ))}
      <button
        type="button"
        onClick={addDoc}
        className="flex items-center gap-[8px] self-start bg-[rgba(255,255,255,0.05)] h-[32px] px-[12px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
      >
        <svg className="size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
          <path d="M7 2.333v9.334M2.333 7h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Adicionar documentos</span>
      </button>
    </div>
  );
}
