import { useState, useRef, useEffect } from "react";
import ResourceCard from "@/app/components/resources/ResourceCard";
import DatabaseResourceSection from "@/app/components/resources/DatabaseResourceSection";
import DocumentsForm from "@/app/components/resources/DocumentsForm";
import ResearchForm from "@/app/components/resources/ResearchForm";
import type {
  Resource,
  ResourceType,
  AgentDatabase,
  AgentDocuments,
  AgentResearch,
  ValidationErrors,
} from "@/app/types/resourcesTools";

interface ResourcesTabProps {
  resources: Resource[];
  onChange: (updated: Resource[]) => void;
  errors: ValidationErrors;
}

function newId() {
  return Math.random().toString(36).slice(2);
}

function createResource(type: ResourceType): Resource {
  if (type === "agent_database") {
    const r: AgentDatabase = { id: newId(), type: "agent_database", version: "v1", tools: [] };
    return r;
  }
  if (type === "agent_documents") {
    const r: AgentDocuments = { id: newId(), type: "agent_documents", tools: [] };
    return r;
  }
  const r: AgentResearch = { id: newId(), type: "agent_research", tools: [] };
  return r;
}

const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  agent_database: "Banco de dados",
  agent_documents: "Documentos",
  agent_research: "Pesquisa",
};

export default function ResourcesTab({ resources, onChange, errors }: ResourcesTabProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleAdd = (type: ResourceType) => {
    onChange([...resources, createResource(type)]);
    setDropdownOpen(false);
  };

  const handleDelete = (idx: number) => {
    onChange(resources.filter((_, i) => i !== idx));
  };

  const handleUpdateResource = (idx: number, updated: Resource) => {
    const copy = [...resources];
    copy[idx] = updated;
    onChange(copy);
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="flex flex-col items-start gap-[24px] p-[32px] w-full max-w-[800px]">
        {/* Add button */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[rgba(255,255,255,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
              <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">Adicionar recurso</span>
            <svg className="size-[14px] shrink-0 opacity-60" fill="none" viewBox="0 0 14 14">
              <path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
          </button>
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute top-[calc(100%+4px)] left-0 z-50 bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[8px] py-[4px] min-w-[200px] shadow-lg">
              {(["agent_database", "agent_documents", "agent_research"] as ResourceType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleAdd(type)}
                  className="flex items-center w-full px-[12px] py-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px]">{RESOURCE_TYPE_LABELS[type]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {resources.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full py-[64px] gap-[16px]">
            <div className="flex items-center justify-center size-[48px] rounded-full bg-[rgba(255,255,255,0.05)]">
              <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[16px]">Nenhum recurso configurado</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px] text-center max-w-[320px]">Adicione bancos de dados, documentos ou pesquisa para conectar seu assistente a fontes de dados.</p>
          </div>
        )}

        {/* Resource cards */}
        {resources.map((resource, idx) => (
          <ResourceCard key={resource.id} resource={resource} onDelete={() => handleDelete(idx)}>
            {resource.type === "agent_database" && (
              <DatabaseResourceSection
                resource={resource}
                onChange={(updated) => handleUpdateResource(idx, updated)}
                errors={errors}
                errorPrefix={`resource.${idx}`}
              />
            )}
            {resource.type === "agent_documents" && (
              <DocumentsForm
                resource={resource}
                onChange={(updated) => handleUpdateResource(idx, updated)}
                errors={errors}
                errorPrefix={`resource.${idx}`}
              />
            )}
            {resource.type === "agent_research" && (
              <ResearchForm
                resource={resource}
                onChange={(updated) => handleUpdateResource(idx, updated)}
                errors={errors}
                errorPrefix={`resource.${idx}`}
              />
            )}
          </ResourceCard>
        ))}
      </div>
    </div>
  );
}
