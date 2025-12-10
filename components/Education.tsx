"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { EducationItem, CertificationItem } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const [educationData, setEducationData] = useState<EducationItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const [eduResponse, certResponse] = await Promise.all([
        supabase.from("education").select("*").order("order_index"),
        supabase.from("certifications").select("*").order("order_index"),
      ]);

      if (eduResponse.data) setEducationData(eduResponse.data);
      if (certResponse.data) setCertifications(certResponse.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    gsap.from("#education h2", {
      y: 50,
      duration: 0.1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#education h2",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 3,
      },
    });

    gsap.from(".education-card", {
      y: 80,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#education",
        start: "top 70%",
        end: "bottom 90%",
        scrub: 2,
      },
    });

    gsap.from(".cert-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".certifications-section",
        start: "top 80%",
        end: "bottom 90%",
        scrub: 1,
      },
    });
  }, [loading]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:px-16 py-20 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
          <p className="text-white">Loading education data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:px-16 py-20" id="education">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-6xl md:text-7xl font-bold bebas-neue-regular text-white mb-4">
          Education & Qualifications
        </h2>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          A comprehensive academic journey spanning multiple continents and disciplines
        </p>
      </div>

      {/* Academic Degrees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 items-stretch">
        {educationData.map((edu, index) => (
          <div
            key={index}
            className="education-card group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 flex flex-col"
          >
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300"></div>

            {/* Icon */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-graduation-cap-line text-3xl text-white"></i>
            </div>

            {/* Year Badge */}
            <div className="absolute top-8 right-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-white font-semibold text-sm">
                  {edu.year}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-3 pr-24">
                {edu.degree}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <i className="ri-building-line text-blue-300"></i>
                <p className="text-lg text-blue-200 font-medium">{edu.institution}</p>
              </div>

              {edu.description && (
                <div className="pt-4 border-t border-white/20 mt-4">
                  <p className="text-sm text-gray-300 leading-relaxed">{edu.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Professional Certifications */}
      <div className="certifications-section mb-16">
        <div className="text-center mb-8">
          <h3 className="text-5xl font-bold bebas-neue-regular text-white mb-3">
            Professional Certifications
          </h3>
          <p className="text-lg text-blue-200">Industry-recognized credentials and specialized training</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="cert-badge group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="ri-medal-line text-2xl text-white"></i>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{cert.title}</h4>
                <p className="text-sm text-purple-200 mb-1">{cert.issuer}</p>
                <p className="text-xs text-gray-300">{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Studies - Featured */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl"></div>
        <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className="ri-book-open-fill text-4xl text-white"></i>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-3xl font-bold text-white">Currently Pursuing</h3>
                <span className="bg-green-500/30 text-green-200 px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                  In Progress
                </span>
              </div>

              <h4 className="text-2xl font-bold text-green-200 mb-2">Bachelor of Laws (LLB)</h4>

              <div className="flex flex-wrap items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <i className="ri-building-line text-blue-300"></i>
                  <p className="text-blue-200">University of South Africa (UNISA)</p>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-calendar-line text-purple-300"></i>
                  <p className="text-purple-200">2018 – Present</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                <span className="font-semibold text-green-200">Specialization: </span>
                Intellectual property, technology law, AI ethics, and cyber law
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">6</div>
          <p className="text-blue-200">Academic Degrees</p>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">8</div>
          <p className="text-purple-200">Certifications</p>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">4</div>
          <p className="text-green-200">Countries</p>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">25+</div>
          <p className="text-orange-200">Years Learning</p>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
