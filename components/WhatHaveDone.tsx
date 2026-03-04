"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/components/DataProvider";

gsap.registerPlugin(ScrollTrigger);

const WhatHaveDone = () => {
  const { achievements, certifications, loading } = usePortfolioData();

  useEffect(() => {
    if (loading) return;

    gsap.from("#what-done h2, #what-done .section-badge", {
      y: 40,
      duration: 0.6,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#what-done",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".achievement-card", {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      scrollTrigger: {
        trigger: "#what-done",
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".cert-card", {
      y: 30,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".certifications-grid",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [loading]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
          <p className="text-white">Loading achievements...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 md:py-28 px-4 md:px-8 lg:px-16 scroll-mt-24" id="what-done">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge inline-flex items-center gap-2 bg-white/10 text-blue-200 px-6 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <i className="ri-trophy-line"></i>
            Key Achievements
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 bebas-neue-regular">
            Key Achievements
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A legacy of excellence in research, teaching, and community impact
          </p>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {achievements.map((achievement, index) => {
              const details = typeof achievement.details === "string"
                ? JSON.parse(achievement.details)
                : achievement.details;

              return (
                <div key={achievement.id || index} className="achievement-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 cursor-default">
                  <div className={`w-14 h-14 bg-gradient-to-br ${achievement.color || 'from-blue-500 to-purple-500'} rounded-2xl flex items-center justify-center mb-5`}>
                    <i className={`${achievement.icon} text-2xl text-white`}></i>
                  </div>
                  {achievement.count && (
                    <div className="text-4xl font-bold text-white mb-2">{achievement.count}</div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3">{achievement.title}</h3>
                  {Array.isArray(details) && details.length > 0 && (
                    <ul className="space-y-2">
                      {details.slice(0, 4).map((detail: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                          <i className="ri-checkbox-circle-fill text-green-400 mt-0.5 flex-shrink-0"></i>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 mb-20">
            <i className="ri-trophy-line text-6xl text-white/30 mb-4"></i>
            <p className="text-white/60 text-lg">No achievements data available</p>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="certifications-grid">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-white mb-4">Certifications & Training</h3>
              <p className="text-lg text-gray-400">Industry-recognized credentials and specialized training</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="cert-card bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 text-center cursor-default">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <i className="ri-medal-fill text-2xl text-white"></i>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 line-clamp-2">{cert.name}</h4>
                  <p className="text-sm text-purple-300 font-medium mb-1">{cert.issued_by}</p>
                  <p className="text-xs text-gray-400 font-semibold">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatHaveDone;
