import svgPaths from "./svg-by1ztwoei6";
import imgAvatar from "./cfa90523740b88f37cf837b3a4b69c4f932d514c.png";

function FlexVertical() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px relative" data-name="Flex Vertical">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic overflow-hidden relative shrink-0 text-[#f9fafb] text-[14px] text-ellipsis w-full whitespace-nowrap">Customização IA</p>
    </div>
  );
}

function SidebarHeader() {
  return (
    <div className="bg-[#111827] relative shrink-0 w-full" data-name="SidebarHeader">
      <div className="content-stretch flex flex-col items-start p-[8px] relative size-full">
        <div className="relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
              <FlexVertical />
              <div className="bg-[rgba(255,255,255,0)] max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[8px] shrink-0 size-[16px]" data-name="Button">
                <div className="flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] px-[16px] py-[8px] relative size-full">
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / Circle">
                      <div className="absolute inset-[8.33%]" data-name="Vector">
                        <div className="absolute inset-[-5%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                            <path d={svgPaths.pb60700} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarMenu() {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="SidebarMenu">
      <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
        <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / ArrowLeft">
                <div className="absolute inset-[20.83%]" data-name="Vector">
                  <div className="absolute inset-[-10.71%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3333 11.3333">
                      <path d={svgPaths.p2ac09e6f} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Voltar para o chat</p>
            </div>
          </div>
        </div>
      </button>
      <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
        <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Persona</p>
            </div>
          </div>
        </div>
      </button>
      <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
        <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Restrições</p>
            </div>
          </div>
        </div>
      </button>
      <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
        <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Cenário de Negócio</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="SidebarContent">
      <div className="content-stretch flex flex-col items-start py-[8px] relative size-full">
        <div className="relative shrink-0 w-full" data-name="Sidebar / SidebarGroup">
          <div className="content-stretch flex flex-col gap-[16px] items-start p-[8px] relative size-full">
            <SidebarMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Div">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#f9fafb] text-[20px] w-full">Persona</p>
    </div>
  );
}

function Flex() {
  return <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-[396px]" data-name="Flex" />;
}

function Container() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Div />
      <Flex />
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

function Flex1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Insira uma novo avatar</p>
    </div>
  );
}

function Flex2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Nome do Assistente</p>
    </div>
  );
}

function Flex3() {
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
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Assistente para testar adicionar assistetne.</p>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px not-italic relative" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[16px] w-full">Controle de Criatividade</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-full">Defina o nível de criatividade que o assistente deve adotar.</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Card Header">
      <div className="content-stretch flex items-start px-[24px] relative size-full">
        <Text />
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
        <div className="content-stretch flex gap-[8px] h-[68px] items-center opacity-50 relative shrink-0 w-full" data-name="Slider-02">
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

function Flex4() {
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

function Flex5() {
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
        <Flex1 />
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
        <Flex2 />
        <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] opacity-50 relative rounded-[8px] shrink-0 w-full" data-name="Variant=Default, State=Disabled">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">{`Alvaro Teste `}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex3 />
        <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start opacity-50 relative rounded-[8px] shrink-0 w-full" data-name="Type=Textarea, State=Disabled">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <Textarea />
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[min-content]">Descreva a persona do assistente virtual, incluindo personalidade, tom de voz, estilo de comunicação e propósito. Isso garantirá uma experiência natural e alinhada às expectativas dos usuários.</p>
      </div>
      <div className="bg-[#111827] relative rounded-[14px] shrink-0 w-full" data-name="Card">
        <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip py-[24px] relative rounded-[inherit] size-full">
          <CardHeader />
          <CardContent />
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex4 />
        <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start opacity-50 relative rounded-[8px] shrink-0 w-full" data-name="Type=Textarea, State=Disabled">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <Textarea1 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
        <Flex5 />
        <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] opacity-50 relative rounded-[8px] shrink-0 w-full" data-name="Variant=Default, State=Disabled">
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
              <div className="bg-[rgba(248,113,113,0.6)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">
                  <p className="leading-[20px]">Button</p>
                </div>
              </div>
              <div className="bg-[#1f2937] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
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
    <div className="content-stretch flex flex-col h-[1192px] items-start relative shrink-0 w-[1664px]" data-name="Main">
      <div className="bg-[#030712] h-[64px] relative shrink-0 w-full" data-name="Header /Header Assitent-02">
        <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
            <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[228px]" data-name="Combobox">
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="relative rounded-[9999px] shrink-0 size-[20px]" data-name="Avatar">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
                  <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                  <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
                </div>
              </div>
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis whitespace-nowrap">Assistentes</p>
              <div className="opacity-50 overflow-clip relative shrink-0 size-[16px]" data-name="Icon / ChevronsUpDown">
                <div className="absolute inset-[16.67%_29.17%]" data-name="Vector">
                  <div className="absolute inset-[-6.23%_-9.97%_-6.23%_-9.98%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99667 11.9967">
                      <path d={svgPaths.p297c1100} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#030712] relative shrink-0 w-[1664px]" data-name="Pro Blocks / Page Header / 9.">
        <div className="content-stretch flex flex-col items-center overflow-clip px-[32px] py-[16px] relative rounded-[inherit] size-full">
          <Container />
        </div>
        <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <Div1 />
    </div>
  );
}

export default function CustomizacaoIaPersonaPreencido() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="[Customização IA] Persona (preencido)">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#111827] content-stretch flex flex-col h-full items-start relative shrink-0 w-[256px]" data-name="Sidebar / Sidebar Assistent-02">
          <SidebarHeader />
          <SidebarContent />
        </div>
      </div>
      <Main />
    </div>
  );
}