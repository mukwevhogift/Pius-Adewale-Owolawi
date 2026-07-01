import React, { useState } from "react";
import { 
  Trophy, 
  BookOpen, 
  Coins, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  TrendingDown,
  Activity,
  Award
} from "lucide-react";

export default function ResearchDashboard() {
  const [hoveredNode, setHoveredNode] = useState<{ chart: string; label: string; value: string; x: number; y: number } | null>(null);

  // 1. Citation Growth Data (2006 - 2025)
  const citationData = [
    { year: "2006", citations: 12 },
    { year: "2008", citations: 45 },
    { year: "2010", citations: 110 },
    { year: "2012", citations: 280 },
    { year: "2014", citations: 520 },
    { year: "2016", citations: 890 },
    { year: "2018", citations: 1240 },
    { year: "2020", citations: 1580 },
    { year: "2022", citations: 1840 },
    { year: "2024", citations: 2110 },
    { year: "2025", citations: 2260 }
  ];

  // 2. Publication Bar Data (2006 - 2025)
  const publicationData = [
    { year: "2006", journals: 1, conferences: 2 },
    { year: "2010", journals: 3, conferences: 4 },
    { year: "2012", journals: 6, conferences: 5 },
    { year: "2015", journals: 9, conferences: 8 },
    { year: "2018", journals: 12, conferences: 11 },
    { year: "2021", journals: 15, conferences: 17 },
    { year: "2024", journals: 19, conferences: 22 },
    { year: "2025", journals: 23, conferences: 25 }
  ];

  // 3. SECURED FUNDING DISTRIBUTION (ZAR, Millions)
  const fundingAllocation = [
    { source: "BANKSETA / WIL", value: 29.06, color: "#C9A84C", desc: "Work-Integrated Skills Placements (532 Learners)" },
    { source: "MICTSETA / WIL", value: 26.43, color: "#AC8D34", desc: "Digital & 4IR Workplace Placements (440 Learners)" },
    { source: "AgriSETA Drones", value: 12.43, color: "#957723", desc: "Precision UAV Pilot Operations (100 Learners)" },
    { source: "MICTSETA Chair", value: 10.65, color: "#7F6212", desc: "4IR Skills Chair, LMS Portals Development" },
    { source: "Innovation Seed", value: 8.20, color: "#5F490C", desc: "TIA, GIZ, energy fault and vehicle detection grids" },
    { source: "Infrastructure Labs", value: 5.12, color: "#483606", desc: "High-end MUT EMC/EMI darkroom facility" }
  ];

  // 4. Student Graduation Trends
  const graduationData = [
    { year: "2012", masters: 2, phd: 0, postdocs: 1 },
    { year: "2015", masters: 5, phd: 1, postdocs: 2 },
    { year: "2018", masters: 8, phd: 3, postdocs: 2 },
    { year: "2021", masters: 12, phd: 5, postdocs: 4 },
    { year: "2024", masters: 18, phd: 7, postdocs: 6 },
    { year: "2025", masters: 29, phd: 8, postdocs: 8 }
  ];

  // Animated counters static values (represented in sleek visual indicators)
  const stats = [
    { id: "pub-count", label: "Peer-Reviewed Publications", value: "200+", detail: "Journals, chapters, standardizations", icon: <BookOpen className="h-6 w-6 text-[#C9A84C]" /> },
    { id: "cit-count", label: "Academic Citations", value: "2,000+", detail: "Worldwide Google Scholar footprint", icon: <Trophy className="h-6 w-6 text-[#C9A84C]" /> },
    { id: "fun-count", label: "Secured Grant Influx", value: "$5M+", detail: "R94.22 Million competitive grants", icon: <Coins className="h-6 w-6 text-[#C9A84C]" /> },
    { id: "stu-count", label: "Academic Mentorships", value: "30+", detail: "Completed PhD / Postdocs guided", icon: <Users className="h-6 w-6 text-[#C9A84C]" /> }
  ];

  return (
    <div id="research-dashboard-module" className="space-y-8">
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((st) => (
          <div 
            key={st.id}
            id={st.id} 
            className="group relative overflow-hidden rounded-xl border border-[#2E3A4A]/25 bg-[#0D1623] p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#C9A84C]/55 hover:bg-[#0E1B2D]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7A8898] uppercase tracking-wider">{st.label}</span>
              <div className="rounded-lg bg-[#C9A84C]/5 p-2 group-hover:bg-[#C9A84C]/10 transition-colors">
                {st.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="font-sans text-3xl font-bold tracking-tight text-white group-hover:text-[#C9A84C] transition-colors">{st.value}</span>
              <span className="text-xs text-emerald-500 font-mono flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="h-3 w-3 shrink-0" />
                SECURED
              </span>
            </div>
            <p className="mt-1 text-xs text-[#7A8898]">{st.detail}</p>
            {/* Visual Underline highlight */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#C9A84C] transition-all group-hover:w-full" />
          </div>
        ))}
      </div>

      {/* Primary Research Graphs Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 1. CITATIONS GROWTH LINE GRAPH (SVG) */}
        <div id="chart-citations" className="rounded-xl border border-[#2E3A4A]/20 bg-[#0E1623] p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-sans text-base font-semibold tracking-tight text-white">Citation Curve (2006–2025)</h3>
              <p className="text-xs text-[#7A8898]">Cumulative indexing trends on Google Scholar</p>
            </div>
            <span className="flex items-center gap-1.5 rounded bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400 font-mono">
              <TrendingUp className="h-3.5 w-3.5" /> High Impact
            </span>
          </div>

          <div className="relative h-64 w-full">
            <svg viewBox="0 0 500 220" className="h-full w-full overflow-visible">
              {/* Backlines */}
              <line x1="30" y1="20" x2="480" y2="20" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="80" x2="480" y2="80" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="200" x2="480" y2="200" stroke="#2E3A4A" opacity="0.35" />

              {/* Data Path Generation */}
              {/* Scale: X maps 2006-2025 to index 0-10 over dx (450/10 = 45 px) */}
              {/* X range: 30 to 480. Y range: 200 (for 0) down to 20 (for 2300 cits) */}
              {/* Y scale factor: 180px / 2300 = 0.078 px per citation */}
              <path
                d={`M 30 ${200 - Math.round(12 * 0.078)} 
                    L 75 ${200 - Math.round(45 * 0.078)} 
                    L 120 ${200 - Math.round(110 * 0.078)} 
                    L 165 ${200 - Math.round(280 * 0.078)} 
                    L 210 ${200 - Math.round(520 * 0.078)} 
                    L 255 ${200 - Math.round(890 * 0.078)} 
                    L 300 ${200 - Math.round(1240 * 0.078)} 
                    L 345 ${200 - Math.round(1580 * 0.078)} 
                    L 390 ${200 - Math.round(1840 * 0.078)} 
                    L 435 ${200 - Math.round(2110 * 0.078)} 
                    L 480 ${200 - Math.round(2260 * 0.078)}`}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              
              {/* Area map background gradient */}
              <path
                d={`M 30 200 
                    L 30 ${200 - Math.round(12 * 0.078)} 
                    L 75 ${200 - Math.round(45 * 0.078)} 
                    L 120 ${200 - Math.round(110 * 0.078)} 
                    L 165 ${200 - Math.round(280 * 0.078)} 
                    L 210 ${200 - Math.round(520 * 0.078)} 
                    L 255 ${200 - Math.round(890 * 0.078)} 
                    L 300 ${200 - Math.round(1240 * 0.078)} 
                    L 345 ${200 - Math.round(1580 * 0.078)} 
                    L 390 ${200 - Math.round(1840 * 0.078)} 
                    L 435 ${200 - Math.round(2110 * 0.078)} 
                    L 480 ${200 - Math.round(2260 * 0.078)} 
                    L 480 200 Z`}
                fill="url(#goldGradient)"
                opacity="0.12"
              />

              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Data Nodes */}
              {citationData.map((d, i) => {
                const cx = 30 + i * 45;
                const cy = 200 - Math.round(d.citations * 0.078);
                return (
                  <g key={d.year} className="cursor-pointer">
                    <circle
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill="#0E1623"
                      stroke="#C9A84C"
                      strokeWidth="2.5"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredNode({
                          chart: "citations",
                          label: d.year,
                          value: `${d.citations} Citations`,
                          x: cx - 25,
                          y: cy - 35
                        });
                      }}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="transition-transform hover:scale-150"
                    />
                  </g>
                );
              })}

              {/* Axis Labels */}
              <text x="30" y="215" fill="#7A8898" fontSize="8" textAnchor="middle" fontFamily="monospace">2006</text>
              <text x="165" y="215" fill="#7A8898" fontSize="8" textAnchor="middle" fontFamily="monospace">2012</text>
              <text x="300" y="215" fill="#7A8898" fontSize="8" textAnchor="middle" fontFamily="monospace">2018</text>
              <text x="435" y="215" fill="#7A8898" fontSize="8" textAnchor="middle" fontFamily="monospace">2024</text>
              <text x="480" y="215" fill="#C9A84C" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">2025</text>

              {/* Hover Tooltip inside SVG */}
              {hoveredNode && hoveredNode.chart === "citations" && (
                <g>
                  <rect
                    x={hoveredNode.x - 20}
                    y={hoveredNode.y - 12}
                    width="100"
                    height="28"
                    rx="6"
                    fill="#0A121E"
                    stroke="#C9A84C"
                    strokeWidth="1"
                    className="shadow-md"
                  />
                  <text
                    x={hoveredNode.x + 30}
                    y={hoveredNode.y + 6}
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {hoveredNode.label}: {hoveredNode.value}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* 2. CHRONOLOGICAL PUBLICATIONS INCREMENT (SVG) */}
        <div id="chart-publications" className="rounded-xl border border-[#2E3A4A]/20 bg-[#0E1623] p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-sans text-base font-semibold tracking-tight text-white">Core Volume Growth</h3>
              <p className="text-xs text-[#7A8898]">Chronological journals vs conference proceedings</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#C9A84C] font-mono"><span className="h-2.5 w-2.5 rounded bg-[#C9A84C]"></span>Journals</span>
              <span className="flex items-center gap-1 text-gray-500 font-mono"><span className="h-2.5 w-2.5 rounded bg-gray-600"></span>Conferences</span>
            </div>
          </div>

          <div className="relative h-64 w-full">
            <svg viewBox="0 0 500 220" className="h-full w-full overflow-visible">
              {/* Backgrid lines */}
              <line x1="30" y1="20" x2="480" y2="20" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="80" x2="480" y2="80" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="190" x2="480" y2="190" stroke="#2E3A4A" opacity="0.4" />

              {/* Plot Bars */}
              {publicationData.map((d, i) => {
                const groupX = 40 + i * 55;
                const journalHeight = d.journals * 3.5;
                const confHeight = d.conferences * 3.5;

                return (
                  <g key={d.year} className="group cursor-pointer">
                    {/* Journal rect */}
                    <rect
                      x={groupX}
                      y={190 - journalHeight}
                      width="16"
                      height={journalHeight}
                      fill="#C9A84C"
                      rx="2"
                      onMouseEnter={(e) => {
                        setHoveredNode({
                          chart: "publications",
                          label: d.year,
                          value: `${d.journals} Journals`,
                          x: groupX - 10,
                          y: 190 - journalHeight - 20
                        });
                      }}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="transition-all hover:opacity-90"
                    />

                    {/* Conference rect */}
                    <rect
                      x={groupX + 18}
                      y={190 - confHeight}
                      width="16"
                      height={confHeight}
                      fill="#506173"
                      rx="2"
                      onMouseEnter={(e) => {
                        setHoveredNode({
                          chart: "publications",
                          label: d.year,
                          value: `${d.conferences} Papers`,
                          x: groupX + 5,
                          y: 190 - confHeight - 20
                        });
                      }}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="transition-all hover:opacity-90"
                    />

                    {/* Bottom Year limits */}
                    <text x={groupX + 17} y="205" fill="#7A8898" fontSize="8" textAnchor="middle" fontFamily="monospace">{d.year}</text>
                  </g>
                );
              })}

              {/* Axis Indicator Labels */}
              {hoveredNode && hoveredNode.chart === "publications" && (
                <g>
                  <rect
                    x={hoveredNode.x - 30}
                    y={hoveredNode.y - 12}
                    width="110"
                    height="28"
                    rx="6"
                    fill="#0A121E"
                    stroke="#C9A84C"
                    strokeWidth="1"
                    className="shadow-md"
                  />
                  <text
                    x={hoveredNode.x + 25}
                    y={hoveredNode.y + 6}
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {hoveredNode.label}: {hoveredNode.value}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* SECURED FUNDING & COMPLETED SUPERVISIONS GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 3. SECURED FUNDING BY SPONSOR (ZAR, Millions) */}
        <div id="chart-funding" className="rounded-xl border border-[#2E3A4A]/20 bg-[#0E1623] p-6 shadow-sm">
          <div>
            <h3 className="font-sans text-base font-semibold tracking-tight text-white">Competitive Funding Portfolio</h3>
            <p className="text-xs text-[#7A8898]">Breakdown of R94.22 Million Secured Grant Funding</p>
          </div>

          <div className="mt-6 space-y-4">
            {fundingAllocation.map((f) => {
              const totalFactor = 29.06; // Max value for simple percentage scale
              const barPercentage = (f.value / totalFactor) * 100;

              return (
                <div key={f.source} className="group flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-medium text-white group-hover:text-[#C9A84C] transition-colors">{f.source}</span>
                    <div className="flex gap-2">
                      <span className="font-mono text-[#C9A84C] font-semibold">R{f.value.toFixed(2)}M</span>
                      <span className="text-[10px] text-gray-500 font-mono">(${(f.value * 0.053).toFixed(2)}M USD)</span>
                    </div>
                  </div>
                  
                  {/* Progress bar structure */}
                  <div className="relative h-3 w-full rounded-full bg-[#07111D] overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${barPercentage}%`,
                        backgroundColor: f.color
                      }}
                    />
                  </div>
                  
                  <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">
                    {f.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. COMPLETED POSTGRADUATION MENTORSHIPS */}
        <div id="chart-supervision" className="rounded-xl border border-[#2E3A4A]/20 bg-[#0E1623] p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-sans text-base font-semibold tracking-tight text-white">Postgraduate Completions Trend</h3>
              <p className="text-xs text-[#7A8898]">Historically graduated and currently active outputs</p>
            </div>
            <span className="flex items-center gap-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] text-emerald-400 font-mono uppercase tracking-widest font-semibold">
              Admissions Active
            </span>
          </div>

          <div className="relative h-64 w-full">
            <svg viewBox="0 0 500 220" className="h-full w-full overflow-visible">
              {/* Plot guidelines */}
              <line x1="30" y1="20" x2="480" y2="20" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="80" x2="480" y2="80" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="#2E3A4A" strokeDasharray="3 3" opacity="0.3" />
              <line x1="30" y1="190" x2="480" y2="190" stroke="#2E3A4A" opacity="0.4" />

              {/* Polyline Areas or stacked steps */}
              {/* X range: 30 to 480. We have 6 datapoints. Steps: (480-30)/5 = 90 px */}
              {/* Max value is 29 (completed master graduates in 2025). Y scale: 29 -> 20px, 0 -> 190px. Y scale factor: 170 / 30 = 5.6 px per graduate */}
              
              {/* Area 1: Masters (Gold line) */}
              <path
                d={`M 30 ${190 - 2 * 5.6} 
                    L 120 ${190 - 5 * 5.6} 
                    L 210 ${190 - 8 * 5.6} 
                    L 300 ${190 - 12 * 5.6} 
                    L 390 ${190 - 18 * 5.6} 
                    L 480 ${190 - 29 * 5.6}`}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Area 2: Doctoral (Green line) */}
              <path
                d={`M 30 ${190 - 0 * 5.6} 
                    L 120 ${190 - 1 * 5.6} 
                    L 210 ${190 - 3 * 5.6} 
                    L 300 ${190 - 5 * 5.6} 
                    L 390 ${190 - 7 * 5.6} 
                    L 480 ${190 - 8 * 5.6}`}
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 2"
              />

              {/* Area 3: Postdocs Completed (Blue line) */}
              <path
                d={`M 30 ${190 - 1 * 5.6} 
                    L 120 ${190 - 2 * 5.6} 
                    L 210 ${190 - 2 * 5.6} 
                    L 300 ${190 - 4 * 5.6} 
                    L 390 ${190 - 6 * 5.6} 
                    L 480 ${190 - 8 * 5.6}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Small interactive nodes mapping on Masters (dominant curve) */}
              {graduationData.map((d, i) => {
                const cx = 30 + i * 90;
                const cy = 190 - d.masters * 5.6;
                return (
                  <circle
                    key={d.year}
                    cx={cx}
                    cy={cy}
                    r="4.5"
                    fill="#0E1623"
                    stroke="#C9A84C"
                    strokeWidth="2"
                    onMouseEnter={() => {
                      setHoveredNode({
                        chart: "graduation",
                        label: d.year,
                        value: `${d.masters} Masters, ${d.phd} PhD, ${d.postdocs} Postdocs completed`,
                        x: cx - 50,
                        y: cy - 35
                      });
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer hover:scale-150 transition-transform"
                  />
                );
              })}

              {/* Legend and bottom labeling */}
              <line x1="30" y1="215" x2="60" y2="215" stroke="#C9A84C" strokeWidth="3" />
              <text x="65" y="218" fill="#7A8898" fontSize="8" fontFamily="sans-serif">Masters</text>

              <line x1="120" y1="215" x2="150" y2="215" stroke="#22C55E" strokeWidth="2" strokeDasharray="3 1" />
              <text x="155" y="218" fill="#7A8898" fontSize="8" fontFamily="sans-serif">PhDs</text>

              <line x1="200" y1="215" x2="230" y2="215" stroke="#3B82F6" strokeWidth="2" />
              <text x="235" y="218" fill="#7A8898" fontSize="8" fontFamily="sans-serif">Postdocs</text>

              {/* Grad years indicators */}
              {graduationData.map((d, i) => {
                const cx = 30 + i * 90;
                return (
                  <text key={d.year} x={cx} y="202" fill="#7A8898" fontSize="8" textAnchor="middle" fontFamily="monospace">{d.year}</text>
                );
              })}

              {/* Hover Box tooltip */}
              {hoveredNode && hoveredNode.chart === "graduation" && (
                <g>
                  <rect
                    x={hoveredNode.x - 30}
                    y={hoveredNode.y - 12}
                    width="180"
                    height="28"
                    rx="6"
                    fill="#0A121E"
                    stroke="#C9A84C"
                    strokeWidth="1"
                    className="shadow-md"
                  />
                  <text
                    x={hoveredNode.x + 60}
                    y={hoveredNode.y + 6}
                    fill="white"
                    fontSize="8.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {hoveredNode.label}: {hoveredNode.value}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
