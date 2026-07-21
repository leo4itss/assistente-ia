import { useState } from "react";

interface Props {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

/** Lista de chips removíveis com input de adição — mesmo padrão visual do ChipInput de MCP args. */
export default function ChipListInput({ values, onChange, placeholder }: Props) {
  const [input, setInput] = useState("");

  const addChip = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput("");
  };

  const removeChip = (idx: number) => onChange(values.filter((_, i) => i !== idx));

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
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addChip();
          }
        }}
        onBlur={addChip}
        placeholder={values.length === 0 ? placeholder || "Digite e pressione Enter" : ""}
        className="flex-1 min-w-[100px] font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] bg-transparent border-none outline-none placeholder:text-[#9ca3af]"
      />
    </div>
  );
}
