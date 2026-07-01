import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Cpu, 
  ArrowUpRight, 
  Award, 
  GraduationCap, 
  HelpCircle,
  FileDown,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { PUBLICATIONS } from "../data.js";

export default function ScholarSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState<"all" | "Journal" | "Conference" | "Book Chapter">("all");
  const [studentCoAuthorOnly, setStudentCoAuthorOnly] = useState(false);
  
  // AI Research Assistant sub-component variables
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Derive filter lists
  const availableYears = Array.from(new Set(PUBLICATIONS.map(p => p.year.toString()))).sort((a,b)=> b.localeCompare(a));

  const filteredPublications = PUBLICATIONS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === "all" || p.year.toString() === selectedYear;
    const matchesType = selectedType === "all" || p.type === selectedType;
    const matchesStudent = !studentCoAuthorOnly || p.studentCollaborator === true;

    return matchesSearch && matchesYear && matchesType && matchesStudent;
  });

  // Handle AI semantic publications recommendation request
  const handleAiConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setAiResponse("");

    try {
      const resp = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: aiPrompt })
      });
      const data = await resp.json();
      if (resp.ok) {
        setAiResponse(data.interpretation || data.results);
      } else {
        setAiResponse(`Failed to consult AI Research Assistant: ${data.error || 'Server connection error.'}`);
      }
    } catch (err: any) {
      setAiResponse(`Error connecting to AI models: ${err?.message || 'Check terminal server status.'}`);
    } finally {
      setAiLoading(false);
    }
  };

  const loadPresetQuery = (query: string) => {
    setAiPrompt(query);
  };

  return (
    <div id="scholar-section" className="space-y-16 animate-in fade-in duration-300 font-sans">
      
      {/* 1. Scholar Intro Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest block">CHRONOLOGICAL BIBLIOGRAPHY & ORCID PROFILE</span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">Academic Publications Portal</h2>
          <p className="font-sans text-sm text-slate-600 max-w-2xl leading-relaxed">
            Consistently recognized among Africa's top 500 scientific minds, Prof. Owolawi's peer-reviewed chapters and articles span millimetre wave satellite propagation, 5G link attenuation, Yolov5 agricultural drone vision models, and low-resource neural networks.
          </p>
        </div>

        {/* Global Scholar Indicators badges */}
        <div className="flex flex-wrap gap-2.5">
          <a 
            href="https://scholar.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-blue-400 transition-colors flex items-center gap-3.5 shadow-xs"
          >
            <div className="h-9 w-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
              GS
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-mono uppercase font-bold tracking-widest">Google Scholar</span>
              <span className="block text-xs text-slate-800 font-semibold">2,000+ Citations</span>
            </div>
          </a>

          <a 
            href="https://orcid.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-400 transition-colors flex items-center gap-3.5 shadow-xs"
          >
            <div className="h-9 w-9 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs uppercase font-mono border border-emerald-100">
              ID
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-mono uppercase font-bold tracking-widest">ORCID Registry</span>
              <span className="block text-xs text-slate-800 font-semibold">0000-0002-3929-1025</span>
            </div>
          </a>
        </div>
      </div>

      {/* 2. RESEARCH SEARCH ASSISTANT (AI Prompter Panel) */}
      <div id="ai-research-assistant" className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-sans text-base font-bold text-slate-900 tracking-tight">AI Research Search Assistant</h3>
            <p className="text-xs text-slate-500">State queries like "rain attenuation in Sub-Saharan regions" to let the AI search my publications catalog and extract matched insights</p>
          </div>
        </div>

        <form onSubmit={handleAiConsultation} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              required
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-4 pr-32 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              placeholder="e.g., Which publications research drone crop spraying or YOLOv5 modeling?"
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="absolute right-2 top-2 rounded bg-blue-600 px-4 py-1.5 text-xs font-mono font-bold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {aiLoading ? "CONSULTING..." : "CONSULT AI"}
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
            <span className="text-slate-500 self-center">Preset Queries:</span>
            <button 
              type="button"
              onClick={() => loadPresetQuery("Find publications involving rain models or millimeter wave propagation in Soshanguve")}
              className="rounded bg-slate-50 border border-slate-200 px-2.5 py-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
            >
              "Rain links in Soshanguve"
            </button>
            <button 
              type="button"
              onClick={() => loadPresetQuery("Show me works on UAV drone piloting crop sprayers")}
              className="rounded bg-slate-50 border border-slate-200 px-2.5 py-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
            >
              "Drones Precision Sprayer"
            </button>
            <button 
              type="button"
              onClick={() => loadPresetQuery("What papers discuss SCORM Virtual Learning Systems or StudyFlix formats?")}
              className="rounded bg-slate-50 border border-slate-200 px-2.5 py-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
            >
              "Virtual LMS & EdTech"
            </button>
          </div>
        </form>

        {/* AI Output Window */}
        {(aiResponse || aiLoading) && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs font-mono select-text">
            {aiLoading ? (
              <div className="flex items-center gap-2 text-slate-550">
                <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                <span>AI is scanning academic database indices and referencing matching authors... Hold on...</span>
              </div>
            ) : (
              <div className="space-y-2 whitespace-pre-wrap leading-relaxed text-slate-750">
                <span className="text-emerald-600 text-[10px] font-bold block uppercase tracking-wider">Matched Scholarly Insights:</span>
                <p className="font-sans text-xs text-slate-700">{aiResponse}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Searchable Local Database with advanced filters */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-150 pb-4">
          <div className="space-y-1">
            <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Publications Library Registry ({filteredPublications.length})
            </h3>
            <p className="text-xs text-slate-500">Filter index by publication type, year, student collaborations, and keyword query</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {/* Year selectivity */}
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-slate-800 text-xs select-none focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Years</option>
              {availableYears.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>

            {/* Student Coauthors slider switch */}
            <button
              onClick={() => setStudentCoAuthorOnly(!studentCoAuthorOnly)}
              className={`rounded border px-3 py-1.5 font-mono text-[10px] font-semibold transition-all ${
                studentCoAuthorOnly 
                  ? "bg-blue-50 border-blue-300 text-blue-700" 
                  : "border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-300"
              }`}
            >
              COLLABORATORS: {studentCoAuthorOnly ? "STUDENTS ONLY" : "ALL AUTHORS"}
            </button>
          </div>
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg text-xs font-mono max-w-max">
          <button 
            onClick={() => setSelectedType("all")}
            className={`rounded px-3 py-1 font-semibold transition-all ${selectedType === "all" ? "bg-blue-600 text-white font-bold" : "text-slate-600 hover:text-blue-600"}`}
          >
            All Papers
          </button>
          <button 
            onClick={() => setSelectedType("Journal")}
            className={`rounded px-3 py-1 font-semibold transition-all ${selectedType === "Journal" ? "bg-blue-600 text-white font-bold" : "text-slate-600 hover:text-blue-600"}`}
          >
            Journals
          </button>
          <button 
            onClick={() => setSelectedType("Conference")}
            className={`rounded px-3 py-1 font-semibold transition-all ${selectedType === "Conference" ? "bg-blue-600 text-white font-bold" : "text-slate-600 hover:text-blue-600"}`}
          >
            Conferences
          </button>
          <button 
            onClick={() => setSelectedType("Book Chapter")}
            className={`rounded px-3 py-1 font-semibold transition-all ${selectedType === "Book Chapter" ? "bg-blue-600 text-white font-bold" : "text-slate-600 hover:text-blue-600"}`}
          >
            Chapters
          </button>
        </div>

        {/* Text-search box bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Filter list by title keyword, co-author names, publisher venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          <Search className="h-4.5 w-4.5 absolute left-3.5 top-3.5 text-slate-400" />
        </div>

        {/* Result grid rows listing */}
        <div className="space-y-4">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pb) => (
              <div 
                key={pb.title} 
                className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 transition-all text-left hover:shadow-md"
              >
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-semibold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {pb.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">{pb.year}</span>
                      {pb.studentCollaborator && (
                        <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase font-bold">
                          Student Mentored
                        </span>
                      )}
                    </div>
                    <h4 className="font-sans text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {pb.title}
                    </h4>
                    <p className="text-xs text-slate-600 italic font-sans">{pb.authors}</p>
                    <p className="text-[11px] text-slate-500 font-medium font-sans">
                      Published in: <span className="text-slate-750 text-semibold">{pb.venue}</span>
                    </p>
                  </div>

                  {pb.doi && (
                    <div className="shrink-0 flex sm:flex-col items-end gap-1.5 pt-2 sm:pt-0">
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">Indexed</span>
                      <a 
                        href={`https://doi.org/${pb.doi}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="rounded border border-slate-200 bg-slate-50 hover:bg-blue-50 px-3 py-1 text-[10px] font-mono font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1"
                      >
                        DOI Link <ArrowUpRight className="h-3 w-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500 font-mono text-xs">
              No publications matched active filters. Try clearing queries or switches.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
