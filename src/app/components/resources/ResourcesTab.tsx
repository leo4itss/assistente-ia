import ResourceCard from "@/app/components/resources/ResourceCard";
import DatabaseResourceSection from "@/app/components/resources/DatabaseResourceSection";
import DocumentsForm from "@/app/components/resources/DocumentsForm";
import ResearchForm from "@/app/components/resources/ResearchForm";
import type {
  Resource,
  ValidationErrors,
} from "@/app/types/resourcesTools";

interface ResourcesTabProps {
  resources: Resource[];
  onChange: (updated: Resource[]) => void;
  errors: ValidationErrors;
}

export default function ResourcesTab({ resources, onChange, errors }: ResourcesTabProps) {
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
      <div className="flex flex-col items-start gap-[24px] px-[32px] pt-[32px] pb-[80px] w-full max-w-[800px]">
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
