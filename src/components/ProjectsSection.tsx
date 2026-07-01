import React, { useState } from "react";
import { 
  Building, 
  Sparkles, 
  ArrowUpRight, 
  Cpu, 
  Settings, 
  Users, 
  Flame, 
  Award,
  Video,
  X,
  Send,
  MessageSquare
} from "lucide-react";
import { PROJECTS } from "../data.js";

export default function ProjectsSection() {
  const [partnershipModalProject, setPartnershipModalProject] = useState<typeof PROJECTS[number] | null>(null);
  const [partnerForm, setPartnerForm] = useState({ name: "", email: "", org: "", proposal: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name || !partnerForm.email || !partnerForm.proposal) return;
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setPartnershipModalProject(null);
      setPartnerForm({ name: "", email: "", org: "", proposal: "" });
    }, 2500);
  };

  return (
    <div id="projects-section" className="space-y-12 animate-in fade-in duration-300">
      
      {/* Portfolio Overview Intro */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-bold text-blue-600 tracking-widest block uppercase">DEEPTECH VENTURES & APPLIED LABS</span>
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">Innovation Portfolio Overview</h2>
        <p className="font-sans text-sm text-slate-600 max-w-2xl leading-relaxed">
          Prof. Owolawi's innovation projects bridge the gap between academic theory and real-world commercial tech deployment across three continents, combining public-private partnerships with capital enterprise.
        </p>
      </div>

      {/* Grid of the 6 major projects */}
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => {
          const isEdTech = p.id === "studyflix";
          const isAgri = p.id === "agriseta-drone";
          const isChair = p.id === "mictseta-chair";

          return (
            <div 
              key={p.id}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-blue-400 flex flex-col justify-between hover:shadow-md"
            >
              {/* Corner Glow decoration */}
              <div className="absolute right-0 top-0 h-24 w-24 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/5 to-transparent rounded-bl-3xl" />
              
              <div className="space-y-4">
                {/* Header indicators */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className={`rounded-full px-2.5 py-0.5 border font-semibold ${
                    p.status === "Active" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : p.status === "Completed"
                      ? "bg-slate-50 text-slate-500 border-slate-250"
                      : "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-blue-600 font-semibold">{p.category}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-bold text-slate-900 tracking-tight">{p.title}</h3>
                  <p className="font-sans text-xs text-blue-600 font-semibold tracking-tight">{p.subtitle}</p>
                </div>

                <p className="font-sans text-xs text-slate-655 leading-relaxed">{p.description}</p>

                {/* Sub activities bullet points list */}
                <div className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed space-y-1 font-sans">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1.5">Activities & Highlights</span>
                  {p.keyFeaturesOrActivities.map((act, idx) => (
                    <div key={idx} className="flex gap-1.5 items-start text-slate-700">
                      <span className="text-blue-600 mt-0.5 shrink-0 font-bold">•</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                {/* Funding or scale info indicators */}
                {p.scaleOrFunding && (
                  <div className="flex gap-2 items-center bg-blue-50/50 border border-blue-100 rounded-lg p-2.5 font-mono text-[10px] text-slate-700">
                    <Flame className="h-4 w-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-blue-600 uppercase font-bold block">Portfolio Scale</span>
                      <span>{p.scaleOrFunding}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                {p.duration || p.ref ? (
                  <span className="font-mono text-[10px] text-slate-500">
                    {p.duration || p.ref}
                  </span>
                ) : <span className="h-1 w-2" />}

                <button
                  onClick={() => setPartnershipModalProject(p)}
                  className="rounded bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-mono font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                >
                  SEEK PARTNERSHIP
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. SEAMLESS PARTNERSHIP PROPOSAL MODAL OVERLAY */}
      {partnershipModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-xs animate-in fade-in duration-250">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-2xl animate-in scale-in duration-150">
            <button 
              onClick={() => setPartnershipModalProject(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3 font-sans">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-305 text-emerald-600">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Proposal Transmitted</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your strategic partnership inquiry regarding <strong>{partnershipModalProject.title}</strong> has been secured. Prof. Owolawi's liaison office at TUT ICT faculty will reply within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans">
                <div className="border-b border-slate-100 pb-2.5">
                  <span className="font-mono text-[10px] text-blue-600 uppercase tracking-wider block font-bold">Ventures Board Submission</span>
                  <h3 className="text-base font-bold text-slate-900">Partner on: {partnershipModalProject.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Submit organizational alignment ideas directly to the project director.</p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-slate-600 font-medium">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={partnerForm.name}
                        onChange={(e)=>setPartnerForm({...partnerForm, name: e.target.value})}
                        className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-600 font-medium">Work Email *</label>
                      <input 
                        type="email" 
                        required
                        value={partnerForm.email}
                        onChange={(e)=>setPartnerForm({...partnerForm, email: e.target.value})}
                        className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                        placeholder="john@organization.org"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 font-medium">Institution / Enterprise Name *</label>
                    <input 
                      type="text" 
                      required
                      value={partnerForm.org}
                      onChange={(e)=>setPartnerForm({...partnerForm, org: e.target.value})}
                      className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                      placeholder="e.g. AWS Research or Department of Education South Africa"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 font-medium">Describe Collaboration Proposal or Resource Alignment *</label>
                    <textarea 
                      required
                      rows={4}
                      value={partnerForm.proposal}
                      onChange={(e)=>setPartnerForm({...partnerForm, proposal: e.target.value})}
                      className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600 leading-relaxed"
                      placeholder="Detail cloud credits proposals, student placement slots, co-tutelle agreements, or precision agriculture drone training requests..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setPartnershipModalProject(null)}
                    className="rounded border border-slate-200 bg-transparent text-slate-600 px-4 py-2 hover:bg-slate-55"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="rounded bg-blue-600 text-white font-bold px-5 py-2 hover:bg-blue-700 flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Transmit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
