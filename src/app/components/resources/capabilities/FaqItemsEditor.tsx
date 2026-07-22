import { useState, useRef } from "react";
import { FieldLabel, FieldError, TextInput, TextareaInput } from "@/app/components/resources/fields/Fields";
import type { FaqItem, FaqAttachment, ValidationErrors } from "@/app/types/assistantConfig";

function newId() {
  return Math.random().toString(36).slice(2);
}

function newFaqItem(): FaqItem {
  return { id: newId(), question: "", answer: "", attachments: [] };
}

function FaqAttachmentList({
  attachments,
  onChange,
}: {
  attachments: FaqAttachment[];
  onChange: (updated: FaqAttachment[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addingLink, setAddingLink] = useState(false);
  const [linkValue, setLinkValue] = useState("");

  const addFiles = (files: FileList) => {
    const added: FaqAttachment[] = Array.from(files).map((f) => ({ id: newId(), type: "file", label: f.name }));
    onChange([...attachments, ...added]);
  };

  const confirmLink = () => {
    const trimmed = linkValue.trim();
    if (trimmed) onChange([...attachments, { id: newId(), type: "link", label: trimmed }]);
    setLinkValue("");
    setAddingLink(false);
  };

  const remove = (id: string) => onChange(attachments.filter((a) => a.id !== id));

  return (
    <div className="flex flex-col gap-[8px]">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-[6px]">
          {attachments.map((a) => (
            <div key={a.id} className="flex items-center gap-[6px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] rounded-[6px] px-[8px] py-[4px]">
              {a.type === "file" ? (
                <svg className="size-[11px] opacity-70 shrink-0" fill="none" viewBox="0 0 16 16">
                  <path d="M9.333 1.333H4A1.333 1.333 0 002.667 2.667v10.666A1.333 1.333 0 004 14.667h8a1.333 1.333 0 001.333-1.334V5.333L9.333 1.333z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                </svg>
              ) : (
                <svg className="size-[11px] opacity-70 shrink-0" fill="none" viewBox="0 0 16 16">
                  <path d="M6.667 9.333a2.667 2.667 0 003.808.146l2.03-2.03a2.667 2.667 0 00-3.77-3.77L7.5 4.913M9.333 6.667a2.667 2.667 0 00-3.808-.146l-2.03 2.03a2.667 2.667 0 003.77 3.77l1.226-1.225" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                </svg>
              )}
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[12px] max-w-[160px] truncate">{a.label}</span>
              <button type="button" onClick={() => remove(a.id)} className="opacity-50 hover:opacity-100 shrink-0">
                <svg className="size-[10px]" fill="none" viewBox="0 0 10 10">
                  <path d="M8 2L2 8M2 2l6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {addingLink ? (
        <div className="flex gap-[6px]">
          <div className="flex-1">
            <TextInput value={linkValue} onChange={setLinkValue} placeholder="https://..." />
          </div>
          <button type="button" onClick={confirmLink} className="bg-[#2563eb] px-[14px] rounded-[8px] shrink-0">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-white text-[12px]">Ok</span>
          </button>
        </div>
      ) : (
        <div className="flex gap-[8px]">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] h-[28px] px-[10px] rounded-[6px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[12px]">+ Arquivo</span>
          </button>
          <button
            type="button"
            onClick={() => setAddingLink(true)}
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] h-[28px] px-[10px] rounded-[6px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[12px]">+ Link</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      )}
    </div>
  );
}

interface FaqItemCardProps {
  item: FaqItem;
  index: number;
  onChange: (updated: FaqItem) => void;
  onDelete: () => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

function FaqItemCard({ item, index, onChange, onDelete, errors, errorPrefix }: FaqItemCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<FaqItem>) => onChange({ ...item, ...patch });

  return (
    <div className="flex flex-col gap-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[16px]">
      <div className="flex items-center justify-between">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">FAQ {index + 1}</p>
        {confirmDelete ? (
          <div className="flex items-center gap-[8px]">
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">Remover?</span>
            <button onClick={onDelete} className="bg-[rgba(248,113,113,0.15)] flex h-[26px] items-center justify-center px-[10px] rounded-[6px] hover:bg-[rgba(239,68,68,0.25)] transition-colors">
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f87171] text-[12px]">Sim</span>
            </button>
            <button onClick={() => setConfirmDelete(false)} className="bg-[rgba(255,255,255,0.05)] flex h-[26px] items-center justify-center px-[10px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[12px]">Não</span>
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.05)] transition-colors" title="Remover">
            <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
              <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Pergunta</FieldLabel>
        <TextInput value={item.question} onChange={(v) => update({ question: v })} placeholder="Ex.: Como faço para redefinir minha senha?" />
        <FieldError message={e("question")} />
      </div>

      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Resposta</FieldLabel>
        <TextareaInput value={item.answer} onChange={(v) => update({ answer: v })} placeholder="Resposta completa. A semântica de roteamento vem daqui, não dos anexos." rows={3} />
        <FieldError message={e("answer")} />
      </div>

      <div className="flex flex-col gap-[8px]">
        <FieldLabel>Anexos</FieldLabel>
        <FaqAttachmentList attachments={item.attachments} onChange={(attachments) => update({ attachments })} />
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
          Arquivos e links ficam disponíveis como referência — não passam por RAG.
        </p>
      </div>
    </div>
  );
}

interface Props {
  items: FaqItem[];
  onChange: (items: FaqItem[]) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function FaqItemsEditor({ items, onChange, errors, errorPrefix }: Props) {
  const update = (idx: number, updated: FaqItem) => {
    const copy = [...items];
    copy[idx] = updated;
    onChange(copy);
  };

  const add = () => onChange([...items, newFaqItem()]);
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-[12px]">
      <FieldLabel>Perguntas e respostas</FieldLabel>

      {items.length === 0 && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">Nenhum par pergunta/resposta cadastrado.</p>
      )}

      {items.map((item, idx) => (
        <FaqItemCard
          key={item.id}
          item={item}
          index={idx}
          onChange={(updated) => update(idx, updated)}
          onDelete={() => remove(idx)}
          errors={errors}
          errorPrefix={`${errorPrefix}.items.${idx}`}
        />
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-[8px] self-start bg-[rgba(255,255,255,0.05)] h-[32px] px-[12px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
      >
        <svg className="size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
          <path d="M7 2.333v9.334M2.333 7h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Adicionar pergunta</span>
      </button>
    </div>
  );
}
