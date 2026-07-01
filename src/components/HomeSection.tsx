import React, { useState } from "react";
import { 
  ArrowRight, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  FileText,
  Sparkles,
  Award,
  Video,
  Play,
  Heart,
  ChevronRight,
  TrendingUp,
  Cpu,
  BookOpen
} from "lucide-react";
import { BIOGRAPHY_SUMMARY, PROJECTS } from "../data.js";
// @ts-ignore
import profileImage from "@/assets/img/3.png";

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div id="home-section" className="space-y-16 animate-in fade-in duration-300">
      
      {/* 1. Breathtaking Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-md">
        {/* Subtle geometric grid background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-60"></div>
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        
        <div className="relative z-10 grid gap-8 md:grid-cols-12 items-center">
          {/* Left Column: Portrait and Status Tags */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative group">
              {/* Gold pulsing ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-500 opacity-75 blur-md group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              
              {/* Profile Wrapper (Displays real picture 3.png or highly polished mock fallback) */}
              <div className="relative h-64 w-52 overflow-hidden rounded-2xl bg-slate-100 border-2 border-blue-600 flex flex-col justify-between text-center group">
                {!imageError ? (
                  <div className="absolute inset-0 h-full w-full">
                    <img
                      src={profileImage}
                      alt="Prof. Pius Adewale Owolawi"
                      className="h-full w-full object-cover rounded-2xl"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                    {/* Elegant overlay for name readability */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent p-3 text-center">
                      <span className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">Prof. Pius</span>
                      <span className="block text-[8px] font-mono text-slate-700 uppercase">Adewale Owolawi</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between h-full p-4">
                    <div className="w-full flex justify-between items-center text-[10px] font-mono text-blue-600">
                      <span>SACAA: RPL-Drone</span>
                      <span>TUT-ICT</span>
                    </div>
                    <div className="my-auto flex flex-col items-center justify-center space-y-3">
                      <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-200">
                        <Cpu className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <span className="block text-xs font-mono font-bold text-slate-850 uppercase tracking-wider">Prof. Pius</span>
                        <span className="block text-[10px] font-mono text-slate-550 uppercase">Adewale Owolawi</span>
                      </div>
                    </div>
                    <div className="rounded bg-blue-50 border border-blue-250 py-1 px-1.5 text-[9px] font-mono text-blue-700">
                      Dual US & SA Resident
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-mono text-emerald-700 border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Strategy Group
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider text-center">Tshwane University of Technology</span>
            </div>
          </div>

          {/* Right Column: Titles, Headlines, and Buttons */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest block">EXECUTIVE PORTFOLIO</span>
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:leading-tight leading-snug">
                Prof. Pius Adewale Owolawi
              </h1>
              <p className="font-sans text-md font-semibold text-blue-700 leading-relaxed">
                Enterprise AI &amp; Digital Transformation Executive | AI Strategy | Agentic AI | Cloud AI | Innovation Leadership | Engineering | Research Commercialisation
              </p>
            </div>

            <p className="font-sans text-sm text-slate-600 leading-relaxed max-w-xl">
              Leading the Future of Artificial Intelligence, Workforce Development, Smart Agriculture, Telecommunications, Digital Education and Industry 4.0 — Across Africa, the United States, and the World.
            </p>

            {/* Structured Executive CTAs - All 5 remaining Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 pt-3">
              <button
                onClick={() => onNavigate("research")}
                className="flex items-center justify-between rounded bg-blue-600 px-3.5 py-2 text-xs font-mono font-bold text-white hover:bg-blue-700 active:scale-95 transition-all text-left"
              >
                <span>RESEARCH PORTFOLIO</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-1.5" />
              </button>
              
              <button
                onClick={() => onNavigate("partners")}
                className="flex items-center justify-between rounded border border-blue-600 bg-white px-3.5 py-2 text-xs font-mono font-bold text-blue-600 hover:bg-blue-50 active:scale-95 transition-all text-left"
              >
                <span>PARTNER WITH ME</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 ml-1.5" />
              </button>

              <button
                onClick={() => onNavigate("consulting")}
                className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition-all text-left"
              >
                <span>BOOK SPEAKING</span>
                <Calendar className="h-3.5 w-3.5 shrink-0 ml-1.5 text-blue-600" />
              </button>

              <button
                onClick={() => onNavigate("consulting")}
                className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition-all text-left"
              >
                <span>ADVISORY SUITE</span>
                <Briefcase className="h-3.5 w-3.5 shrink-0 ml-1.5 text-blue-600" />
              </button>

              <button
                onClick={() => onNavigate("mentorship")}
                className="flex items-center justify-between rounded border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-mono font-bold text-emerald-700 hover:bg-emerald-100 transition-all text-left"
              >
                <span>STUDENT PORTAL</span>
                <GraduationCap className="h-3.5 w-3.5 shrink-0 ml-1.5 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Short Executive Biography Summary */}
      <div id="section-bio" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-12 items-start">
          <div className="md:col-span-8 space-y-4">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span className="h-1 w-6 bg-blue-600 rounded block"></span>
              Who is Prof. Pius Owolawi?
            </h2>
            <div className="font-sans text-sm text-slate-600 leading-relaxed space-y-4">
              <p>{BIOGRAPHY_SUMMARY}</p>
              <p>
                Recognised consistently among Africa's Top 500 Researchers (2015–2021), an Ivy-League Brown University BIARI Fellow (2013), and a multiple-grant awardee of high-impact boards, Prof. Owolawi is a unique blend of high-caliber scientist, national skills architect, and entrepreneur. He bridges continental African opportunities directly with first-world advanced academic networks.
              </p>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("about")}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 hover:underline"
              >
                READ FULL BIOGRAPHY JOURNEY <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Call-out Pull Quote inside bio */}
          <div className="md:col-span-4 border-l-4 border-blue-600 pl-4 py-2 space-y-3 bg-blue-50/50 rounded-r-lg">
            <span className="font-serif italic text-lg text-slate-850 leading-snug block">
              "A research entrepreneur, an institution builder, a national programme architect, and a global innovation leader — now actively pursuing impactful senior leadership roles in AI, R&D, and digital transformation in the United States and globally."
            </span>
            <span className="block text-[10px] font-mono text-slate-500 uppercase">
              — Executive Summary Profile
            </span>
          </div>
        </div>
      </div>

      {/* 3. Featured Expertise Areas (6 Cards Grid) */}
      <div id="expertise-areas" className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900">Featured Expertise Areas</h2>
          <p className="text-xs text-slate-500">Deep scientific competence combined with commercial and public development execution</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: AI */}
          <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="rounded bg-blue-50 p-2 text-blue-600">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">01 / AI Research</span>
            </div>
            <h3 className="mt-4 font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Artificial Intelligence</h3>
            <ul className="mt-2 text-xs text-slate-600 space-y-1 font-mono">
              <li>• Agentic AI & Multi-Agent Systems</li>
              <li>• Generative AI & Large Language Models</li>
              <li>• Computer Vision & Deep Learning</li>
            </ul>
            <button 
              onClick={() => onNavigate("research")}
              className="mt-4 flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-600 hover:underline"
            >
              Explore AI Research <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Card 2: Workforce */}
          <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="rounded bg-blue-50 p-2 text-blue-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">02 / Professional</span>
            </div>
            <h3 className="mt-4 font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Workforce Development</h3>
            <ul className="mt-2 text-xs text-slate-600 space-y-1 font-mono">
              <li>• 4IR Regional Skills Frameworks</li>
              <li>• Work-Integrated Learning Models</li>
              <li>• Corporate Digital Transformation</li>
            </ul>
            <button 
              onClick={() => onNavigate("partners")}
              className="mt-4 flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-600 hover:underline"
            >
              Explore WIL Work <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Card 3: Smart Agri */}
          <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="rounded bg-blue-50 p-2 text-blue-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">03 / Precision Tech</span>
            </div>
            <h3 className="mt-4 font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Smart Agriculture & Agritech</h3>
            <ul className="mt-2 text-xs text-slate-600 space-y-1 font-mono">
              <li>• UAV Smart Crop Spraying Systems</li>
              <li>• Computer Vision Crop Pathology</li>
              <li>• IoT Micro-Irrigation Controls</li>
            </ul>
            <button 
              onClick={() => onNavigate("ventures")}
              className="mt-4 flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-600 hover:underline"
            >
              Explore Agritech Projects <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Card 4: Telecom */}
          <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="rounded bg-blue-50 p-2 text-blue-600">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">04 / Telecommunications</span>
            </div>
            <h3 className="mt-4 font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Telecommunications & 5G/6G</h3>
            <ul className="mt-2 text-xs text-slate-600 space-y-1 font-mono">
              <li>• Rain Attenuation Propagation Models</li>
              <li>• Free Space Optical (FSO) Links</li>
              <li>• Intelligent Reflecting Surfaces</li>
            </ul>
            <button 
              onClick={() => onNavigate("research")}
              className="mt-4 flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-600 hover:underline"
            >
              Explore Telecom Research <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Card 5: Edtech */}
          <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="rounded bg-blue-50 p-2 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">05 / Education</span>
            </div>
            <h3 className="mt-4 font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Education Technology</h3>
            <ul className="mt-2 text-xs text-slate-600 space-y-1 font-mono">
              <li>• LMS Platform Architectural Designs</li>
              <li>• AI-driven Career Hub Classrooms</li>
              <li>• StudyFlix Video-based STEM tools</li>
            </ul>
            <button 
              onClick={() => onNavigate("ventures")}
              className="mt-4 flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-600 hover:underline"
            >
              Explore EdTech Ventures <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Card 6: Research Chair */}
          <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="rounded bg-blue-50 p-2 text-blue-600">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">06 / Executive Chair</span>
            </div>
            <h3 className="mt-4 font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Research Leadership</h3>
            <ul className="mt-2 text-xs text-slate-600 space-y-1 font-mono">
              <li>• National Research Chair Management</li>
              <li>• Multimillion-rand Grant Writing (R94M)</li>
              <li>• High-yield Academic Mentoring (30+)</li>
            </ul>
            <button 
              onClick={() => onNavigate("research")}
              className="mt-4 flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-600 hover:underline"
            >
              Explore Research Impact <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Professional Introduction Video Script/Outline Option */}
      <div id="intro-video-container" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="font-sans text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Video className="text-blue-600 h-5 w-5" />
              Professional Introduction Video
            </h2>
            <p className="text-xs text-slate-500">3 to 5 minutes synopsis recorded in the 4IR Innovation Lab</p>
          </div>
          <span className="text-xs font-mono text-blue-600 bg-blue-50 border border-blue-200 rounded px-2.5 py-1">
            Vimeo Embed Configured
          </span>
        </div>

        {/* Video Screen visual layout */}
        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl bg-black border border-slate-200 overflow-hidden flex items-center justify-center group shadow-xl">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800')" }} />
          
          {/* Mock Player HUD */}
          <div className="absolute z-10 flex flex-col items-center text-center px-4 space-y-4">
            <button className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-2xl pl-1">
              <Play className="h-8 w-8 fill-white text-white" />
            </button>
            <div>
              <span className="block text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">PREVIEW SCRIPT INTEGRATED</span>
              <span className="block text-[11px] text-slate-500 mt-1 max-w-md">Click above to play the introductory presentation, illustrating my journey from Nigeria to South Africa as an academic builder.</span>
            </div>
          </div>
        </div>

        {/* Suggested Outline Transcript Accordion */}
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 space-y-3">
          <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block font-bold">Suggested Video Script Highlights</span>
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="space-y-1 border-l-2 border-slate-200 pl-3 py-1">
              <span className="text-blue-600 font-semibold font-mono block">0:00 – 0:30 | Purpose</span>
              <p className="text-slate-600">"My name is Prof. Pius Owolawi. I'm an engineer, researcher, and educator who believes advanced technology must solve real problems for real people on the ground."</p>
            </div>
            <div className="space-y-1 border-l-2 border-slate-200 pl-3 py-1">
              <span className="text-blue-600 font-semibold font-mono block">0:30 – 1:30 | Background</span>
              <p className="text-slate-600">A journey spanning FUTA Nigeria to building MUT and TUT academic labs, securing $5M+ and publishing over 200 papers globally.</p>
            </div>
            <div className="space-y-1 border-l-2 border-slate-200 pl-3 py-1">
              <span className="text-blue-600 font-semibold font-mono block">1:30 – 3:00 | Active Pillars</span>
              <p className="text-slate-600">Active projects like AgriSETA drone programs (R12.4M), MICTSETA 4IR Chair platforms, and StudyFlix video engines.</p>
            </div>
            <div className="space-y-1 border-l-2 border-slate-200 pl-3 py-1">
              <span className="text-blue-600 font-semibold font-mono block">3:00 – 5:00 | Core Vision</span>
              <p className="text-slate-600">"I believe Africa is becoming a global technology architect. Join me in partnership, research, speaking, or strategy development."</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BONUS SECTION: "Why Work With Prof. Pius Owolawi?" (Highest-Converting Element!) */}
      <div id="section-why" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="font-mono text-xs text-blue-600 tracking-widest font-bold uppercase">VALUE ALIGNMENT PROPOSITION</span>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900 mb-2">Why Work With Prof. Pius Owolawi?</h2>
          <p className="text-xs text-slate-500 leading-relaxed">Providing elite bridging solutions for global institutions, governments, tech corporations, investors, and postgraduate students.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 text-xs font-sans">
          {/* Universities */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div>
              <span className="font-mono text-blue-600 uppercase tracking-wider block font-bold mb-2">For Universities</span>
              <p className="text-slate-600 leading-relaxed">Dean, Provost, and VP research support with a track record of establishing 8 state-of-the-art tech labs and managing accredited departments.</p>
            </div>
            <button 
              onClick={() => onNavigate("mentorship")} 
              className="text-[10px] font-mono text-blue-600 float-bottom hover:underline font-bold mt-4 flex items-center"
            >
              Academic Roles <ChevronRight className="h-3 w-3 shrink-0 ml-1" />
            </button>
          </div>

          {/* Government */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div>
              <span className="font-mono text-blue-600 uppercase tracking-wider block font-bold mb-2">For Government</span>
              <p className="text-slate-600 leading-relaxed">Authoring national 4IR qualifications, managing complex SETA programs (R94M secured value), and executing audit-perfect reporting metrics.</p>
            </div>
            <button 
              onClick={() => onNavigate("partners")} 
              className="text-[10px] font-mono text-blue-600 float-bottom hover:underline font-bold mt-4 flex items-center"
            >
              Policy & Strategy <ChevronRight className="h-3 w-3 shrink-0 ml-1" />
            </button>
          </div>

          {/* Industry */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div>
              <span className="font-mono text-blue-600 uppercase tracking-wider block font-bold mb-2">For Industry</span>
              <p className="text-slate-600 leading-relaxed">Providing direct access to a premium pipeline of 50+ hand-guided postgraduate researchers on AI, IoT, and telecommunications.</p>
            </div>
            <button 
              onClick={() => onNavigate("consulting")} 
              className="text-[10px] font-mono text-blue-600 float-bottom hover:underline font-bold mt-4 flex items-center"
            >
              Strategic Alliances <ChevronRight className="h-3 w-3 shrink-0 ml-1" />
            </button>
          </div>

          {/* Investors */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div>
              <span className="font-mono text-blue-600 uppercase tracking-wider block font-bold mb-2">For Investors</span>
              <p className="text-slate-600 leading-relaxed">Commercializing deep Edtech (StudyFlix STEM tool) and Precision Agricultural Drone projects ready to hit Sub-Saharan scale.</p>
            </div>
            <button 
              onClick={() => onNavigate("ventures")} 
              className="text-[10px] font-mono text-blue-600 float-bottom hover:underline font-bold mt-4 flex items-center"
            >
              Seed Ventures <ChevronRight className="h-3 w-3 shrink-0 ml-1" />
            </button>
          </div>

          {/* Students */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div>
              <span className="font-mono text-blue-600 uppercase tracking-wider block font-bold mb-2">For Students</span>
              <p className="text-slate-600 leading-relaxed">Rigorous, encouraging guidance with an outstanding 100% completion rate for active candidates under my wing.</p>
            </div>
            <button 
              onClick={() => onNavigate("mentorship")} 
              className="text-[10px] font-mono text-blue-600 float-bottom hover:underline font-bold mt-4 flex items-center"
            >
              Join Research Lab <ChevronRight className="h-3 w-3 shrink-0 ml-1" />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
