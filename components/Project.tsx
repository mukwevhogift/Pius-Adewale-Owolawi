"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { ResearchArea } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const { data } = await supabase
        .from("research_areas")
        .select("*")
        .order("order_index");

      if (data) setResearchAreas(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Auto-scroll on hover or auto-play on touch devices
  useEffect(() => {
    if ((!isHovering && !isTouchDevice) || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    const scrollSpeed = 1;

    const autoScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    // Auto-play on touch devices, hover-activated on desktop
    if (isTouchDevice || isHovering) {
      animationId = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isHovering, isTouchDevice]);

  useEffect(() => {
    if (loading || researchAreas.length === 0) return;

    gsap.from("#projects h2", {
      y: 50,
      duration: 0.1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#projects h2",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 3,
      },
    });

    gsap.from(".project-card", {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 70%",
      },
    });
  }, [loading, researchAreas]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
          <p className="text-white">Loading research areas...</p>
        </div>
      </section>
    );
  }

  const industrialProjects = [
    {
      title: "Agricultural Spraying Drone",
      category: "Smart Agriculture",
      status: "Completed",
      funding: "AgriSETA - R12.4M"
    },
    {
      title: "MICT SETA LMS Portal System",
      category: "Industry 4.0",
      status: "Active",
      funding: "MICTSETA - R1.98M"
    },
    {
      title: "AI-Driven Weed Detection System",
      category: "Smart Agriculture",
      status: "In Development",
      funding: "TUT National AI Institute"
    },
    {
      title: "Hybrid Renewable Energy for GSM Stations",
      category: "Green Technology",
      status: "Completed",
      funding: "GIZ-SAGEN - R2M"
    },
    {
      title: "Brain-Controlled Robot System",
      category: "AI & Robotics",
      status: "Active",
      funding: "TUT Research Fund"
    },
    {
      title: "Computer Vision Car Security System",
      category: "Computer Vision",
      status: "Completed",
      funding: "TIA - R150K"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12 md:py-16" id="projects">
      <div className="px-4 md:px-16 mb-8 md:mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-500 bebas-neue-regular text-white mb-3 md:mb-4">
          Research & Projects
        </h2>
        <p className="text-base md:text-xl text-gray-300 max-w-3xl mb-4 md:mb-6">
          Leading cutting-edge research across AI, wireless communications, renewable energy, and smart systems with over 200 peer-reviewed publications and R94M+ in secured funding.
        </p>
        <p className="text-xs md:text-sm text-blue-300 flex items-center gap-2">
          {isTouchDevice ? (
            <>
              <i className="ri-drag-move-line"></i>
              Auto-scrolling carousel - swipe to control
            </>
          ) : (
            <>
              <i className="ri-mouse-line"></i>
              Hover over the carousel to auto-scroll
            </>
          )}
        </p>
      </div>

      {/* Horizontal Scrolling Research Areas Carousel */}
      <div className="relative mb-12 md:mb-20">
        <div 
          ref={scrollRef}
          onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
          onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
          className="flex gap-4 md:gap-6 px-4 md:px-16 overflow-x-auto scrollbar-hide touch-pan-x"
          style={{ scrollBehavior: 'smooth' }}
        >
          {researchAreas.map((area, index) => {
            const projects = typeof area.projects === 'string' 
              ? JSON.parse(area.projects) 
              : area.projects;

            return (
              <div
                key={index}
                className="project-card min-w-[280px] sm:min-w-[350px] md:min-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-8 hover:bg-white/15 transition-all flex-shrink-0 active:scale-[0.98]"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${area.color} rounded-full flex items-center justify-center mb-4 md:mb-6`}>
                  <i className={`${area.icon} text-2xl md:text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 leading-tight">{area.title}</h3>
                <ul className="space-y-2 md:space-y-3">
                  {projects.map((project: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 md:gap-3 text-gray-200 text-sm md:text-base">
                      <i className="ri-arrow-right-s-line text-blue-300 text-lg md:text-xl mt-0.5 flex-shrink-0"></i>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {/* Duplicate items for seamless loop */}
          {researchAreas.map((area, index) => {
            const projects = typeof area.projects === 'string' 
              ? JSON.parse(area.projects) 
              : area.projects;

            return (
              <div
                key={`dup-${index}`}
                className="project-card min-w-[350px] md:min-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all flex-shrink-0"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-full flex items-center justify-center mb-6`}>
                  <i className={`${area.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">{area.title}</h3>
                <ul className="space-y-3">
                  {projects.map((project: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-200">
                      <i className="ri-arrow-right-s-line text-blue-300 text-xl mt-0.5 flex-shrink-0"></i>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Industrial Projects Grid */}
      <div className="px-4 md:px-16 mt-20">
        <h3 className="text-5xl font-bold text-white mb-8 bebas-neue-regular">
          Featured Industrial Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industrialProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'Completed' ? 'bg-green-500/30 text-green-200' :
                    project.status === 'Active' ? 'bg-yellow-500/30 text-yellow-200' :
                      'bg-purple-500/30 text-purple-200'
                  }`}>
                  {project.status}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <i className="ri-funds-line"></i>
                {project.funding}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Impact Stats */}
      <div className="px-4 md:px-16 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 text-center">
            <i className="ri-article-line text-5xl text-blue-300 mb-3"></i>
            <h4 className="text-4xl font-bold text-white mb-2">200+</h4>
            <p className="text-gray-300">Publications</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 rounded-xl p-6 text-center">
            <i className="ri-quote-text text-5xl text-purple-300 mb-3"></i>
            <h4 className="text-4xl font-bold text-white mb-2">2000+</h4>
            <p className="text-gray-300">Citations</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 rounded-xl p-6 text-center">
            <i className="ri-funds-box-line text-5xl text-green-300 mb-3"></i>
            <h4 className="text-4xl font-bold text-white mb-2">R94M+</h4>
            <p className="text-gray-300">Research Funding</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md border border-orange-400/30 rounded-xl p-6 text-center">
            <i className="ri-team-line text-5xl text-orange-300 mb-3"></i>
            <h4 className="text-4xl font-bold text-white mb-2">37+</h4>
            <p className="text-gray-300">Postgraduate Graduates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
