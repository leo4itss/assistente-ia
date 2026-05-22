import { useState } from "react";
import type { Resource } from "@/app/types/resourcesTools";

const RESOURCE_LABELS: Record<Resource["type"], string> = {
  agent_database: "Banco de dados",
  agent_documents: "Documentos",
  agent_research: "Pesquisa",
};

interface ResourceCardProps {
  resource: Resource;
  onDelete: () => void;
  children: React.ReactNode;
}

export default function ResourceCard({ resource, onDelete, children }: ResourceCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="bg-[#111827] relative rounded-[14px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      {/* Card Header */}
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[rgba(255,255,255,0.08)]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">
          {RESOURCE_LABELS[resource.type]}
        </p>
        <div className="flex items-center gap-[8px]">
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
              title="Remover recurso"
            >
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* Card Body */}
      <div className="px-[24px] py-[20px]">
        {children}
      </div>
    </div>
  );
}
