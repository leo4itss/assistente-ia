import { useState, useRef, useEffect } from "react";
import svgPaths from "@/imports/svg-vtaynlf815";
import svgPathsPlaceholder from "@/imports/svg-hujl1n6kp5";
import svgPathsChatCore from "@/imports/svg-7x1t3yrsvw";
import imgAvatar from "figma:asset/c866b4a357fc53387b13b52af16a58d195f9b81f.png";
import imgAvatar1 from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
import ProfileMenu from "@/app/components/ProfileMenu";
import Sidebar from "@/app/components/Sidebar";
import AssistantSelector from "@/app/components/AssistantSelector";
import AppsPopover from "@/app/components/AppsPopover";
import CustomizationScreen from "@/app/components/CustomizationScreen";
import CreateAssistantScreen from "@/app/components/CreateAssistantScreen";
import ResourcesToolsScreen from "@/app/components/ResourcesToolsScreen";
import { DEFAULT_ASSISTANTS } from "@/app/constants/defaultAssistants";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export interface Assistant {
  id: string;
  name: string;
  personaDescription: string;
  creativity: number;
  briefPresentation: string;
  videoLink: string;
  resources?: string;
  tools?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [appsPopoverOpen, setAppsPopoverOpen] = useState(false);
  const [showCustomization, setShowCustomization] =
    useState(false);
  const [showResourcesTools, setShowResourcesTools] =
    useState(false);
  const [showCreateAssistant, setShowCreateAssistant] =
    useState(false);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [selectedAssistant, setSelectedAssistant] =
    useState<Assistant | null>(null);
  const appsButtonRef = useRef<HTMLButtonElement>(null);
  const appsPopoverRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Deep link dev: ?screen=resources-tools abre Resources e Tools direto (captura Figma)
  useEffect(() => {
    const screen = new URLSearchParams(window.location.search).get("screen");
    if (screen === "resources-tools") {
      setShowResourcesTools(true);
      setShowCustomization(false);
    }
  }, []);

  // Carregar assistentes e assistente selecionado do localStorage
  useEffect(() => {
    const loadAssistants = () => {
      const stored = localStorage.getItem("assistants");
      let allAssistants: Assistant[];

      if (stored) {
        allAssistants = JSON.parse(stored);
      } else {
        // Se não houver assistentes salvos, inicializar com os assistentes padrão
        allAssistants = DEFAULT_ASSISTANTS;
        localStorage.setItem(
          "assistants",
          JSON.stringify(allAssistants),
        );
        // Selecionar o primeiro assistente por padrão
        localStorage.setItem(
          "selectedAssistantId",
          allAssistants[0].id,
        );
      }

      setAssistants(allAssistants);

      // Carregar assistente selecionado
      const selectedId = localStorage.getItem(
        "selectedAssistantId",
      );
      if (selectedId) {
        const selected = allAssistants.find(
          (a: Assistant) => a.id === selectedId,
        );
        if (selected) {
          setSelectedAssistant(selected);
        }
      }
    };
    loadAssistants();

    // Listener para atualizar quando assistentes são salvos
    const handleStorageChange = () => {
      loadAssistants();
    };
    window.addEventListener("storage", handleStorageChange);

    // Custom event para mudanças na mesma aba
    window.addEventListener(
      "assistants-updated",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
      window.removeEventListener(
        "assistants-updated",
        handleStorageChange,
      );
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        appsPopoverOpen &&
        appsPopoverRef.current &&
        !appsPopoverRef.current.contains(
          event.target as Node,
        ) &&
        appsButtonRef.current &&
        !appsButtonRef.current.contains(event.target as Node)
      ) {
        setAppsPopoverOpen(false);
      }
    };

    if (appsPopoverOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
      );
    }
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [appsPopoverOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(
          event.target as Node,
        ) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    if (profileMenuOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
      );
    }
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [profileMenuOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular resposta do assistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Olá! Sou o assistente de IA. Como posso ajudá-lo hoje?",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (showCreateAssistant) {
    return (
      <CreateAssistantScreen
        onBack={() => {
          setShowCreateAssistant(false);
          // Recarregar assistentes
          const stored = localStorage.getItem("assistants");
          if (stored) {
            setAssistants(JSON.parse(stored));
          }
        }}
      />
    );
  }

  if (showResourcesTools) {
    return (
      <ResourcesToolsScreen
        assistant={selectedAssistant}
        onBack={() => {
          setShowResourcesTools(false);
          setShowCustomization(true);
          const stored = localStorage.getItem("assistants");
          if (stored) {
            setAssistants(JSON.parse(stored));
            const selectedId = localStorage.getItem("selectedAssistantId");
            if (selectedId) {
              const all = JSON.parse(stored);
              const sel = all.find((a: Assistant) => a.id === selectedId);
              if (sel) setSelectedAssistant(sel);
            }
          }
        }}
      />
    );
  }

  if (showCustomization) {
    return (
      <CustomizationScreen
        assistant={selectedAssistant}
        onBack={() => {
          setShowCustomization(false);
          const stored = localStorage.getItem("assistants");
          if (stored) {
            setAssistants(JSON.parse(stored));
            const selectedId = localStorage.getItem(
              "selectedAssistantId",
            );
            if (selectedId) {
              const allAssistants = JSON.parse(stored);
              const selected = allAssistants.find(
                (a: Assistant) => a.id === selectedId,
              );
              if (selected) {
                setSelectedAssistant(selected);
              }
            }
          }
        }}
        onResourcesToolsClick={() => {
          setShowCustomization(false);
          setShowResourcesTools(true);
        }}
      />
    );
  }

  return (
    <div className="content-stretch flex items-start relative size-full bg-[#030712]">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        assistants={assistants}
        onSelectAssistant={(assistant) => {
          setSelectedAssistant(assistant);
          localStorage.setItem(
            "selectedAssistantId",
            assistant.id,
          );
        }}
      />

      {/* Main Content */}
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-h-px min-w-px relative">
        {/* Header */}
        <div className="bg-[#030712] content-stretch flex h-[64px] items-center justify-between px-[32px] py-[16px] relative shrink-0 w-full">
          <div
            aria-hidden="true"
            className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none"
          />

          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <div className="relative shrink-0 size-[16px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d={svgPaths.paee2100}
                      stroke="#F9FAFB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33"
                    />
                  </svg>
                </div>
              </button>
            )}

            {/* Combobox */}
            <AssistantSelector
              onCreateClick={() => setShowCreateAssistant(true)}
              assistants={assistants}
              selectedAssistant={selectedAssistant}
              onSelectAssistant={(assistant) => {
                setSelectedAssistant(assistant);
                localStorage.setItem(
                  "selectedAssistantId",
                  assistant.id,
                );
              }}
            />
          </div>

          {/* Right Side Buttons */}
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
            <div className="relative">
              <button
                ref={appsButtonRef}
                onClick={() =>
                  setAppsPopoverOpen(!appsPopoverOpen)
                }
                className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <div
                  aria-hidden="true"
                  className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                />
                <div className="relative shrink-0 size-[16px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d={svgPaths.p1cfa1bc0}
                      stroke="#F9FAFB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33"
                    />
                    <path
                      d={svgPaths.p2cfdb900}
                      stroke="#F9FAFB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33"
                    />
                    <path
                      d={svgPaths.p17f25d40}
                      stroke="#F9FAFB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33"
                    />
                    <path
                      d={svgPaths.p15fb5e00}
                      stroke="#F9FAFB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33"
                    />
                  </svg>
                </div>
              </button>
              {appsPopoverOpen && (
                <div
                  ref={appsPopoverRef}
                  className="absolute top-[calc(100%+8px)] right-0 z-50"
                >
                  <AppsPopover
                    assistantName={selectedAssistant?.name}
                    onCustomizationClick={() => {
                      setShowCustomization(true);
                      setAppsPopoverOpen(false);
                    }}
                  />
                </div>
              )}
            </div>

            <button className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[8px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <div
                aria-hidden="true"
                className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              />
              <div className="relative shrink-0 size-[16px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d={svgPaths.p36e45a00}
                    stroke="#F9FAFB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                  />
                  <path
                    d={svgPaths.p150f5b00}
                    stroke="#F9FAFB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                  />
                  <path
                    d={svgPaths.p2d6e5280}
                    stroke="#F9FAFB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                  />
                </svg>
              </div>
            </button>

            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={() =>
                  setProfileMenuOpen(!profileMenuOpen)
                }
                className="relative rounded-[9999px] shrink-0 size-[36px] block focus:outline-none"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-[9999px]"
                >
                  <div className="absolute bg-[#1f2937] inset-0 rounded-[9999px]" />
                  <img
                    alt=""
                    className="absolute max-w-none object-cover rounded-[9999px] size-full"
                    src={imgAvatar1}
                  />
                </div>
              </button>
              {profileMenuOpen && (
                <div
                  ref={profileMenuRef}
                  className="absolute top-[calc(100%+8px)] right-0 z-50"
                >
                  <ProfileMenu
                    onCustomizationClick={() => {
                      setShowCustomization(true);
                      setProfileMenuOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-[#030712] flex flex-1 flex-col items-center min-h-0 relative w-full overflow-y-auto">
          <div className="flex-1 w-full max-w-[800px] px-4 md:px-8 py-8">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-[#6b7280] text-[24px]">
                  Inicie uma conversa com o assistente
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="group w-full"
                  >
                    {message.sender === "user" ? (
                      <div className="flex gap-2 items-start justify-end w-full">
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                          <button className="flex items-center justify-center size-9 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="size-4 text-gray-400">
                              <svg
                                className="block size-full"
                                fill="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d={svgPathsChatCore.p5752d00}
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.33"
                                />
                              </svg>
                            </div>
                          </button>
                          <button className="flex items-center justify-center size-9 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="size-4 text-gray-400">
                              <svg
                                className="block size-full"
                                fill="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d={svgPathsChatCore.p24ecce00}
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.33"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                        <div className="bg-[#2563eb] rounded-[10px] p-3 max-w-[85%] md:max-w-[480px] w-fit">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-5 text-white text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 items-start w-full">
                        <div className="relative rounded-full shrink-0 size-8 bg-gray-800">
                          <img
                            alt=""
                            className="absolute inset-0 rounded-full object-cover size-full"
                            src={imgAvatar}
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-4 min-w-0">
                          <div className="font-['Inter:Medium',sans-serif] font-medium leading-5 text-gray-50 text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </div>
                          <div className="flex gap-2 items-center">
                            <button className="flex items-center justify-center size-9 rounded-lg hover:bg-white/5 transition-colors">
                              <div className="size-4 text-gray-400">
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d={
                                      svgPathsChatCore.p5752d00
                                    }
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.33"
                                  />
                                </svg>
                              </div>
                            </button>
                            {/* Placeholder for Tasks button matching design */}
                            <button className="flex gap-2 items-center h-9 px-4 rounded-lg hover:bg-white/5 transition-colors text-gray-400">
                              <div className="size-4">
                                {/* Using copy icon as placeholder since we don't have notebook icon, or just text */}
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d={
                                      svgPathsChatCore.p5752d00
                                    }
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.33"
                                  />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-50">
                                Tarefas
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 items-start">
                    <div className="relative rounded-full shrink-0 size-8 bg-gray-800">
                      <img
                        alt=""
                        className="absolute inset-0 rounded-full object-cover size-full"
                        src={imgAvatar}
                      />
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex gap-1">
                        <div
                          className="size-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="size-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="size-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat Bar */}
          <div className="bg-[#030712] relative shrink-0 w-full">
            <div className="flex flex-col items-center size-full">
              <div className="fixed bottom-0 z-10 w-full flex justify-center pointer-events-none">
                <div className="content-stretch flex flex-col items-center px-4 md:px-[20px] pt-0 pb-4 md:pb-[16px] gap-[4px] w-full max-w-[800px] bg-[#030712] pointer-events-auto">
                  <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[9999px] shrink-0 w-full">
                    <div
                      aria-hidden="true"
                      className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                    />
                    <div className="flex flex-row items-center w-full h-full">
                      <div className="flex gap-[8px] items-center w-full p-[8px] relative">
                        <div className="flex gap-[8px] items-center relative w-full min-w-0">
                          <button className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                            <div className="relative shrink-0 size-[16px]">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d={svgPaths.p36bdefc0}
                                  stroke="#F9FAFB"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.33"
                                />
                              </svg>
                            </div>
                          </button>

                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) =>
                              setInputValue(e.target.value)
                            }
                            onKeyPress={handleKeyPress}
                            placeholder="Escreva sua mensagem..."
                            className="css-g0mm18 flex-1 font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-0 not-italic overflow-hidden relative text-[#f9fafb] text-[14px] bg-transparent border-none outline-none placeholder:text-[#9ca3af]"
                          />

                          <button className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                            <div className="relative shrink-0 size-[16px]">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d={svgPaths.p37eb9700}
                                  stroke="#F9FAFB"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.33"
                                />
                              </svg>
                            </div>
                          </button>

                          <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className={`content-stretch flex items-center justify-center max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] px-[16px] py-[8px] relative rounded-[9999px] shrink-0 size-[36px] transition-all duration-200 ${
                              inputValue.trim()
                                ? "bg-transparent hover:bg-[rgba(255,255,255,0.1)] text-[#f9fafb]"
                                : "bg-transparent text-[#f9fafb] opacity-50"
                            }`}
                          >
                            <div className="relative shrink-0 size-[16px]">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d={
                                    svgPathsPlaceholder.pbeac600
                                  }
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.33"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#b5b5b5] text-[10px] text-center w-full">
                    As conversas neste assistente não são usadas
                    para treinar modelos. O assistente pode
                    cometer erros.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}