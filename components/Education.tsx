"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/components/DataProvider";

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const { education: educationData, loading } = usePortfolioData();

  useEffect(() => {
    if (loading) return;

    gsap.from("#education h2, #education .section-badge", {
      y: 40,
      duration: 0.6,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#education",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".education-card", {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.12,
      scrollTrigger: {
        trigger: "#education",
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });
  }, [loading]);

  if (loading) {
    return (
      <section className="py-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-blue-600 animate-spin mb-4"></i>
          <p className="text-gray-700">Loading education data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden scroll-mt-24" id="education">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <div className="section-badge inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="ri-graduation-cap-line"></i>
            Academic Journey
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Education & Qualifications
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A distinguished academic career spanning multiple continents and decades of excellence
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {educationData.map((edu, index) => (
            <div key={edu.id || index} className="education-card flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-20 h-20 bg-gradient-to-br ${edu.color || 'from-blue-500 to-purple-600'} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <i className={`${edu.icon} text-3xl text-white`}></i>
                </div>
                <div className="mt-3 bg-gray-100 px-4 py-2 rounded-full">
                  <span className="text-gray-900 font-extrabold text-base">
                    {edu.year_end ? `${edu.year_start}–${edu.year_end}` : edu.year_start}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">{edu.degree}</h3>
                  {edu.is_ongoing && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-blue-600 font-semibold text-lg mb-2">{edu.institution}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="ri-map-pin-line"></i>
                    {edu.country}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-700">Specialization:</span> {edu.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
