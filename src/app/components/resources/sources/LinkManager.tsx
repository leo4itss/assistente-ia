import { useState } from "react";
import { FieldLabel, TextInput } from "@/app/components/resources/fields/Fields";
import type { DocumentLink } from "@/app/types/assistantConfig";

function newId() {
  return Math.random().toString(36).slice(2);
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

interface Props {
  links: DocumentLink[];
  onChange: (links: DocumentLink[]) => void;
}

export default function LinkManager({ links, onChange }: Props) {
  const [input, setInput] = useState("");

  const addLink = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const link: DocumentLink = isValidUrl(trimmed)
      ? { id: newId(), url: trimmed, status: "ready" }
      : { id: newId(), url: trimmed, status: "error", error: "URL inválida." };
    onChange([...links, link]);
    setInput("");
  };

  const removeLink = (id: string) => onChange(links.filter((l) => l.id !== id));

  return (
    <div className="flex flex-col gap-[8px]">
      <FieldLabel>Links de páginas</FieldLabel>
      <div className="flex gap-[8px]">
        <div className="flex-1">
          <TextInput
            value={input}
            onChange={setInput}
            placeholder="https://exemplo.com/pagina"
          />
        </div>
        <button
          type="button"
          onClick={addLink}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] h-[36px] px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors shrink-0"
        >
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Adicionar</span>
        </button>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
        Links passam por extração de conteúdo (web scraping) antes de ir para o RAG.
      </p>

      {links.length === 0 ? (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">Nenhum link adicionado.</p>
      ) : (
        <div className="flex flex-col gap-[6px]">
          {links.map((link) => (
            <div
              key={link.id}
              className={`flex items-center gap-[10px] rounded-[8px] px-[12px] py-[8px] ${link.status === "error" ? "bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)]" : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]"}`}
            >
              <svg className="size-[14px] shrink-0 opacity-60" fill="none" viewBox="0 0 16 16">
                <path d="M6.667 9.333a2.667 2.667 0 003.808.146l2.03-2.03a2.667 2.667 0 00-3.77-3.77L7.5 4.913M9.333 6.667a2.667 2.667 0 00-3.808-.146l-2.03 2.03a2.667 2.667 0 003.77 3.77l1.226-1.225" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[13px] truncate">{link.url}</span>
                {link.status === "error" && (
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[11px]">{link.error}</span>
                )}
              </div>
              <button onClick={() => removeLink(link.id)} className="opacity-50 hover:opacity-100 transition-opacity shrink-0" title="Remover">
                <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
                  <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
