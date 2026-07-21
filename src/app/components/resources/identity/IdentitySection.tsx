import { FieldLabel, TextareaInput } from "@/app/components/resources/fields/Fields";
import RestrictionCard from "@/app/components/resources/identity/RestrictionCard";
import type { Identity, Restriction, ValidationErrors } from "@/app/types/assistantConfig";

function newId() {
  return Math.random().toString(36).slice(2);
}

function newRestriction(): Restriction {
  return { id: newId(), title: "", instruction: "", instructionAnswer: "", restrictedWords: [] };
}

interface Props {
  identity: Identity;
  onChange: (updated: Identity) => void;
  errors: ValidationErrors;
}

export default function IdentitySection({ identity, onChange, errors }: Props) {
  const updateRestriction = (idx: number, updated: Restriction) => {
    const copy = [...identity.restrictions];
    copy[idx] = updated;
    onChange({ ...identity, restrictions: copy });
  };

  const addRestriction = () => onChange({ ...identity, restrictions: [...identity.restrictions, newRestriction()] });
  const removeRestriction = (idx: number) => onChange({ ...identity, restrictions: identity.restrictions.filter((_, i) => i !== idx) });

  return (
    <div className="flex flex-col gap-[32px] w-full">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#f9fafb] text-[20px]">Identity</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px]">
            Persona e guardrails de produto. Não entra no catálogo de roteamento do supervisor.
          </p>
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel>Persona</FieldLabel>
          <TextareaInput
            value={identity.persona}
            onChange={(v) => onChange({ ...identity, persona: v })}
            placeholder="Tom e papel do assistente. Ex.: Consultora especialista em SGI. Tom profissional, claro e prático."
            rows={3}
          />
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
            Injetado no synthesize/editor — define o tom com que o assistente responde.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex items-start justify-between gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Restrictions</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
              Hoje: soft prompt. Enforcement via rails é um plano separado.
            </p>
          </div>
          <button
            onClick={addRestriction}
            className="bg-[rgba(255,255,255,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors relative shrink-0"
          >
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
              <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">+ Restriction</span>
          </button>
        </div>

        {identity.restrictions.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-[48px] gap-[12px]">
            <div className="flex items-center justify-center size-[40px] rounded-full bg-[rgba(255,255,255,0.05)]">
              <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Nenhuma restrição configurada</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px] text-center max-w-[360px]">
              Adicione restrições sobre o que a IA pode ou não pode exibir.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px]">
            {identity.restrictions.map((restriction, idx) => (
              <RestrictionCard
                key={restriction.id}
                restriction={restriction}
                index={idx}
                onChange={(updated) => updateRestriction(idx, updated)}
                onDelete={() => removeRestriction(idx)}
                errors={errors}
                errorPrefix={`restriction.${idx}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
