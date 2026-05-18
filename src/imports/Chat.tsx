import svgPaths from "./svg-hbx6be7g75";
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

function IconCopy() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Copy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_48_4090)" id="Icon / Copy">
          <path d={svgPaths.p5752d00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_48_4090">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative shrink-0 size-[36px]" data-name="Button">
      <IconCopy />
    </div>
  );
}

function IconPencil() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_48_4093)" id="Icon / Pencil">
          <path d={svgPaths.p24ecce00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_48_4093">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 size-[36px]" data-name="Button">
      <IconPencil />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex items-start opacity-0 relative shrink-0" data-name="ButtonGroup">
      <Button />
      <div className="opacity-0 self-stretch shrink-0 w-px" data-name="ButtonGroupSeparator" style={{ backgroundImage: "linear-gradient(90deg, rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.2) 100%), linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)" }} />
      <Button1 />
    </div>
  );
}

function FlexVertical() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Flex Vertical">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full whitespace-pre-wrap">Quantas peças ainda estão pendentes para concluir o lote de produção programado para esta semana e quais verificações devem ser feitas para validar essa quantidade no sistema?</p>
    </div>
  );
}

function Question() {
  return (
    <div className="bg-[#2563eb] content-stretch flex flex-col items-start px-[16px] py-[12px] relative rounded-[10px] shrink-0 w-[436px]" data-name="Question">
      <FlexVertical />
    </div>
  );
}

function ChatMessageQuestion() {
  return (
    <div className="content-stretch flex gap-[8px] items-start max-w-[517px] relative shrink-0 w-full" data-name="chat-message-question">
      <ButtonGroup />
      <Question />
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function IconCopy1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon / Copy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_48_4084)" id="Icon / Copy">
          <path d={svgPaths.p5752d00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
        <defs>
          <clipPath id="clip0_48_4084">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <IconCopy1 />
    </div>
  );
}

function Flex() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Flex">
      <Button2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
      <div className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Status da produção: Lote em andamento</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">📌 Quantidade pendente identificada: ainda faltam 42 peças para finalizar o lote programado para esta semana.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Vamos validar juntos:</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Confira o relatório de produção no sistema e confirme o total planejado para o lote.</p>
        <p className="mb-0">Verifique as peças já finalizadas e aprovadas na inspeção de qualidade.</p>
        <p className="mb-0">Compare com a meta semanal para confirmar se há alguma divergência no apontamento de horas ou na contagem manual.</p>
        <p className="mb-0">&nbsp;</p>
        <p>💡 Se houver diferença entre a quantidade produzida e o que está registrado no sistema, pode ser necessário revisar os apontamentos do turno ou os registros de refugo.</p>
      </div>
      <Flex />
    </div>
  );
}

function AssistentResponse() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="assistent-response">
      <Avatar />
      <Frame />
    </div>
  );
}

export default function Chat() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-end py-[24px] relative size-full" data-name="Chat">
      <ChatMessageQuestion />
      <AssistentResponse />
    </div>
  );
}