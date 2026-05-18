import svgPaths from "./svg-1m8jzas3y7";
import imgAvatar from "./cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
type HeaderHeaderAssitentProps = {
  className?: string;
  breakpoints?: "Mobile" | "Desktop";
};

function HeaderHeaderAssitent({ className, breakpoints = "Desktop" }: HeaderHeaderAssitentProps) {
  const isMobile = breakpoints === "Mobile";
  return (
    <div className={className || `bg-[#030712] content-stretch flex h-[64px] items-center justify-between relative ${isMobile ? "p-[16px] w-[360px]" : "px-[32px] py-[16px] w-[1664px]"}`}>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className={`bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 ${isMobile ? "w-[192px]" : "w-[228px]"}`} data-name="Combobox">
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
            <div className={`absolute ${isMobile ? "inset-[-6.25%_-10%]" : "inset-[-6.23%_-9.97%_-6.23%_-9.98%]"}`}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isMobile ? "0 0 12 18" : "0 0 7.99667 11.9967"}>
                <path d={isMobile ? svgPaths.p2f0ccf40 : svgPaths.p297c1100} id="Vector" stroke={isMobile ? "var(--stroke-0, #030712)" : "var(--stroke-0, #F9FAFB)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={isMobile ? "2" : "1.33"} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type SidebarSidebarAssistentProps = {
  className?: string;
  colapded?: boolean;
};

function SidebarSidebarAssistent({ className, colapded = false }: SidebarSidebarAssistentProps) {
  const isColapded = colapded;
  const isNotColapded = !colapded;
  return (
    <div className={className || `bg-[#111827] content-stretch flex flex-col h-[1080px] items-start relative ${isColapded ? "w-[48px]" : "w-[256px]"}`}>
      <div className={`bg-[#111827] relative shrink-0 w-full ${isColapded ? "h-[64px]" : ""}`} data-name="SidebarHeader">
        <div className={`flex flex-col size-full ${isColapded ? "justify-center" : "content-stretch items-start p-[8px] relative"}`}>
          {isNotColapded && (
            <div className="relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px relative" data-name="Flex Vertical">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic overflow-hidden relative shrink-0 text-[#f9fafb] text-[14px] text-ellipsis w-full whitespace-nowrap">Customização IA</p>
                  </div>
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
          )}
          {isColapded && (
            <div className="content-stretch flex flex-col items-start justify-center p-[8px] relative size-full">
              <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / PanelLeftOpen">
                      <div className="absolute inset-[12.5%]" data-name="Vector">
                        <div className="absolute inset-[-5.56%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <path d={svgPaths.p38244400} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="SidebarContent">
        <div className="content-stretch flex flex-col items-start py-[8px] relative size-full">
          <div className="relative shrink-0 w-full" data-name="Sidebar / SidebarGroup">
            <div className="content-stretch flex flex-col gap-[16px] items-start p-[8px] relative size-full">
              <div className={`content-stretch cursor-pointer flex flex-col items-start relative shrink-0 ${isColapded ? "w-[32px]" : "gap-[8px] w-full"}`} data-name="SidebarMenu">
                <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                  <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                        {isNotColapded && (
                          <>
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
                          </>
                        )}
                        {isColapded && (
                          <>
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / SquareTerminal">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-[-5.56%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p209b8680} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Menu Item</p>
                            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Sidebar / CollapseIcon">
                              <div className="absolute left-0 overflow-clip size-[16px] top-0" data-name="Icon / ChevronRight">
                                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                                  <div className="absolute inset-[-8.33%_-16.67%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                                      <path d="M1 13L7 7L1 1" id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                  <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                        {isNotColapded && <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Persona</p>}
                        {isColapded && (
                          <>
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / SquareTerminal">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-[-5.56%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p209b8680} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Menu Item</p>
                            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Sidebar / CollapseIcon">
                              <div className="absolute left-0 overflow-clip size-[16px] top-0" data-name="Icon / ChevronRight">
                                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                                  <div className="absolute inset-[-8.33%_-16.67%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                                      <path d="M1 13L7 7L1 1" id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                  <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                        {isNotColapded && <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Restrições</p>}
                        {isColapded && (
                          <>
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / SquareTerminal">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-[-5.56%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p209b8680} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Menu Item</p>
                            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Sidebar / CollapseIcon">
                              <div className="absolute left-0 overflow-clip size-[16px] top-0" data-name="Icon / ChevronRight">
                                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                                  <div className="absolute inset-[-8.33%_-16.67%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                                      <path d="M1 13L7 7L1 1" id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                  <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                        {isNotColapded && <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Cenário de Negócio</p>}
                        {isColapded && (
                          <>
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / SquareTerminal">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-[-5.56%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p209b8680} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Menu Item</p>
                            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Sidebar / CollapseIcon">
                              <div className="absolute left-0 overflow-clip size-[16px] top-0" data-name="Icon / ChevronRight">
                                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                                  <div className="absolute inset-[-8.33%_-16.67%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                                      <path d="M1 13L7 7L1 1" id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                {isColapded && (
                  <>
                    <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                      <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / SquareTerminal">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-[-5.56%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p209b8680} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Menu Item</p>
                            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Sidebar / CollapseIcon">
                              <div className="absolute left-0 overflow-clip size-[16px] top-0" data-name="Icon / ChevronRight">
                                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                                  <div className="absolute inset-[-8.33%_-16.67%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                                      <path d="M1 13L7 7L1 1" id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                    <button className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Sidebar / SidebarMenuItem">
                      <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Sidebar / SidebarMenuButton">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / SquareTerminal">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-[-5.56%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p209b8680} id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-w-px not-italic overflow-hidden relative text-[#f9fafb] text-[14px] text-ellipsis text-left whitespace-nowrap">Menu Item</p>
                            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Sidebar / CollapseIcon">
                              <div className="absolute left-0 overflow-clip size-[16px] top-0" data-name="Icon / ChevronRight">
                                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                                  <div className="absolute inset-[-8.33%_-16.67%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                                      <path d="M1 13L7 7L1 1" id="Vector" stroke="var(--stroke-0, #030712)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomizacaoIaPersona({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex items-center relative"} data-name="[Customização IA] Persona">
      <div className="flex flex-row items-center self-stretch">
        <SidebarSidebarAssistent className="bg-[#111827] content-stretch flex flex-col h-full items-start relative shrink-0 w-[256px]" />
      </div>
      <div className="content-stretch flex flex-col h-[1080px] items-start relative shrink-0 w-[1664px]" data-name="Main">
        <HeaderHeaderAssitent className="bg-[#030712] h-[64px] relative shrink-0 w-full" />
        <div className="bg-[#030712] relative shrink-0 w-[1664px]" data-name="Pro Blocks / Page Header / 9.">
          <div className="content-stretch flex flex-col items-center overflow-clip px-[32px] py-[16px] relative rounded-[inherit] size-full">
            <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Div">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#f9fafb] text-[20px] w-full">Persona</p>
              </div>
              <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-[396px]" data-name="Flex" />
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-[#030712] flex-[1_0_0] min-h-px relative w-full" data-name="Div">
          <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-start justify-center p-[32px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[28px] h-full items-end max-w-[640px] min-w-px relative" data-name="FieldSet">
                <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full" data-name="Field Group">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Div">
                    <div className="content-stretch flex items-start pb-[12px] relative shrink-0 w-full" data-name="Field / Legend">
                      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#f9fafb] text-[16px]">Dados do assistente</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Insira uma novo avatar</p>
                    </div>
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
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Nome do Assistente</p>
                    </div>
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
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Descrição da persona</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Type=Textarea, State=Default">
                      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="h-[64px] min-h-[64px] relative shrink-0 w-full" data-name="Textarea">
                        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
                          <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[12px] relative size-full">
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">Descreva a personalidade e o propósito do assistente.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[min-content]">Descreva a persona do assistente virtual, incluindo personalidade, tom de voz, estilo de comunicação e propósito. Isso garantirá uma experiência natural e alinhada às expectativas dos usuários.</p>
                  </div>
                  <div className="bg-[#111827] relative rounded-[14px] shrink-0 w-full" data-name="Card">
                    <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip py-[24px] relative rounded-[inherit] size-full">
                      <div className="relative shrink-0 w-full" data-name="Card Header">
                        <div className="content-stretch flex items-start px-[24px] relative size-full">
                          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px not-italic relative" data-name="Text">
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none relative shrink-0 text-[#f9fafb] text-[16px] w-full">Controle de Criatividade</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] w-full">Defina o nível de criatividade que o assistente deve adotar.</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full" data-name="Card Content">
                        <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
                          <div className="content-stretch flex gap-[8px] h-[68px] items-center relative shrink-0 w-full" data-name="Slider-02">
                            <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[9px]" data-name="ItemContent">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-full">0</p>
                            </div>
                            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px py-[5px] relative rounded-[9999px]" data-name="Slider">
                              <div className="bg-[#1f2937] content-stretch flex flex-col items-start relative rounded-[9999px] shrink-0 w-full" data-name="Track">
                                <div className="h-[6px] relative shrink-0 w-full" data-name="Range">
                                  <div className="content-stretch flex flex-col items-start pr-[150px] relative size-full">
                                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="SliderTrack">
                                      <div className="bg-[#2563eb] h-[6px] relative rounded-[9999px] shrink-0 w-full" data-name="Track" />
                                      <div className="-translate-y-1/2 absolute bg-[#030712] right-[-8px] rounded-[9999px] size-[16px] top-1/2" data-name="Slider / Item">
                                        <div aria-hidden="true" className="absolute border border-[#2563eb] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[7px]" data-name="ItemContent">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] w-[32px]">1</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Apresentação Resumida</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Type=Textarea, State=Default">
                      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="h-[64px] min-h-[64px] relative shrink-0 w-full" data-name="Textarea">
                        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
                          <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[12px] relative size-full">
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-w-px not-italic overflow-hidden relative text-[#9ca3af] text-[14px] text-ellipsis whitespace-nowrap">Digite um resumo breve da apresentação do assistente.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Field">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Flex">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafb] text-[14px] whitespace-nowrap">Link de Apresentação em Vídeo</p>
                    </div>
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
      </div>
    </div>
  );
}