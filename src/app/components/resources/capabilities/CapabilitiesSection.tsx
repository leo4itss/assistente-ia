import { useState } from "react";
import CapabilityCard from "@/app/components/resources/capabilities/CapabilityCard";
import CapabilityDatabaseForm from "@/app/components/resources/capabilities/CapabilityDatabaseForm";
import CapabilityDocumentsForm from "@/app/components/resources/capabilities/CapabilityDocumentsForm";
import CapabilityResearchForm from "@/app/components/resources/capabilities/CapabilityResearchForm";
import CapabilityFaqForm from "@/app/components/resources/capabilities/CapabilityFaqForm";
import { CAPABILITY_KIND_LABELS } from "@/app/types/assistantConfig";
import type {
  Capability,
  CapabilityKind,
  CapabilityDatabase,
  CapabilityDocuments,
  CapabilityResearch,
  CapabilityFaq,
  Source,
  ValidationErrors,
} from "@/app/types/assistantConfig";

function newId() {
  return Math.random().toString(36).slice(2);
}

export function createCapability(kind: CapabilityKind): Capability {
  const routing = { description: "", examples: [] as string[] };
  if (kind === "database") {
    const c: CapabilityDatabase = { id: newId(), kind, name: "", sourceId: "", scope: [], routing, instructions: "" };
    return c;
  }
  if (kind === "documents") {
    const c: CapabilityDocuments = { id: newId(), kind, name: "", sourceId: "", routing, instructions: "" };
    return c;
  }
  if (kind === "research") {
    const c: CapabilityResearch = { id: newId(), kind, name: "", sourceId: "", routing, instructions: "" };
    return c;
  }
  const c: CapabilityFaq = { id: newId(), kind: "faq", name: "", routing, instructions: "", items: [] };
  return c;
}

interface CapabilitiesSectionProps {
  capabilities: Capability[];
  onChange: (updated: Capability[]) => void;
  sources: Source[];
  errors: ValidationErrors;
}

export default function CapabilitiesSection({ capabilities, onChange, sources, errors }: CapabilitiesSectionProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const add = (kind: CapabilityKind) => {
    const c = createCapability(kind);
    onChange([...capabilities, c]);
    setExpanded((prev) => ({ ...prev, [c.id]: true }));
  };

  const update = (idx: number, updated: Capability) => {
    const copy = [...capabilities];
    copy[idx] = updated;
    onChange(copy);
  };

  const remove = (idx: number) => onChange(capabilities.filter((_, i) => i !== idx));

  const sourceById = (id: string) => sources.find((s) => s.id === id);

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <div className="flex items-start gap-[16px]">
        <AddCapabilityButton onAdd={add} />
      </div>

      {capabilities.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-[64px] gap-[16px]">
          <div className="flex items-center justify-center size-[48px] rounded-full bg-[rgba(255,255,255,0.05)]">
            <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[16px]">Nenhuma capacidade configurada</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px] text-center max-w-[400px]">
            Capacidades dizem ao agente quando e como usar uma fonte. Cadastre uma fonte primeiro em "Fontes", depois crie a capacidade que faz o vínculo.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-[16px]">
          {capabilities.map((capability, idx) => (
            <CapabilityCard
              key={capability.id}
              capability={capability}
              boundSource={"sourceId" in capability ? sourceById(capability.sourceId) : undefined}
              expanded={!!expanded[capability.id]}
              onToggle={() => toggle(capability.id)}
              onDelete={() => remove(idx)}
            >
              {capability.kind === "database" && (
                <CapabilityDatabaseForm capability={capability} onChange={(u) => update(idx, u)} sources={sources} errors={errors} errorPrefix={`capability.${idx}`} />
              )}
              {capability.kind === "documents" && (
                <CapabilityDocumentsForm capability={capability} onChange={(u) => update(idx, u)} sources={sources} errors={errors} errorPrefix={`capability.${idx}`} />
              )}
              {capability.kind === "research" && (
                <CapabilityResearchForm capability={capability} onChange={(u) => update(idx, u)} sources={sources} errors={errors} errorPrefix={`capability.${idx}`} />
              )}
              {capability.kind === "faq" && (
                <CapabilityFaqForm capability={capability} onChange={(u) => update(idx, u)} errors={errors} errorPrefix={`capability.${idx}`} />
              )}
            </CapabilityCard>
          ))}
        </div>
      )}
    </div>
  );
}

function AddCapabilityButton({ onAdd }: { onAdd: (kind: CapabilityKind) => void }) {
  // FAQ fica fora por enquanto — não está sendo trabalhado nesta etapa.
  const KINDS: CapabilityKind[] = ["database", "documents", "research"];

  return (
    <div className="flex gap-[8px] shrink-0">
      {KINDS.map((kind) => (
        <button
          key={kind}
          onClick={() => onAdd(kind)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        >
          <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
            <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">{CAPABILITY_KIND_LABELS[kind]}</span>
        </button>
      ))}
    </div>
  );
}
