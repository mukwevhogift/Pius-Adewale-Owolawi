import React, { useState } from "react";
import { 
  Award, 
  BookOpen, 
  Map, 
  Compass, 
  Settings, 
  GraduationCap, 
  UserCheck, 
  CheckCircle,
  Clock,
  Sparkles,
  Eye,
  Heart,
  ChevronRight
} from "lucide-react";
import { FULL_BIOGRAPHY, CAREER_TIMELINE } from "../data.js";

export default function AboutSection() {
  const [selectedMilestone, setSelectedMilestone] = useState<typeof CAREER_TIMELINE[number] | null>(CAREER_TIMELINE[CAREER_TIMELINE.length - 1]);
  const [activeCategory, setActiveTab] = useState<'all' | 'academic' | 'award' | 'industry' | 'international'>('all');

  const filteredTimeline = CAREER_TIMELINE.filter(node => {
    if (activeCategory === 'all') return true;
    return node.category === activeCategory;
  });

  return (
    <div id="about-section" className="space-y-16 animate-in fade-in duration-300">
      
      {/* Biography Segment */}
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-blue-600 tracking-widest font-bold block">EXECUTIVE STORY</span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">The Journey of Prof. Pius Owolawi</h2>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-sans">
            {FULL_BIOGRAPHY.map((bio, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-sans text-base font-bold text-blue-600 flex items-center gap-2">
                  <span className="text-xs font-mono font-normal text-slate-400">{(index+1).toString().padStart(2, '0')}.</span>
                  {bio.title}
                </h3>
                <p>{bio.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Board & Quick Badges */}
        <div className="md:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
            <span className="font-mono text-[10px] text-blue-600 tracking-widest block font-bold">GLOBAL AMBITION</span>
            <h3 className="font-sans text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <Eye className="h-5 w-5 text-blue-600" />
              Vision Statement
            </h3>
            <p className="font-serif italic text-sm text-slate-800 leading-relaxed">
              "A world where advanced telecommunications, agricultural drones, and cognitive multi-agent networks are not luxuries of the wealthy — but tools of liberation and scale for every regional farmer, student, hospital, and enterprise across third-world and North American corridors."
            </p>
            <p className="text-xs text-slate-550 font-sans leading-relaxed">
              Envisioning a future where universities aren't merely passive consumers of global software, but are the primary architects of custom intelligent systems.
            </p>
          </div>

          {/* Quick Stats list */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block font-bold">Key Milestones Quicklist</span>
            <div className="space-y-3 font-sans text-xs">
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-800 font-semibold">ITU-R Standardisation Contributions</span>
                  <span className="text-slate-500">Rain attenuation and millimetre wave modelling referenced globally.</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-800 font-semibold">8 World-Class Laboratories Built</span>
                  <span className="text-slate-500">Equipped with high-end robotics, computing nodes, and EMC test cells.</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-800 font-semibold">National Research Chair Lead</span>
                  <span className="text-slate-500">Currently MICTSETA chair managing multimillion-rand platforms.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Career Timeline (Horizontal or vertical categorized timeline node browser) */}
      <div id="timeline-tracker" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Clock className="text-blue-600 h-5 w-5" />
              Chronological Career Timeline
            </h2>
            <p className="text-xs text-slate-500">Interactive milestones mapping B.Tech graduation to Assistant Dean (2001 - Present)</p>
          </div>

          {/* Filtering Timeline Nodes */}
          <div className="flex flex-wrap gap-1 bg-slate-100 rounded-lg p-1 text-xs">
            <button 
              onClick={() => setActiveTab('all')} 
              className={`rounded px-3 py-1 font-medium transition-all ${activeCategory === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-blue-600'}`}
            >
              All Events
            </button>
            <button 
              onClick={() => setActiveTab('academic')} 
              className={`rounded px-3 py-1 font-medium transition-all ${activeCategory === 'academic' ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Academic
            </button>
            <button 
              onClick={() => setActiveTab('award')} 
              className={`rounded px-3 py-1 font-medium transition-all ${activeCategory === 'award' ? 'bg-amber-50 border border-amber-200 text-amber-700' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Awards
            </button>
            <button 
              onClick={() => setActiveTab('industry')} 
              className={`rounded px-3 py-1 font-medium transition-all ${activeCategory === 'industry' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Industry
            </button>
            <button 
              onClick={() => setActiveTab('international')} 
              className={`rounded px-3 py-1 font-medium transition-all ${activeCategory === 'international' ? 'bg-purple-50 border border-purple-200 text-purple-700' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Global
            </button>
          </div>
        </div>

        {/* Timeline Slider browser */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 bg-slate-50 rounded-xl p-4 border border-slate-200 scrollbar-thin">
          {filteredTimeline.map((node) => {
            const isSelected = selectedMilestone?.year === node.year;
            
            // Color mapping based on node configuration
            const colorClass = node.category === 'academic' ? 'border-blue-200 hover:bg-blue-50 text-blue-600' :
                               node.category === 'award' ? 'border-amber-200 hover:bg-amber-50 text-amber-600' :
                               node.category === 'industry' ? 'border-emerald-200 hover:bg-emerald-50 text-emerald-600' :
                               'border-purple-200 hover:bg-purple-50 text-purple-600';

            const activeColorBg = node.category === 'academic' ? 'bg-blue-600 text-white' :
                                  node.category === 'award' ? 'bg-amber-600 text-white' :
                                  node.category === 'industry' ? 'bg-emerald-600 text-white' :
                                  'bg-purple-600 text-white';

            return (
              <button
                key={node.year}
                onClick={() => setSelectedMilestone(node)}
                className={`shrink-0 flex flex-col items-center gap-1 border rounded-lg px-4 py-3 min-w-[110px] text-center font-mono text-xs transition-all pointer-events-auto select-none duration-150 relative ${
                  isSelected ? `${activeColorBg} scale-105 border-transparent shadow` : `bg-white ${colorClass}`
                }`}
              >
                <span className="font-bold text-sm tracking-tight">{node.year}</span>
                <span className="text-[10px] uppercase font-semibold">{node.category}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone display card */}
        {selectedMilestone && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-inner mt-4 animate-in fade-in duration-200">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between font-sans">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-blue-600">{selectedMilestone.year}</span>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-slate-200 text-slate-700 border border-slate-300 px-2 py-0.5 rounded">
                  {selectedMilestone.category} Milestone
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">Tshwane University of Technology Chronology</span>
            </div>
            <h4 className="mt-2 text-base font-bold text-slate-900 font-sans">{selectedMilestone.milestone}</h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-sans">{selectedMilestone.details}</p>
          </div>
        )}
      </div>

      {/* 3. Core Philosophies (Leadership, Teaching, Research) with Accordion focus */}
      <div id="philosophies" className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Sparkles className="text-blue-600 h-5 w-5" />
            Core Academic & Executive Leadership Philosophies
          </h2>
          <p className="text-xs text-slate-500">The fundamental guiding pillars that drive my institutional building and student guidance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Leadership */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 relative group hover:border-blue-400 transition-all shadow-xs hover:shadow-md">
            <div className="rounded bg-blue-50 border border-blue-100 p-2.5 text-blue-600 w-max">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">1. Leadership Philosophy</h3>
            <p className="font-serif italic text-xs text-slate-800">
              "If you want to win in the 21st century, you have to empower others, making sure other people are better than you. Then you will be successful." — Jack Ma
            </p>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Underpinning my approach to institutional building is recruitment and aggressive upskilling of research talent, setting up automated infrastructure, and allowing experts clean paths to execute without administrative noise.
            </p>
          </div>

          {/* Teaching */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 relative group hover:border-blue-400 transition-all shadow-xs hover:shadow-md">
            <div className="rounded bg-blue-50 border border-blue-100 p-2.5 text-blue-600 w-max">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">2. Teaching Philosophy</h3>
            <p className="font-serif italic text-xs text-slate-800">
              "I hear and I forget. I see and I remember. I do and I understand." — Ancient Maxim
            </p>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              My labs are active spaces of engineering construction. Students are not passive recipients of curriculum notation; they are builders of projects, solvers of real problems, and defenders of strategic scientific ideas.
            </p>
          </div>

          {/* Research */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 relative group hover:border-blue-400 transition-all shadow-xs hover:shadow-md">
            <div className="rounded bg-blue-50 border border-blue-100 p-2.5 text-blue-600 w-max">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">3. Research Philosophy</h3>
            <p className="font-serif italic text-xs text-slate-800">
              "If we knew what it was we were doing, it would not be called research, would it?" — Albert Einstein
            </p>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Research is curiosity oriented towards problems that, when solved, change conditions on the ground. Whether setting satellite links or YOLO drone spray models, our research translates directly to community economic empowerment.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
