import { useRef, useState } from "react";
import { FieldLabel, FieldError, TextInput, TextareaInput } from "@/app/components/resources/fields/Fields";
import RestrictionCard from "@/app/components/resources/identity/RestrictionCard";
import type { Identity, Restriction, ValidationErrors } from "@/app/types/assistantConfig";

// Constantes fixas da plataforma — não fazem parte do config do assistente, só exibidas.
const PLATFORM_TENANT_ID = "docnix";
const PLATFORM_AGENT = "pas_ai";

function newId() {
  return Math.random().toString(36).slice(2);
}

function newRestriction(): Restriction {
  return { id: newId(), title: "", instruction: "", instructionAnswer: "", restrictedWords: [] };
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#6b7280] text-[11px] tracking-[0.5px]">{label}</p>
      <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[8px] h-[36px] flex items-center px-[12px]">
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[#d1d5db] text-[14px] truncate">{value}</span>
      </div>
    </div>
  );
}

interface Props {
  identity: Identity;
  onChange: (updated: Identity) => void;
  errors: ValidationErrors;
  assistantId: string;
  schemaVersion: number;
}

type Tab = "assistant" | "system";

export default function IdentitySection({ identity, onChange, errors, assistantId, schemaVersion }: Props) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("assistant");

  const handleAvatarPicked = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => onChange({ ...identity, avatar: reader.result as string });
    reader.readAsDataURL(file);
  };

  const updateRestriction = (idx: number, updated: Restriction) => {
    const copy = [...identity.restrictions];
    copy[idx] = updated;
    onChange({ ...identity, restrictions: copy });
  };

  const addRestriction = () => onChange({ ...identity, restrictions: [...identity.restrictions, newRestriction()] });
  const removeRestriction = (idx: number) => onChange({ ...identity, restrictions: identity.restrictions.filter((_, i) => i !== idx) });

  return (
    <div className="flex flex-col gap-[32px] w-full">
      <div className="flex gap-[24px] border-b border-[rgba(255,255,255,0.1)]">
        <button
          onClick={() => setActiveTab("assistant")}
          className={`pb-[12px] border-b-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] transition-colors ${
            activeTab === "assistant" ? "border-[#2563eb] text-[#f9fafb]" : "border-transparent text-[#9ca3af] hover:text-[#f9fafb]"
          }`}
        >
          Dados do assistente
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`pb-[12px] border-b-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] transition-colors ${
            activeTab === "system" ? "border-[#2563eb] text-[#f9fafb]" : "border-transparent text-[#9ca3af] hover:text-[#f9fafb]"
          }`}
        >
          Dados do sistema
        </button>
      </div>

      {activeTab === "system" && (
        <div className="flex flex-col gap-[16px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
            Dados gerados e gerenciados automaticamente pela plataforma. Estes campos não podem ser editados.
          </p>
          <div className="grid grid-cols-2 gap-[16px]">
            <ReadOnlyField label="_ID" value={assistantId} />
            <ReadOnlyField label="TENANT_ID" value={PLATFORM_TENANT_ID} />
            <ReadOnlyField label="AGENT" value={PLATFORM_AGENT} />
            <ReadOnlyField label="SCHEMA_VERSION" value={String(schemaVersion)} />
          </div>
        </div>
      )}

      {activeTab === "assistant" && (
      <>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px]">
          <FieldLabel>Insira uma novo avatar</FieldLabel>
          <div className="flex items-center gap-[16px]">
            <div className="relative rounded-[9999px] shrink-0 size-[48px] bg-[#1f2937] overflow-hidden flex items-center justify-center">
              {identity.avatar ? (
                <img alt="" className="absolute inset-0 size-full object-cover" src={identity.avatar} />
              ) : (
                <svg className="size-[20px] opacity-50" fill="none" viewBox="0 0 24 24">
                  <path d="M20 21a8 8 0 10-16 0" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              )}
            </div>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Fazer upload</span>
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleAvatarPicked(e.target.files[0]);
                e.target.value = "";
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Nome do Assistente</FieldLabel>
          <TextInput
            value={identity.assistantName}
            onChange={(v) => onChange({ ...identity, assistantName: v })}
            placeholder="Ex.: Vanessa IA"
          />
          <FieldError message={errors["identity.assistantName"]} />
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel>Descrição da persona</FieldLabel>
          <TextareaInput
            value={identity.persona}
            onChange={(v) => onChange({ ...identity, persona: v })}
            placeholder="Tom e papel do assistente. Ex.: Consultora especialista em SGI. Tom profissional, claro e prático."
            rows={3}
          />
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px]">
            Descreva a persona do assistente virtual, incluindo personalidade, tom de voz, estilo de comunicação e propósito. Isso garantirá uma experiência natural e alinhada às expectativas dos usuários.
          </p>
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel>Apresentação Resumida</FieldLabel>
          <TextareaInput
            value={identity.briefPresentation}
            onChange={(v) => onChange({ ...identity, briefPresentation: v })}
            placeholder="Digite um resumo breve da apresentação do assistente."
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <FieldLabel>Link de Apresentação em Vídeo</FieldLabel>
          <TextInput
            value={identity.videoLink}
            onChange={(v) => onChange({ ...identity, videoLink: v })}
            placeholder="Cole aqui o link do vídeo de apresentação do assistente."
          />
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex items-start justify-between gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Restrições</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
              Defina regras para orientar o que o assistente pode ou não fazer durante as interações.
            </p>
          </div>
          <button
            onClick={addRestriction}
            title="Adicionar restrição"
            className="bg-[rgba(255,255,255,0.05)] flex items-center justify-center size-[36px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors relative shrink-0"
          >
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
              <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
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
      </>
      )}
    </div>
  );
}
