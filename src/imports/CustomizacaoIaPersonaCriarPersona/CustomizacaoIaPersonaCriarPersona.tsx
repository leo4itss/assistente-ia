import svgPaths from "./svg-iyj974iz86";
import imgAvatar from "./cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

function Div() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Div">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#f9fafb] text-[20px] w-full">Criar Persona</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-end not-italic relative shrink-0 text-right w-[682px]" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[16px] w-[682px]">5 de 10 assistentes utilizados</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-[451px]">Você pode adicionar mais 5 assistentes.</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="content-stretch flex items-start justify-end px-[24px] relative shrink-0" data-name="Card Header">
      <Text />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[24px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Div />
      <CardHeader />
    </div>
  );
}

function ProBlocksPageHeader() {
  return (
    <div className="bg-[#030712] relative shrink-0 w-full" data-name="Pro Blocks / Page Header / 9.">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[32px] py-[16px] relative size-full">
          <Container />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Div">
      <div className="content-stretch flex items-start pb-[12px] relative shrink-0 w-full" data-name="Field / Legend">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#f9fafb] text-[16px]">Dados do assistente</p>
      </div>
    </div>
  );
}

function Flex() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Insira uma novo avatar</p>
    </div>
  );
}

function Flex1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Nome do Assistente</p>
    </div>
  );
}

function Flex2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Descrição da persona</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="h-[64px] min-h-[64px] relative shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">Descreva a personalidade e o propósito do assistente.</p>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px not-italic relative" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[16px] w-full">Controle de Criatividade</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-full">Defina o nível de criatividade que o assistente deve adotar.</p>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Card Header">
      <div className="content-stretch flex items-start px-[24px] relative size-full">
        <Text1 />
      </div>
    </div>
  );
}

function ItemContent() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[9px]" data-name="ItemContent">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">0</p>
    </div>
  );
}

function Track1() {
  return <div className="bg-[#2563eb] h-[6px] relative rounded-[9999px] shrink-0 w-full" data-name="Track" />;
}

function SliderTrack() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="SliderTrack">
      <Track1 />
      <div className="-translate-y-1/2 absolute bg-[#030712] right-[-8px] rounded-[9999px] size-[16px] top-1/2" data-name="Slider / Item">
        <div aria-hidden="true" className="absolute border border-[#2563eb] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}

function Range() {
  return (
    <div className="h-[6px] relative shrink-0 w-full" data-name="Range">
      <div className="content-stretch flex flex-col items-start pr-[150px] relative size-full">
        <SliderTrack />
      </div>
    </div>
  );
}

function Track() {
  return (
    <div className="bg-[#1f2937] content-stretch flex flex-col items-start relative rounded-[9999px] shrink-0 w-full" data-name="Track">
      <Range />
    </div>
  );
}

function ItemContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[7px]" data-name="ItemContent">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-[32px]">1</p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Card Content">
      <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[68px] items-center relative shrink-0 w-full" data-name="Slider-02">
          <ItemContent />
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px py-[5px] relative rounded-[9999px]" data-name="Slider">
            <Track />
          </div>
          <ItemContent1 />
        </div>
      </div>
    </div>
  );
}

function Flex3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Apresentação Resumida</p>
    </div>
  );
}

function Textarea1() {
  return (
    <div className="h-[64px] min-h-[64px] relative shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">Digite um resumo breve da apresentação do assistente.</p>
        </div>
      </div>
    </div>
  );
}

function Flex4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Link de Apresentação em Vídeo</p>
    </div>
  );
}

function FieldGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full" data-name="Field Group">
      <Div2 />
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex />
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar / Form Field">
          <div className="relative rounded-[9999px] shrink-0 size-[48px]" data-name="Avatar">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
              <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
              <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">Button</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex1 />
        <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Variant=Default, State=Default">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">Digite o nome que identificará o assistente.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex2 />
        <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Type=Textarea, State=Default">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <Textarea />
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[min-content]">Descreva a persona do assistente virtual, incluindo personalidade, tom de voz, estilo de comunicação e propósito. Isso garantirá uma experiência natural e alinhada às expectativas dos usuários.</p>
      </div>
      <div className="bg-[#111827] relative rounded-[14px] shrink-0 w-full" data-name="Card">
        <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip py-[24px] relative rounded-[inherit] size-full">
          <CardHeader1 />
          <CardContent />
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex3 />
        <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Type=Textarea, State=Default">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <Textarea1 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex4 />
        <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Variant=Default, State=Default">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">Cole aqui o link do vídeo de apresentação do assistente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="bg-[#030712] flex-[1_0_0] min-h-px relative w-full" data-name="Div">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center p-[32px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[28px] h-full items-end max-w-[640px] min-w-px relative" data-name="FieldSet">
            <FieldGroup />
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Field / Buttons">
              <div className="bg-[#2563eb] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
                  <p className="leading-[20px]">Button</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px relative" data-name="Main">
      <div className="bg-[#030712] h-[64px] relative shrink-0 w-full" data-name="Header /Header Assitent-02">
        <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
            <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / ArrowLeft">
                <div className="absolute inset-[20.83%]" data-name="Vector">
                  <div className="absolute inset-[-7.13%_-7.12%_-7.12%_-7.13%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6633 10.6633">
                      <path d={svgPaths.p458e400} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProBlocksPageHeader />
      <Div1 />
    </div>
  );
}

export default function CustomizacaoIaPersonaCriarPersona() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="[Customização IA] Persona > Criar persona">
      <Main />
    </div>
  );
}