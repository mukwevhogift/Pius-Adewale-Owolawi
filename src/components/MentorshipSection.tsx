import React, { useState } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  Users, 
  Briefcase,
  ArrowRight,
  Send,
  Sparkles,
  Search
} from "lucide-react";
import { SUPERVISION_RECORD } from "../data.js";

export default function MentorshipSection() {
  const [filterType, setFilterType] = useState<'all' | 'Postdoctoral' | 'Doctoral'>('all');
  const [studentSearch, setStudentSearch] = useState("");

  const filteredStudents = SUPERVISION_RECORD.filter(st => {
    const matchesType = filterType === 'all' || st.type === filterType;
    const matchesSearch = st.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          st.thesisFocus.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          st.institution.toLowerCase().includes(studentSearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div id="mentorship-section" className="space-y-16 animate-in fade-in duration-300 font-sans">
      
      {/* 1. Mentorship Dashboard Intro */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold text-[#C9A84C] uppercase tracking-widest block">POSTGRADUATE ADVISORY SUITE</span>
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white">Supervision & Mentorship Directory</h2>
        <p className="font-sans text-sm text-gray-300 max-w-2xl leading-relaxed">
          Prof. Owolawi maintains a 100% completion rate for postgraduate candidates who progress to final thesis defense. Under his guidance, 8 Postdoctoral, 8 Doctoral (PhD/DEng), and 29 Masters (MTech/MComp) candidates have graduated, with another 30+ currently active.
        </p>
      </div>

      {/* 2. Supervision Records Super Metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 font-mono text-center">
        <div className="rounded-xl border border-[#2E3A4A]/25 bg-[#0E1623] p-4 text-white">
          <span className="text-2xl font-bold block text-[#C9A84C]">8</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">Postdocs Completed</span>
        </div>
        <div className="rounded-xl border border-[#2E3A4A]/25 bg-[#0E1623] p-4 text-white">
          <span className="text-2xl font-bold block text-[#C9A84C]">5</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">Postdocs Active</span>
        </div>
        <div className="rounded-xl border border-[#2E3A4A]/25 bg-[#0E1623] p-4 text-white">
          <span className="text-2xl font-bold block text-[#C9A84C]">8</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">PhDs Graduated</span>
        </div>
        <div className="rounded-xl border border-[#2E3A4A]/25 bg-[#0E1623] p-4 text-white">
          <span className="text-2xl font-bold block text-[#C9A84C]">14</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">PhD Candidates Active</span>
        </div>
        <div className="rounded-xl border border-[#2E3A4A]/25 bg-[#0E1623] p-4 text-white">
          <span className="text-2xl font-bold block text-[#C9A84C]">29</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">Masters Graduated</span>
        </div>
        <div className="rounded-xl border border-[#2E3A4A]/25 bg-[#0E1623] p-4 text-white">
          <span className="text-2xl font-bold block text-[#C9A84C]">15+</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">Masters Active</span>
        </div>
      </div>

      {/* 3. Filterable Master Table of Alumni (Completed Supervisors list) */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
              Completed Supervision Record
            </h3>
            <p className="text-xs text-slate-500">Search and browse completed PhDs and Postdoctoral Mentorships</p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-col gap-2 sm:flex-row text-xs">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search alumni names, thesis topics..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="rounded border border-[#2E3A4A] bg-[#07111D] pl-8 pr-3 py-1.5 text-white max-w-[210px] placeholder-gray-500 focus:outline-none focus:border-[#C9A84C]"
              />
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
            </div>

            <div className="flex gap-1 rounded bg-[#07111D] p-1">
              <button 
                onClick={() => setFilterType('all')}
                className={`rounded px-2.5 py-1 font-medium transition-all ${filterType === 'all' ? 'bg-[#C9A84C] text-[#0A1628]' : 'text-[#7A8898] hover:text-white'}`}
              >
                All Lists
              </button>
              <button 
                onClick={() => setFilterType('Postdoctoral')}
                className={`rounded px-2.5 py-1 font-medium transition-all ${filterType === 'Postdoctoral' ? 'bg-[#C9A84C] text-[#0A1628]' : 'text-[#7A8898] hover:text-white'}`}
              >
                Postdocs
              </button>
              <button 
                onClick={() => setFilterType('Doctoral')}
                className={`rounded px-2.5 py-1 font-medium transition-all ${filterType === 'Doctoral' ? 'bg-[#C9A84C] text-[#0A1628]' : 'text-[#7A8898] hover:text-white'}`}
              >
                PhD Graduates
              </button>
            </div>
          </div>
        </div>

        {/* Supervision Output Table */}
        <div className="overflow-x-auto rounded-xl border border-[#2E3A4A]/25 bg-[#07111D]">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-[#0E1E34] border-b border-[#2E3A4A] text-[#C9A84C] font-semibold font-mono tracking-wider text-[9px] uppercase">
                <th className="p-3">ALUMNUS NAME</th>
                <th className="p-3">QUALIFICATION TYPE</th>
                <th className="p-3">UNIVERSITY</th>
                <th className="p-3">DEFENSE FOCUS & RESEARCH FIELD</th>
                <th className="p-3 text-right">YEAR / DURATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E3A4A]/40 text-gray-300">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((st) => (
                  <tr key={st.name} className="hover:bg-blue-50/60 transition-colors">
                    <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-[#C9A84C] rounded-full" />
                      {st.name}
                    </td>
                    <td className="p-3">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-mono border font-semibold ${
                        st.type === "Postdoctoral" 
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}>
                        {st.type}
                      </span>
                    </td>
                    <td className="p-3 font-mono">{st.institution}</td>
                    <td className="p-3 text-slate-300 font-medium italic">{st.thesisFocus}</td>
                    <td className="p-3 text-right text-gray-400 font-mono">{st.year}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#7A8898] font-mono">No matching supervising records found. Try revising search string.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Active Supervision Application Guide & Flow chart (As specified in screenshots) */}
      <div id="supervision-guide" className="rounded-2xl border border-[#2E3A4A]/25 bg-[#0E1E34] p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <h3 className="font-sans text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-[#C9A84C] h-5 w-5" />
            Admissions Prospectus & How to Apply
          </h3>
          <p className="text-xs text-[#7A8898]">Current funding opportunities exist for candidates detailing crop computer vision and mmwave linkages</p>
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-start font-sans">
          
          {/* Step list - all 5 Steps matching OCR precisely */}
          <div className="md:col-span-7 space-y-4">
            <span className="font-mono text-[9px] text-[#C9A84C] font-semibold tracking-wider block">APPLICATION ROADMAP</span>
            
            <div className="relative border-l-2 border-[#2E3A4A] pl-5 ml-2.5 space-y-5 text-xs text-slate-350">
              
              <div className="relative">
                <span className="absolute -left-7 top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#C9A84C] font-mono text-[9px] font-bold text-[#0A1628]">1</span>
                <span className="block text-white font-bold text-sm">Theme Selection & Alignment Check</span>
                <p className="mt-1">Review active areas (NLP local dialects, Crop 病, mmwave links, FSO, smart micro-grids) and check alignment with my publications registry.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-7 top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gray-700 font-mono text-[9px] font-bold text-white">2</span>
                <span className="block text-white font-bold text-sm">Prospectus Retrieval</span>
                <p className="mt-1">Download current Research Group Prospectus detailing available equipment models, compute nodes, and active bursary lines.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-7 top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gray-700 font-mono text-[9px] font-bold text-white">3</span>
                <span className="block text-white font-bold text-sm">Documents Assembly</span>
                <p className="mt-1">Meticulously compile your portfolio: Detailed CV, transcripts (all tiers), 2 academic reference letters, and a robust 2-3 page Research Proposal outline.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-7 top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gray-700 font-mono text-[9px] font-bold text-white">4</span>
                <span className="block text-white font-bold text-sm">Submission</span>
                <p className="mt-1">Submit dossier packs cleanly utilizing the student contact selector form under general inquiry channels.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-7 top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#EAB308] font-mono text-[9px] font-bold text-[#0A1628]">5</span>
                <span className="block text-white font-bold text-sm">Shortlisting & Technical Review</span>
                <p className="mt-1">Qualified candidates are invited to an open, online technical video-scrutiny session directly with Prof. Owolawi within 4 weeks.</p>
              </div>

            </div>
          </div>

          {/* Action Call for Admissions form */}
          <div className="md:col-span-5 rounded-xl bg-slate-50 border border-slate-250 p-5 space-y-4">
            <span className="font-mono text-[9px] text-blue-600 font-semibold tracking-wider block">OPPORTUNITIES IN PRECISENESS</span>
            <h4 className="text-base font-bold text-slate-900">Current Funded Scopes (2025/2026)</h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="rounded border border-emerald-200 bg-emerald-50/50 p-3">
                <span className="font-bold text-slate-900 block">UAV Precision Diagnostics</span>
                <span className="text-slate-500 font-semibold block mt-0.5">Project Ref: PS25TUT11 (AgriSETA Drones)</span>
                <p className="text-slate-600 mt-1 leading-relaxed">Fully-funded MSc/PhD scopes integrating multispectral pathology scanning on subtropical maize and citrus fields with YOLO models.</p>
              </div>

              <div className="rounded border border-blue-200 bg-blue-50/40 p-3">
                <span className="font-bold text-slate-900 block">Setswana / Sesotho Language Models</span>
                <span className="text-slate-500 font-semibold block mt-0.5">MICTSETA 4IR Research Chair funding lines</span>
                <p className="text-slate-600 mt-1 leading-relaxed">PhD research tracks focused on Cross-Subject adaptation or Low-Rank LoRA tuning on local South African languages.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
