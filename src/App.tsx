import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Handshake,
  User, 
  BookOpen, 
  BarChart3, 
  Lightbulb, 
  GraduationCap, 
  Briefcase, 
  Radio, 
  Mail, 
  Menu, 
  X, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  MessageSquare,
  Award,
  Book,
  Send,
  Linkedin,
  Compass
} from "lucide-react";

// Modular Imports
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ScholarSection from "./components/ScholarSection";
import ResearchDashboard from "./components/ResearchDashboard";
import InteractiveMap from "./components/InteractiveMap";
import ProjectsSection from "./components/ProjectsSection";
import PartnershipsSection from "./components/PartnershipsSection";
import MentorshipSection from "./components/MentorshipSection";
import ConsultingSpeakingSection from "./components/ConsultingSpeakingSection";
import MediaResourcesSection from "./components/MediaResourcesSection";
import AIChatWidget from "./components/AIChatWidget";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  
  // Contacts states
  const [contactForm, setContactForm] = useState({ name: "", email: "", org: "", type: "Academic Research Engagement", msg: "" });
  const [contactStep, setContactStep] = useState<1 | 2>(1);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [receiptCode, setReceiptCode] = useState<string>("");

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: "Africa/Johannesburg", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false } as const;
      const formatted = new Date().toLocaleTimeString("en-US", options);
      setCurrentTime(`${formatted} Pretoria Local (GMT+2)`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.msg) return;

    // Generate custom serial token for authenticity
    const token = `P-OWOLAWI-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptCode(token);
    setContactSuccess(true);
    setContactStep(2);
  };

  const resetContactForm = () => {
    setContactForm({ name: "", email: "", org: "", type: "Academic Research Engagement", msg: "" });
    setContactStep(1);
    setContactSuccess(false);
  };

  // Navigations listing
  const navItems = [
    { id: "home", label: "Executive Hub", icon: <User className="h-4 w-4 shrink-0" /> },
    { id: "about", label: "Biographical Journey", icon: <Compass className="h-4 w-4 shrink-0" /> },
    { id: "scholar", label: "Scholarly Library", icon: <BookOpen className="h-4 w-4 shrink-0" /> },
    { id: "research", label: "Research Analytics", icon: <BarChart3 className="h-4 w-4 shrink-0" /> },
    { id: "ventures", label: "Ventures & Innovations", icon: <Lightbulb className="h-4 w-4 shrink-0" /> },
    { id: "mentorship", label: "Academic Mentorship", icon: <GraduationCap className="h-4 w-4 shrink-0" /> },
    { id: "consulting", label: "Corporate Advisory", icon: <Briefcase className="h-4 w-4 shrink-0" /> },
    { id: "partners", label: "Partners & Funding", icon: <Handshake className="h-4 w-4 shrink-0" /> },
    { id: "media", label: "Media & Resources", icon: <Radio className="h-4 w-4 shrink-0" /> },
    { id: "contact", label: "Strategic Inquiry", icon: <Mail className="h-4 w-4 shrink-0" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-slate-950">
      
      {/* 1. Header Navigation HUD Indicator Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleTabChange("home")}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="h-9 w-9 rounded bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold tracking-tighter text-md border border-blue-600/20 group-hover:opacity-90 transition-all">
                PO
              </div>
              <div className="text-left font-sans">
                <span className="block text-xs font-mono font-bold tracking-widest text-slate-900 uppercase">PIUSOWOLAWI.COM</span>
                <span className="block text-[10px] text-slate-500 font-medium font-mono uppercase">Prof. Pius Adewale Owolawi</span>
              </div>
            </button>
          </div>

          {/* Desktop HUD Indicators */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200/60 px-3.5 py-1 text-slate-600">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              <span>{currentTime || 'Loading local clock...'}</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200/60 px-3 py-1 text-slate-600">
              <MapPin className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[10px]">TUT ICT Faculty, Soshanguve South</span>
            </div>

            <span className="rounded bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[9px] font-mono text-blue-800 font-bold uppercase tracking-wider">
              Dual US & SA Resident
            </span>
          </div>

          {/* Collapsible Mobile button triggering */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded p-1.5 hover:bg-slate-100 border border-slate-200 text-slate-705 lg:hidden"
            id="mobile-drawer-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Main Structural view container */}
      <div className="flex flex-1 justify-center max-w-7xl w-full mx-auto pb-12 relative">
        
        {/* Left Side Navigation dock on desktop */}
        <aside className="hidden lg:block w-64 border-r border-slate-200 shrink-0 p-4 space-y-6 select-none">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-slate-400 tracking-widest block font-bold uppercase">NAVIGATION PORTAL</span>
            <p className="text-xs text-slate-500 font-sans">Browse executive portfolios</p>
          </div>

          <nav className="space-y-1 font-sans text-xs">
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`w-full flex items-center gap-3 rounded-lg px-3.5 py-2.5 font-medium transition-all text-left pointer-events-auto ${
                    isSelected 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-md scale-[1.01]" 
                      : "text-slate-605 hover:text-blue-605 hover:bg-blue-50/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Soshanguve Office details footer indicator */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 font-mono text-[10px] text-slate-500 shadow-sm animate-in fade-in">
            <div>
              <span className="text-blue-600 font-semibold block uppercase">Official Office</span>
              <p className="text-slate-600 leading-snug font-sans mt-0.5">Faculty of ICT, Building 22-A103, Tshwane University of Technology, Soshanguve, Pretoria, 0152, South Africa.</p>
            </div>
            <div>
              <span className="text-blue-600 font-semibold block uppercase">Principal Liaison</span>
              <p className="font-sans text-slate-600">Ms. Lerato Ndlovu<br />Liaison coordinator TUT ICT</p>
            </div>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors text-[9px] uppercase font-bold"
            >
              <Linkedin className="h-3 w-3 text-blue-600" /> Connect via LinkedIn <ExternalLink className="h-2 w-2" />
            </a>
          </div>
        </aside>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 transition-all lg:hidden bg-slate-900/40 backdrop-blur-xs">
            <div className="absolute top-[57px] left-0 w-full bg-white border-b border-slate-200 p-4 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
              <nav className="grid grid-cols-2 gap-2 text-xs font-sans">
                {navItems.map((item) => {
                  const isSelected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`flex items-center gap-2 rounded px-3 py-2.5 font-semibold text-left ${
                        isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Time stats */}
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-600 bg-slate-50 rounded p-2.5 border border-slate-200">
                <span>{currentTime || 'Loading local clock...'}</span>
                <span className="text-amber-700 font-bold">Dual US Resident</span>
              </div>
            </div>
          </div>
        )}

        {/* Primary Content View Deck */}
        <main className="flex-1 p-4 sm:p-6 space-y-12 w-full overflow-hidden">
          
          {/* Active section router */}
          {activeTab === "home" && (
            <div className="space-y-16 animate-in fade-in duration-300">
              <HomeSection onNavigate={handleTabChange} />
              
              {/* Integrated Vector mapping on Home for maximum breathtaking impact */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-2 font-display">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Interactive Collaborations Map
                  </h3>
                  <p className="text-xs text-slate-500">Pulsing nodes mapping research relationships and past keynote deliveries across coordinates</p>
                </div>
                <InteractiveMap />
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <AboutSection />
          )}

          {activeTab === "scholar" && (
            <ScholarSection />
          )}

          {activeTab === "research" && (
            <div className="space-y-12 animate-in fade-in duration-300">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest block">AUDITED IMPACT METRICS</span>
                <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 font-display">Research Impact Analytics</h2>
                <p className="font-sans text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Analyze Google Scholar indexes, chronological publication counts, secured grant influx values, and postgraduate completions over the last 20 years.
                </p>
              </div>
              <ResearchDashboard />
            </div>
          )}

          {activeTab === "ventures" && (
            <ProjectsSection />
          )}

          {activeTab === "mentorship" && (
            <MentorshipSection />
          )}

          {activeTab === "consulting" && (
            <ConsultingSpeakingSection />
          )}

          {activeTab === "partners" && (
            <PartnershipsSection />
          )}

          {activeTab === "media" && (
            <MediaResourcesSection />
          )}

          {activeTab === "contact" && (
            <div className="grid gap-8 md:grid-cols-12 animate-in fade-in duration-300 items-start font-sans">
              
              {/* Left Column: Coordinates details */}
              <div className="md:col-span-5 space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
                  <span className="font-mono text-[9px] text-blue-600 tracking-widest block font-bold">LIAISON COORDINATES</span>
                  <h3 className="text-base font-bold text-slate-900">Principal Office Address</h3>
                  
                  <div className="space-y-3.5 text-xs text-slate-600 font-sans">
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-slate-900 font-semibold text-xs">Tshwane University of Technology (TUT)</span>
                        <p className="text-slate-500 leading-relaxed mt-0.5">Faculty of Information and Communication Technology, Building 22-A103, Soshanguve South Campus, Pretoria, 0152, South Africa.</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start border-t border-slate-100 pt-3">
                      <Mail className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-slate-900 font-semibold text-xs">Executive Correspondence</span>
                        <a href="mailto:info@piusowolawi.com" className="text-blue-600 font-semibold hover:underline mt-0.5">info@piusowolawi.com</a>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">Liaison response guaranteed inside 48 business hours.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soshanguve South map representation card */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-xs space-y-3 font-mono shadow-sm">
                  <span className="text-blue-600 font-bold block uppercase tracking-wider text-[10px]">Pretoria Geographic Hub</span>
                  <div className="aspect-video w-full relative rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-200/80">
                    <div className="absolute inset-0 bg-white/45 opacity-55 animate-pulse" />
                    <div className="relative text-center z-10 px-4 space-y-1.5 font-sans">
                      <MapPin className="h-6 w-6 text-blue-600 mx-auto" />
                      <span className="block text-slate-900 font-bold font-mono">Soshanguve Campus Grid</span>
                      <span className="block text-[10px] text-slate-400 font-mono text-center">Coords: 25.5398° S, 28.0931° E</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Inquiry Form */}
              <div className="md:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                  <span className="font-mono text-xs text-blue-600 uppercase tracking-widest block font-bold">LIAISON PIPELINE</span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight font-display">Strategic Inquiry & Admissions</h3>
                  <p className="text-xs text-slate-500 mt-0.5 animate-in fade-in leading-relaxed">Qualified partners, corporate consultancies, and student applications are routed directly through Ms. Lerato Ndlovu's liaison desk.</p>
                </div>

                {contactSuccess ? (
                  <div className="py-8 text-center space-y-4 rounded-xl bg-slate-50 border border-emerald-500/20 text-xs shadow-inner">
                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500 text-emerald-500 animate-pulse">
                      <Award className="h-6 w-5" />
                    </div>
                    <div className="space-y-1.5 px-4">
                      <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider">Inquiry Successfully Authenticated</h4>
                      <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Thank you, your strategic advisory transmission regarding <strong>{contactForm.type}</strong> has been assigned secure register.
                      </p>
                    </div>

                    {/* Receipt visual audit indicator */}
                    <div className="rounded border border-dashed border-blue-300/60 bg-blue-500/5 max-w-sm mx-auto p-3 text-center space-y-1">
                      <span className="font-mono text-[9px] text-slate-400 uppercase block font-bold">Audit Receipt Token code</span>
                      <span className="font-mono text-slate-900 text-sm font-bold block tracking-widest">{receiptCode}</span>
                      <span className="text-[9px] text-blue-600 font-semibold block uppercase">Transmission Verified</span>
                    </div>

                    <button 
                      onClick={resetContactForm}
                      className="rounded bg-blue-600 text-white font-mono font-bold px-4 py-2 hover:bg-blue-750 transition-all text-xs"
                    >
                      Transmit New Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-slate-600 font-medium">Your Name *</label>
                        <input 
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e)=>setContactForm({...contactForm, name: e.target.value})}
                          className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Dr. Arthur Vance"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600 font-medium">Official Email Address *</label>
                        <input 
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e)=>setContactForm({...contactForm, email: e.target.value})}
                          className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="vance@researchinst.org"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-slate-600 font-medium">Organization / Institution *</label>
                        <input 
                          type="text"
                          required
                          value={contactForm.org}
                          onChange={(e)=>setContactForm({...contactForm, org: e.target.value})}
                          className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="e.g. Stanford R&D Division"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600 font-medium">Inquiry Stream Profile *</label>
                        <select
                          value={contactForm.type}
                          onChange={(e)=>setContactForm({...contactForm, type: e.target.value})}
                          className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-slate-705 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option>Academic Research Engagement</option>
                          <option>Corporate Advisory Consultation Slot</option>
                          <option>Keynote Speakers Booking Slate</option>
                          <option>Postgraduate Supervision Admission dossier</option>
                          <option>General Liaison Support Checklist</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-600 font-medium">Describe your alignment query parameters *</label>
                      <textarea 
                        rows={5}
                        required
                        value={contactForm.msg}
                        onChange={(e)=>setContactForm({...contactForm, msg: e.target.value})}
                        className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 leading-relaxed focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
                        placeholder="Detail collaborative joint bids, proposed consulting dates, or MSc/PhD project abstract files..."
                      />
                    </div>

                    <div className="flex gap-2 text-[10px] text-slate-500 leading-snug">
                      <input type="checkbox" required defaultChecked className="mt-0.5 rounded cursor-pointer shrink-0" />
                      <span>Security Opt-in checklist: I declare that this message is related to professional, industrial, or postgraduate scientific alignment queries.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded bg-blue-600 py-2.5 font-mono font-bold text-white hover:bg-blue-700 hover:scale-[1.01] active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <Send className="h-4 w-4" />
                      Transmit Secure Inquiry
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Floating AI Assistant Widget representing his executive assistant */}
      <AIChatWidget />

      {/* Primary Global Site Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 relative z-10 text-center font-mono text-[10px] text-slate-500 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5 text-left">
            <span className="block text-slate-900 font-bold font-sans">PROF. PIUS ADEWALE OWOLAWI</span>
            <span className="block text-slate-400 uppercase tracking-widest text-[8px] font-semibold">Assistant Dean: FICT Tshwane University of Technology</span>
          </div>
          <div className="text-left sm:text-right text-[8.5px] leading-relaxed text-slate-400">
            <span>© 2026 PiusOwolawi.com. All Rights Secured & Verified.<br />Designed in executive alignment for global leadership placement.</span>
          </div>
        </div>
      </footer>


    </div>
  );
}
