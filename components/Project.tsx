"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/components/DataProvider";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { researchAreas, loading } = usePortfolioData();

  useEffect(() => {
    if (loading) return;

    gsap.from("#projects h2, #projects .section-badge", {
      y: 40,
      duration: 0.6,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".project-card", {
      y: 30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });
  }, [loading]);

  const industrialProjects = [
    { title: "Wireless Sensor Networks for Agriculture", funder: "AgriSETA", period: "2022–2025", icon: "ri-plant-line" },
    { title: "AI-Powered Smart Campus Platform", funder: "MICTSETA", period: "2021–2024", icon: "ri-building-line" },
    { title: "Drone Technology Training Programme", funder: "AgriSETA / TIA", period: "2023–2025", icon: "ri-drone-line" },
    { title: "IoT-Based Water Quality Monitoring", funder: "TIA", period: "2020–2023", icon: "ri-water-flash-line" },
    { title: "5G/6G Network Optimization Research", funder: "Industry Partners", period: "2023–2026", icon: "ri-signal-tower-line" },
    { title: "Computer Vision for Industrial QA", funder: "BANKSETA", period: "2022–2024", icon: "ri-eye-line" },
  ];

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
          <p className="text-white">Loading research areas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 md:py-28 px-4 md:px-8 lg:px-16 scroll-mt-24" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge inline-flex items-center gap-2 bg-white/10 text-blue-200 px-6 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <i className="ri-flask-line"></i>
            Research & Innovation
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 bebas-neue-regular">
            Research & Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Leading cutting-edge research across AI, wireless communications, renewable energy, and smart systems
          </p>
        </div>

        {researchAreas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {researchAreas.map((area, index) => {
              const projects = typeof area.projects === "string" ? JSON.parse(area.projects) : area.projects;
              return (
                <div key={area.id || index} className="project-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 cursor-default">
                  <div className={`w-14 h-14 bg-gradient-to-br ${area.color || 'from-blue-500 to-cyan-500'} rounded-2xl flex items-center justify-center mb-5`}>
                    <i className={`${area.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{area.title}</h3>
                  {area.description && <p className="text-gray-300 text-sm mb-4 leading-relaxed">{area.description}</p>}
                  {Array.isArray(projects) && projects.length > 0 && (
                    <div className="space-y-2">
                      {projects.slice(0, 3).map((project: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                          <i className="ri-arrow-right-s-line text-blue-400 mt-0.5 flex-shrink-0"></i>
                          <span>{project}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div>
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4 bebas-neue-regular">Featured Industrial Projects</h3>
            <p className="text-gray-400 text-lg">Funded research initiatives driving real-world impact</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrialProjects.map((project, index) => (
              <div key={index} className="project-card bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">{project.funder}</span>
                  <span className="text-gray-400 text-sm">{project.period}</span>
                </div>
                <div className="flex items-start gap-3">
                  <i className={`${project.icon} text-2xl text-blue-400 mt-1`}></i>
                  <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
