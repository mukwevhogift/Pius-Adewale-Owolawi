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
      <section className="min-h-screen bg-white p-4 md:px-16 py-20 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-blue-600 animate-spin mb-4"></i>
          <p className="text-gray-700">Loading education data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white py-24 overflow-hidden" id="education">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="ri-graduation-cap-line"></i>
            Academic Journey
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Education & Qualifications
          </h2>
          <p className="text-xl text-gray-600">
            A comprehensive academic journey spanning multiple continents and disciplines
          </p>
        </div>

        {/* Academic Degrees - Timeline Style */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="education-card group relative"
              >
                {/* Timeline Line */}
                {index !== educationData.length - 1 && (
                  <div className="hidden lg:block absolute left-[2.75rem] top-20 w-0.5 h-full bg-gradient-to-b from-blue-300 to-purple-300"></div>
                )}

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Icon & Year */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
                      <i className={`${edu.icon} text-4xl text-white`}></i>
                    </div>
                    <div className="mt-4 bg-gray-100 px-4 py-2 rounded-full">
                      <span className="text-gray-700 font-bold text-sm">
                        {edu.year_end ? `${edu.year_start}-${edu.year_end}` : edu.year_start}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 group-hover:border-blue-200 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                          <i className="ri-building-line text-lg"></i>
                          <p className="text-lg font-medium">{edu.institution}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="ri-map-pin-line text-sm"></i>
                          <p className="text-sm">{edu.country}</p>
                        </div>
                        {edu.specialization && (
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-semibold">Specialization:</span> {edu.specialization}
                          </p>
                        )}
                      </div>
                      <div className="hidden md:block">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                          <i className="ri-award-line text-2xl text-blue-600"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="certifications-section mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <i className="ri-medal-line"></i>
              Professional Development
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Certifications & Training
            </h3>
            <p className="text-lg text-gray-600">Industry-recognized credentials and specialized training</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="cert-badge group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl"></div>
                
                <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <i className="ri-medal-fill text-3xl text-white"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{cert.name}</h4>
                  <p className="text-sm text-purple-600 font-medium mb-1">{cert.issued_by}</p>
                  <p className="text-xs text-gray-500 font-semibold">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ongoing Studies - Featured */}
        <div className="relative max-w-5xl mx-auto mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-10 shadow-xl">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl">
                <i className="ri-book-open-fill text-5xl text-white"></i>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">Currently Pursuing</h3>
                  <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    <i className="ri-play-circle-fill mr-1"></i>
                    In Progress
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-green-700 mb-4">Bachelor of Laws (LLB)</h4>

                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-lg">
                    <i className="ri-building-fill text-blue-600"></i>
                    <p className="text-gray-700 font-medium">University of South Africa (UNISA)</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-lg">
                    <i className="ri-calendar-fill text-purple-600"></i>
                    <p className="text-gray-700 font-medium">2018 – Present</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  <span className="font-bold text-green-700">Specialization: </span>
                  Intellectual property, technology law, AI ethics, and cyber law
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "ri-graduation-cap-line", count: "6", label: "Academic Degrees", color: "blue" },
            { icon: "ri-medal-line", count: "8", label: "Certifications", color: "purple" },
            { icon: "ri-global-line", count: "4", label: "Countries", color: "green" },
            { icon: "ri-time-line", count: "25+", label: "Years Learning", color: "orange" }
          ].map((stat, idx) => (
            <div key={idx} className="group text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:-translate-y-2">
              <div className={`inline-flex w-14 h-14 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <div className={`text-5xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent mb-2`}>
                {stat.count}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
