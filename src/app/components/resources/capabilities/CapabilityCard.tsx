import { useState } from "react";
import type { Capability, CapabilityKind, Source } from "@/app/types/assistantConfig";
import { SOURCE_KIND_LABELS } from "@/app/types/assistantConfig";

const KIND_BADGE: Record<CapabilityKind, { label: string; color: string; bg: string }> = {
  database: { label: "DATABASE", color: "#6ee7b7", bg: "rgba(16,185,129,0.15)" },
  documents: { label: "DOCUMENTS", color: "#93c5fd", bg: "rgba(37,99,235,0.15)" },
  research: { label: "RESEARCH", color: "#fcd34d", bg: "rgba(217,119,6,0.15)" },
  faq: { label: "FAQ", color: "#f9a8d4", bg: "rgba(219,39,119,0.15)" },
};

interface CapabilityCardProps {
  capability: Capability;
  /** Source vinculada (bind) — undefined se ainda não selecionada ou kind sem bind (faq). */
  boundSource?: Source;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export default function CapabilityCard({ capability, boundSource, expanded, onToggle, onDelete, children }: CapabilityCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const badge = KIND_BADGE[capability.kind];

  return (
    <div className="bg-[#111827] relative rounded-[14px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />

      <div className="flex items-center gap-[12px] px-[20px] py-[14px]">
        <button
          onClick={onToggle}
          className="flex items-center justify-center size-[20px] shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          title={expanded ? "Recolher" : "Expandir"}
        >
          <svg className={`size-[14px] transition-transform ${expanded ? "rotate-90" : ""}`} fill="none" viewBox="0 0 14 14">
            <path d="M5 3l4 4-4 4" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>

        <span
          className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] tracking-[0.5px] px-[8px] py-[3px] rounded-[4px] shrink-0"
          style={{ color: badge.color, backgroundColor: badge.bg }}
        >
          {badge.label}
        </span>

        <button onClick={onToggle} className="flex flex-col items-start min-w-0 flex-1 text-left">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[15px] truncate max-w-full">
            {capability.name || "Sem ID"}
          </span>
        </button>

        {boundSource ? (
          <span
            className="font-['Inter:Medium',sans-serif] font-medium text-[#9ca3af] text-[12px] px-[8px] py-[3px] rounded-full bg-[rgba(255,255,255,0.05)] shrink-0 flex items-center gap-[6px]"
            title="Fonte vinculada"
          >
            <svg className="size-[11px] opacity-70" fill="none" viewBox="0 0 16 16">
              <path d="M2 8h12M8 2v12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.33" />
            </svg>
            {boundSource.label || SOURCE_KIND_LABELS[boundSource.kind]}
          </span>
        ) : capability.kind !== "faq" ? (
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f87171] text-[12px] px-[8px] py-[3px] rounded-full bg-[rgba(248,113,113,0.1)] shrink-0">
            sem source
          </span>
        ) : null}

        <div className="flex items-center gap-[8px] shrink-0">
          {confirmDelete ? (
            <>
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
            </>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              title="Remover capacidade"
            >
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-[20px] pb-[20px] pt-[4px] border-t border-[rgba(255,255,255,0.08)]">
          <div className="pt-[16px]">{children}</div>
        </div>
      )}
    </div>
  );
}
