import { FieldLabel, TextInput } from "@/app/components/resources/fields/Fields";
import type { CapabilityScopeEntry } from "@/app/types/assistantConfig";

function newId() {
  return Math.random().toString(36).slice(2);
}

interface Props {
  scope: CapabilityScopeEntry[];
  onChange: (scope: CapabilityScopeEntry[]) => void;
}

/**
 * Recorte de acesso da capability: pares schema → lista de tabelas/views.
 * Propositalmente simples (texto livre separado por vírgula) — não é o editor completo
 * de estrutura do banco (isso vive na Source, em `structure`).
 */
export default function ScopeEditor({ scope, onChange }: Props) {
  const add = () => onChange([...scope, { id: newId(), schema: "", tables: "" }]);
  const update = (idx: number, patch: Partial<CapabilityScopeEntry>) => {
    const copy = [...scope];
    copy[idx] = { ...copy[idx], ...patch };
    onChange(copy);
  };
  const remove = (idx: number) => onChange(scope.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-[8px]">
      <FieldLabel>Escopo (schema → tabelas/views)</FieldLabel>
      <div className="flex flex-col gap-[8px]">
        {scope.map((entry, idx) => (
          <div key={entry.id} className="flex gap-[8px] items-start">
            <div className="w-[120px] shrink-0">
              <TextInput value={entry.schema} onChange={(v) => update(idx, { schema: v })} placeholder="gold" />
            </div>
            <div className="flex-1 min-w-0">
              <TextInput
                value={entry.tables}
                onChange={(v) => update(idx, { tables: v })}
                placeholder="vw_gq_ocorrencias_enriquecidas, vw_gq_ocorrencias_abertas_30_dias"
              />
            </div>
            <button
              onClick={() => remove(idx)}
              className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors shrink-0"
              title="Remover"
            >
              <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
                <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-[8px] self-start bg-[rgba(255,255,255,0.05)] h-[32px] px-[12px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
      >
        <svg className="size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
          <path d="M7 2.333v9.334M2.333 7h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Schema</span>
      </button>
    </div>
  );
}
