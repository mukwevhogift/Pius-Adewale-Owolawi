import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Search, 
  DollarSign, 
  ChevronRight,
  ArrowRight,
  Bot
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  type?: "general" | "search" | "funding" | "student";
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "search" | "funding" | "student">("general");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    general: [
      { id: "1", role: "model", text: "Hello! I am Prof. Pius Owolawi's digital twin artificial intelligence proxy. How can I assist you today? Feel free to ask about my recent 5G research, consult with my strategy group, or inquire about academic partnerships." }
    ],
    search: [
      { id: "1", role: "model", text: "Welcome to the Research Search Assistant. Type any keyword (e.g. \"YOLO\", \"drone\", \"rain attenuation\") and I will fetch, summarize, and outline my top publication matches." }
    ],
    funding: [
      { id: "1", role: "model", text: "Welcome to the Strategic Funding Recommender. Paste your proposed research theme or grant criteria below, and I will recommend specific NSF, NIH or regional SETA funding instruments, aligned with my historical projects." }
    ],
    student: [
      { id: "1", role: "model", text: "Hello future scholar! I am the postgraduate mentorship advisor. Share your research thoughts or abstract idea, and I will rate its alignment with my 9 research areas and list your application guidelines." }
    ]
  });
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, activeTab]);

  const handleSendMessage = async (customText?: string) => {
    const textToSubmit = customText || userInput;
    if (!textToSubmit.trim() || loading) return;

    // Append user message
    const userMsgId = Date.now().toString();
    const newUserMsg: Message = { id: userMsgId, role: "user", text: textToSubmit, type: activeTab };
    
    setMessages(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newUserMsg]
    }));
    
    if (!customText) setUserInput("");
    setLoading(true);

    try {
      let endpoint = "/api/chat";
      let payload: any = { message: textToSubmit, history: [] };

      if (activeTab === "general") {
        // Feed conversational history
        const convoHistory = messages.general.slice(1).map(m => ({
          role: m.role,
          text: m.text
        }));
        payload = { message: textToSubmit, history: convoHistory };
      } else if (activeTab === "search") {
        endpoint = "/api/search";
        payload = { query: textToSubmit };
      } else if (activeTab === "funding") {
        endpoint = "/api/recommend-funding";
        payload = { topicOfInterest: textToSubmit };
      } else if (activeTab === "student") {
        endpoint = "/api/student-advisor";
        payload = { rawProposal: textToSubmit, studentTier: "Postgraduate" };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to consult the AI twin.");
      }

      const data = await response.json();
      
      const replyMsgId = (Date.now() + 1).toString();
      const replyMsg: Message = { id: replyMsgId, role: "model", text: data.text || "I was unable to retrieve a response from the research model." };
      
      setMessages(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], replyMsg]
      }));
    } catch (err: any) {
      console.error(err);
      const errorMsgId = (Date.now() + 1).toString();
      setMessages(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], { 
          id: errorMsgId, 
          role: "model", 
          text: `⚠️ System notice: ${err.message || "An unexpected network error occurred."}` 
        }]
      }));
    } finally {
      setLoading(false);
    }
  };

  const currentMessages = messages[activeTab];

  const presets = {
    general: [
      "Secured funding model overview?",
      "How to partner with your research lab?",
      "Inquire for an executive AI speaking slot"
    ],
    search: [
      "Find papers on YOLO weed detection",
      "List major publications on rain attenuation",
      "Show Setswana LLM research"
    ],
    funding: [
      "AI crop monitoring UAV funding options",
      "Fog-cloud architecture grants",
      "Low-resource language funding tracks"
    ],
    student: [
      "PhD proposal on EEG mind-control robotics",
      "Master idea on 5G millimeter channel propagation",
      "Research idea on solar smart grid monitoring"
    ]
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="ai-assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-[#0A1628] shadow-2xl transition-transform hover:scale-105 active:scale-95 group focus:outline-none"
        title="Consult AI Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 stroke-[2.5]" />
        ) : (
          <div className="relative">
            <Bot className="h-6 w-6 stroke-[2]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Main Chat Overlay */}
      {isOpen && (
        <div
          id="ai-assistant-panel"
          className="fixed bottom-24 right-6 z-50 flex h-[620px] w-[420px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-[#2E3A4A] bg-[#0A1628] text-white shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-200"
        >
          {/* Header */}
          <div className="flex flex-col border-b border-[#2E3A4A] bg-[#0E1E34] px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C]/10 text-[#C9A84C]">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                    Prof. Owolawi <span className="text-xs text-[#C9A84C] border border-[#C9A84C]/40 px-1.5 py-0.2 rounded bg-[#C9A84C]/10 uppercase font-mono tracking-wider scale-90">AI Twin</span>
                  </h3>
                  <p className="text-[11px] text-[#7A8898]">Expert Advisory & Research System</p>
                </div>
              </div>
              <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
            </div>

            {/* Custom Mode Tabs */}
            <div className="mt-3.5 flex gap-1 rounded-lg bg-[#07111D] p-1 text-xs">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex-1 rounded py-1.5 text-center transition-colors font-medium flex items-center justify-center gap-1.5 ${activeTab === "general" ? "bg-[#C9A84C] text-[#0A1628]" : "text-[#7A8898] hover:text-white"}`}
              >
                <MessageSquare className="h-3 w-3" />
                Twin
              </button>
              <button
                onClick={() => setActiveTab("search")}
                className={`flex-1 rounded py-1.5 text-center transition-colors font-medium flex items-center justify-center gap-1.5 ${activeTab === "search" ? "bg-[#C9A84C] text-[#0A1628]" : "text-[#7A8898] hover:text-white"}`}
              >
                <Search className="h-3 w-3" />
                Papers
              </button>
              <button
                onClick={() => setActiveTab("funding")}
                className={`flex-1 rounded py-1.5 text-center transition-colors font-medium flex items-center justify-center gap-1.5 ${activeTab === "funding" ? "bg-[#C9A84C] text-[#0A1628]" : "text-[#7A8898] hover:text-white"}`}
              >
                <DollarSign className="h-3 w-3" />
                Grants
              </button>
              <button
                onClick={() => setActiveTab("student")}
                className={`flex-1 rounded py-1.5 text-center transition-colors font-medium flex items-center justify-center gap-1.5 ${activeTab === "student" ? "bg-[#C9A84C] text-[#0A1628]" : "text-[#7A8898] hover:text-white"}`}
              >
                <GraduationCap className="h-3 w-3" />
                Adviser
              </button>
            </div>
          </div>

          {/* Conversation Stream */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-[#07111D] p-4 font-sans text-xs space-y-4"
          >
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#C9A84C] text-[#0A1628] rounded-tr-none font-medium"
                      : "bg-[#0E1E34] text-gray-200 border border-[#2E3A4A] rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-xl bg-[#0E1E34] border border-[#2E3A4A] px-3.5 py-2.5 text-xs text-[#7A8898] rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#C9A84C]" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#C9A84C]" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#C9A84C]" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Helper Preset Prompts */}
          <div className="bg-[#07111D] px-4 pb-2 pt-1 border-t border-[#2E3A4A]/50">
            <span className="text-[10px] text-[#7A8898] font-mono block mb-1">RECOMMENDED QUERIES</span>
            <div className="flex flex-wrap gap-1">
              {presets[activeTab].map((p, idx) => (
                <button
                  key={idx}
                  disabled={loading}
                  onClick={() => handleSendMessage(p)}
                  className="flex items-center gap-1 rounded bg-[#0E1E34] border border-[#2E3A4A]/60 px-2 py-1 text-[10px] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A1628] transition-colors text-left disabled:opacity-50"
                >
                  {p}
                  <ChevronRight className="h-3 w-3 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Core Input Form */}
          <div className="border-t border-[#2E3A4A] bg-[#0E1E34] p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-[#2E3A4A] bg-[#07111D] p-1.5"
            >
              <input
                type="text"
                disabled={loading}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Submit inquiry/idea to digital Twin..."
                className="flex-1 bg-transparent px-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-0 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || loading}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C] text-[#0A1628] hover:bg-[#C9A84C]/95 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
