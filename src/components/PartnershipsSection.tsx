import React from "react";
import { 
  Building, 
  Coins, 
  Settings, 
  Bookmark, 
  ShieldCheck, 
  ChevronRight, 
  Layers,
  HelpCircle,
  FileCheck2,
  Table
} from "lucide-react";
import { PARTNERS, CASE_STUDIES } from "../data.js";

export default function PartnershipsSection() {
  return (
    <div id="partnerships-section" className="space-y-16 animate-in fade-in duration-300 font-sans">
      
      {/* 1. Partnerships Ecosystem Overview */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest block">INTER-INSTITUTIONAL COOPERATIVE MATRIX</span>
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">Academic, SETA & Industry Partnerships</h2>
        <p className="font-sans text-sm text-slate-600 max-w-2xl leading-relaxed">
          Prof. Owolawi has conceptualized, funded, and sustained one of South African higher education's most diverse partnership grids, spanning global deeptech firms (NVIDIA, AWS, Microsoft), municipal cities, and Sector Education and Training Authorities (SETAs).
        </p>
      </div>

      {/* 2. Success Stories Case Studies */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
            National Partnership Case Studies
          </h3>
          <p className="text-xs text-slate-500">Measurable community, academic, and economic placement deliverables</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs) => (
            <div 
              key={cs.id}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="rounded bg-blue-50 p-2 text-blue-600 w-max">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h4 className="font-sans text-base font-bold text-slate-900 tracking-tight">{cs.title}</h4>
              
              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs leading-relaxed">
                <div>
                  <span className="font-mono text-[9px] text-blue-600 uppercase font-bold tracking-widest block">CHALLENGE</span>
                  <p className="text-slate-600">{cs.challenge}</p>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-emerald-600 uppercase font-bold tracking-widest block">SOLUTION</span>
                  <p className="text-slate-600">{cs.solution}</p>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-blue-600 uppercase font-bold tracking-widest block">FUNDING & IMPACT</span>
                  <p className="text-slate-900 font-bold">{cs.scale || 'N/A'}</p>
                  <p className="text-slate-550 font-medium mt-0.5">{cs.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Fully detailed Grants & Funding Portfolio Tables (As requested) */}
      <div id="grant-details-table" className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-2">
            <Coins className="h-5 w-5 text-blue-600" />
            Structured Grants & Funding Portals
          </h3>
          <p className="text-xs text-slate-500">Meticulous audited ledger details across major categories (Total: R94,222,765.76 / $5,013,520 USD)</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-blue-600 font-bold font-mono tracking-wider text-[10px]">
                <th className="p-3">GRANT CATEGORY & CODE</th>
                <th className="p-3">REPRESENTATIVE INSTITUTIONS & PARTNERS</th>
                <th className="p-3">VALUE (ZAR)</th>
                <th className="p-3">VALUE (USD)</th>
                <th className="p-3 text-right">AUDITED IMPACT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              
              {/* Cat 1 */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-900">4IR Research Chair LMS & Support</td>
                <td className="p-3 font-mono">MICTSETA, TUT ICT Faculty</td>
                <td className="p-3 text-blue-600 font-mono font-semibold">R10,647,965.76</td>
                <td className="p-3 font-mono">~$566,652</td>
                <td className="p-3 text-right text-xs">Developed National LMS platforms, Career Hub Apps & postgraduate bursaries for 30+ students.</td>
              </tr>
              
              {/* Cat 2.1 */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-900">Graduate Workplace Placements (BANKSETA)</td>
                <td className="p-3 font-mono">BANKSETA (2017–2023)</td>
                <td className="p-3 text-blue-600 font-mono font-semibold">R29,056,800.00</td>
                <td className="p-3 font-mono">~$1,540,011</td>
                <td className="p-3 text-right text-xs">Structured technology training and placement for 532 banking division interns.</td>
              </tr>

              {/* Cat 2.2 */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-900">Digital Skills Workplace (MICTSETA)</td>
                <td className="p-3 font-mono">MICTSETA WIL (2019–2024)</td>
                <td className="p-3 text-blue-600 font-mono font-semibold">R26,432,000.00</td>
                <td className="p-3 font-mono">~$1,413,489</td>
                <td className="p-3 text-right text-xs">Supported curriculum transformation and career coaching for 440 local learners.</td>
              </tr>

              {/* Cat 3 */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-900">Drone Precision Pilot certified models</td>
                <td className="p-3 font-mono">AgriSETA Ref: PS25TUT11 (2025–2026)</td>
                <td className="p-3 text-blue-600 font-mono font-semibold">R12,430,000.00</td>
                <td className="p-3 font-mono">~$784,110</td>
                <td className="p-3 text-right text-xs">Training 100 learners in commercial SACAA drone piloting and smart chemical agricultural sprays.</td>
              </tr>

              {/* Cat 4 */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-900">Capital Innovation & mmWave Seeds</td>
                <td className="p-3 font-mono">TIA, NRF, GIZ-SAGEN Energy</td>
                <td className="p-3 text-blue-600 font-mono font-semibold">R8,200,000.00</td>
                <td className="p-3 font-mono">~$436,611</td>
                <td className="p-3 text-right text-xs">Pioneered TIA vehicle scan trackers and NRF mmWave satellite equipment.</td>
              </tr>

              {/* Cat 5 */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-900">Audited Heavy Laboratory infrastructure</td>
                <td className="p-3 font-mono">Mangosuthu University of Tech, Eskom</td>
                <td className="p-3 text-blue-600 font-mono font-semibold">R5,120,000.00</td>
                <td className="p-3 font-mono">~$272,646</td>
                <td className="p-3 text-right text-xs">Established MUT and TUT EMC laboratory darkrooms & wind turbines.</td>
              </tr>

              {/* Grand Total */}
              <tr className="bg-slate-105 text-slate-900 font-bold">
                <td className="p-3 uppercase">GRAND TOTAL FUNDING SECURED</td>
                <td className="p-3 font-mono">Cumulative Project Led Output</td>
                <td className="p-3 font-mono text-blue-600 font-semibold">R94,222,765.76</td>
                <td className="p-3 font-mono">~$5,013,520</td>
                <td className="p-3 text-right uppercase text-[10px] tracking-wider font-mono">100% Audit Verified</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Graphical/Badged Grid representing corporate past partners */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Corporate & Governmental Partner Logos
          </h3>
          <p className="text-xs text-slate-500">Mutual collaborations providing resources, GPU nodes, and placement opportunities</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 text-center text-xs font-mono">
          {PARTNERS.map((pt) => (
            <div 
              key={pt.name} 
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between items-center min-h-[140px] hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-0.5 group shadow-xs hover:shadow-md"
              title={pt.engagement}
            >
              <div className="h-14 w-14 rounded-lg bg-white p-2 flex items-center justify-center shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-slate-100">
                {pt.logoUrl ? (
                  <>
                    <img 
                      src={pt.logoUrl} 
                      alt={`${pt.name} logo`} 
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallbackElem = e.currentTarget.nextSibling as HTMLElement;
                        if (fallbackElem) {
                          fallbackElem.style.setProperty('display', 'flex', 'important');
                        }
                      }}
                    />
                    <div 
                      className="hidden absolute inset-0 h-full w-full bg-slate-100 text-slate-600 font-bold font-mono items-center justify-center text-xs uppercase"
                    >
                      {pt.logoInitial}
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 h-full w-full flex bg-blue-50 text-blue-600 font-bold font-mono items-center justify-center text-xs uppercase">
                    {pt.logoInitial}
                  </div>
                )}
              </div>
              <div className="w-full mt-2">
                <span className="block text-slate-800 font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{pt.name}</span>
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-0.5">{pt.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Partnership Models Overview */}
      <div id="partnership-models" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-xs">
        <div className="space-y-1">
          <h3 className="font-sans text-xl font-bold text-slate-900">Global Collaboration Opportunities</h3>
          <p className="text-xs text-slate-500">Scoped blueprints available for corporations, development entities, and international deans</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-xs leading-relaxed font-sans">
          
          {/* Companies */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono text-blue-600 font-bold uppercase tracking-widest block border-b border-slate-250 pb-1.5">For Technology Companies</span>
            <ul className="space-y-2 text-slate-700">
              <li>• **GPU/Compute Pipelines**: Form joint GPU cluster integrations with my 35+ active student researchers.</li>
              <li>• **Talent Acquisition**: Early recruitment filters to acquire leading AI, CV and 5G/6G master graduates.</li>
              <li>• **Joint Grant Proposal**: Co-submit large NSF CISE or NIH diagnostic bids on crop disease and smart telehealth.</li>
            </ul>
          </div>

          {/* Governments */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono text-blue-600 font-bold uppercase tracking-widest block border-b border-slate-250 pb-1.5">For Govs & SETAs</span>
            <ul className="space-y-2 text-slate-700">
              <li>• **Regional AI Strategy**: Formulate 4IR vocational skills curricula and policy frameworks with my team.</li>
              <li>• **Grant Management**: Direct consultancy scoping, implementation tracking, and e-learning integration portals.</li>
              <li>• **Syllabus Auditing**: ECSA and CHE qualifications compliance audits for technical colleges.</li>
            </ul>
          </div>

          {/* Universities */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-mono text-blue-600 font-bold uppercase tracking-widest block border-b border-slate-250 pb-1.5">For Global Universities</span>
            <ul className="space-y-2 text-slate-700">
              <li>• **Joint Supervision**: Establish doctoral-level co-tutelle tracks between US, SA, and European departments.</li>
              <li>• **Sabbatical Exchanges**: Host/co-chair visiting professorship slots with TUT ICT Faculty pools.</li>
              <li>• **Funding Bridging**: Formulate joint applications under Gates Foundation, USAID or USAID Fogarty frameworks.</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
