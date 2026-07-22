import { useState } from "react";
import { FieldLabel, FieldError, TextInput, TextareaInput } from "@/app/components/resources/fields/Fields";
import ChipListInput from "@/app/components/resources/identity/ChipListInput";
import type { Restriction, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  restriction: Restriction;
  index: number;
  onChange: (updated: Restriction) => void;
  onDelete: () => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function RestrictionCard({ restriction, index, onChange, onDelete, errors, errorPrefix }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<Restriction>) => onChange({ ...restriction, ...patch });

  return (
    <div className="bg-[#111827] relative rounded-[14px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />

      <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[rgba(255,255,255,0.08)]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[15px]">Restrição #{index + 1}</p>
        {confirmDelete ? (
          <div className="flex items-center gap-[8px]">
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">Remover?</span>
            <button
              onClick={onDelete}
              className="bg-[rgba(248,113,113,0.15)] flex h-[28px] items-center justify-center px-[10px] rounded-[6px] hover:bg-[rgba(239,68,68,0.25)] transition-colors"
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f87171] text-[13px]">Sim</span>
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="bg-[rgba(255,255,255,0.05)] flex h-[28px] items-center justify-center px-[10px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Não</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="bg-[rgba(248,113,113,0.1)] flex h-[28px] items-center justify-center px-[10px] rounded-[6px] hover:bg-[rgba(248,113,113,0.2)] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f87171] text-[13px]">Remover</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-[16px] px-[20px] py-[20px]">
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Título</FieldLabel>
          <TextInput value={restriction.title} onChange={(v) => update({ title: v })} placeholder="Ex.: Dados pessoais e credenciais" />
          <FieldError message={e("title")} />
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Instrução</FieldLabel>
          <TextareaInput
            value={restriction.instruction}
            onChange={(v) => update({ instruction: v })}
            placeholder="Regra que o modelo deve seguir. Ex.: Não solicite, armazene nem repita CPF, senhas, tokens ou dados pessoais sensíveis do usuário."
            rows={3}
          />
          <FieldError message={e("instruction")} />
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel>Resposta padrão</FieldLabel>
          <TextareaInput
            value={restriction.instructionAnswer}
            onChange={(v) => update({ instructionAnswer: v })}
            placeholder="O que dizer ao usuário quando esta restrição é acionada. Ex.: Não posso tratar dados pessoais sensíveis neste canal."
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel>Palavras restritas</FieldLabel>
          <ChipListInput
            values={restriction.restrictedWords}
            onChange={(v) => update({ restrictedWords: v })}
            placeholder="Digite uma palavra e pressione Enter"
          />
        </div>
      </div>
    </div>
  );
}
