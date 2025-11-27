"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  useEffect(() => {
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
  }, []);

  const educationData = [
    {
      degree: "PhD in Electronic Engineering",
      institution: "University of KwaZulu-Natal (UKZN)",
      country: "South Africa",
      year: "2006 – 2010",
      specialization: "Advanced wireless communication, signal processing, and energy-aware systems",
      icon: "ri-graduation-cap-fill",
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      degree: "MSc in Electronic Engineering",
      institution: "University of KwaZulu-Natal (UKZN)",
      country: "South Africa",
      year: "2004 – 2006",
      specialization: "Telecommunications systems, electronic circuit design, and network optimisation",
      icon: "ri-medal-fill",
      color: "from-purple-600 to-pink-600",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      degree: "B.Tech (Hons) in Applied Physics/Electronics",
      institution: "Federal University of Technology, Akure",
      country: "Nigeria",
      year: "1996 – 2001",
      specialization: "Electronics, instrumentation, and embedded systems",
      icon: "ri-award-fill",
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      degree: "Advanced Diploma in Remote Engineering, Mechatronics & Robotics",
      institution: "Engineering Institute of Technology (EIT)",
      country: "Australia",
      year: "2015 – 2016",
      specialization: "Automation, remote control systems, and intelligent robotics",
      icon: "ri-robot-fill",
      color: "from-orange-600 to-red-600",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      degree: "PG Cert in AI & Machine Learning",
      institution: "University of Texas at Austin",
      country: "USA",
      year: "2019 – 2020",
      specialization: "Machine learning, deep learning, computer vision, and AI applications",
      icon: "ri-brain-fill",
      color: "from-indigo-600 to-purple-600",
      bgColor: "from-indigo-50 to-purple-50"
    },
    {
      degree: "PG Cert in Data Science & Business Analytics",
      institution: "University of Texas at Austin",
      country: "USA",
      year: "2020 – 2021",
      specialization: "Data analytics, predictive modelling, and data-driven business strategy",
      icon: "ri-bar-chart-fill",
      color: "from-teal-600 to-cyan-600",
      bgColor: "from-teal-50 to-cyan-50"
    }
  ];

  const certifications = [
    { name: "CCNP", full: "Cisco Certified Network Professional", icon: "ri-shield-check-fill" },
    { name: "CCNA", full: "Cisco Certified Network Associate", icon: "ri-shield-star-fill" },
    { name: "MCSE", full: "Microsoft Certified Systems Engineer", icon: "ri-windows-fill" },
    { name: "CWSP", full: "Certified Wireless Security Professional", icon: "ri-wifi-fill" },
    { name: "CWNA", full: "Certified Wireless Network Administrator", icon: "ri-signal-wifi-fill" },
    { name: "CFOS/D", full: "Certified Fibre Optic Design Specialist", icon: "ri-flashlight-fill" },
    { name: "CFOT", full: "Certified Fibre Optic Technician", icon: "ri-tools-fill" },
    { name: "Drone Pilot", full: "Remote Pilot Licence - SACAA", icon: "ri-flight-takeoff-fill" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:px-16 py-20" id="education">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-6xl md:text-7xl font-bold bebas-neue-regular text-white mb-4">
          Education & Qualifications
        </h2>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          A comprehensive academic journey spanning multiple continents and disciplines
        </p>
      </div>

      {/* Academic Degrees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-stretch">
        {educationData.map((edu, index) => (
          <div
            key={index}
            className="education-card group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 flex flex-col"
          >
            {/* Gradient Background Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${edu.bgColor} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>

            {/* Icon */}
            <div className={`relative w-16 h-16 bg-gradient-to-br ${edu.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <i className={`${edu.icon} text-3xl text-white`}></i>
            </div>

            {/* Year Badge */}
            <div className="absolute top-8 right-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-white font-semibold text-sm">{edu.year}</span>
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

              <div className="flex items-center gap-2 mb-4">
                <i className="ri-map-pin-line text-green-300"></i>
                <p className="text-green-200">{edu.country}</p>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-semibold text-blue-200">Focus: </span>
                  {edu.specialization}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Certifications */}
      <div className="certifications-section mb-16">
        <div className="text-center mb-6">
          <h3 className="text-5xl font-bold bebas-neue-regular text-white mb-3">
            Professional Certifications
          </h3>
          <p className="text-lg text-blue-200">Industry-recognized credentials and specialized training</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="cert-badge group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className={`${cert.icon} text-2xl text-white`}></i>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{cert.name}</h4>
                <p className="text-xs text-gray-300 leading-tight">{cert.full}</p>
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

export default Education;
