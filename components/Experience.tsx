"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useEffect(() => {
    const experiences = document.querySelectorAll(".experience");

    experiences.forEach((experience) => {
      experience.addEventListener("click", () => {
        experiences.forEach((exp) => exp.classList.remove("active"));
        experience.classList.add("active");
      });
    });

    gsap.from("#experience h2", {
      y: 50,
      duration: 0.1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#experience h2",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 3,
      },
    });

    gsap.from(".experience", {
      y: 50,
      duration: 0.3,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#experience h2",
        start: "top 60%",
        end: "bottom 90%",
        scrub: 3,
      },
    });
  }, []);

  const experiences = [
    {
      title: "Assistant Dean: Industry Liaison, Special Projects & WIL",
      organization: "Tshwane University of Technology",
      period: "February 2025 – Present",
      description: "Leading strategic academic-industry partnerships, national skills development programmes including drone training and AI-infused agriculture, and faculty-wide Work-Integrated Learning initiatives with SETAs, industry, and public sector entities.",
      highlights: [
        "Spearheading SETA collaborations and curriculum innovation",
        "Managing high-impact national programmes in 4IR-aligned professions",
        "Coordinating drone training for 100 learners (R12.4M AgriSETA funding)"
      ]
    },
    {
      title: "MICTSETA Research Chair in 4IR Skills Development",
      organization: "Tshwane University of Technology",
      period: "2022 – Present",
      description: "Leading the national MICTSETA-funded Research Chair on 4IR Skills Development, overseeing strategic research, postgraduate student mentorship, and development of integrated platforms.",
      highlights: [
        "Managing R10.6M+ in research funding",
        "Developing LMS, Career Hubs, and E-Learning solutions",
        "Supervising 17 postgraduate students and multiple research projects"
      ]
    },
    {
      title: "Research Lead: AI in Agriculture",
      organization: "National AI Institute & TUT",
      period: "2023 – Present",
      description: "Serving as principal investigator in AI-Driven Smart Agriculture, driving applied AI research projects for precision agriculture, farm automation, and food security.",
      highlights: [
        "Supporting SMMEs and rural innovation through AI deployments",
        "Supervising AI-based crop monitoring and UAV-assisted farming projects",
        "Engaging with academia, government, and agri-tech industries"
      ]
    },
    {
      title: "Head of Department: Computer Systems Engineering",
      organization: "Tshwane University of Technology",
      period: "April 2017 – January 2025",
      description: "Provided academic and operational leadership, including curriculum renewal, faculty development, and programme accreditation. Established the Emerging IIoT Laboratory.",
      highlights: [
        "Secured R46M+ in funding for WIL, research, and capacity-building",
        "Contributed 75%+ of annual faculty research outputs",
        "Established multiple postgraduate programmes and advanced laboratories"
      ]
    },
    {
      title: "Acting/Head of Department: Electrical Engineering",
      organization: "Mangosuthu University of Technology",
      period: "2012 – March 2016",
      description: "Championed curriculum modernization and ECSA programme accreditations. Established the first EMC/EMI laboratory and launched advanced communication systems training.",
      highlights: [
        "Attracted R7M+ in infrastructure and training equipment",
        "Pioneered industry collaborations with ESKOM, SA Navy, and TRANSNET",
        "Initiated mentorship programmes and skills development strategies"
      ]
    },
    {
      title: "Managing Director",
      organization: "West Wood Industrial Technology",
      period: "2016 – Present",
      description: "Founded and manage a multinational engineering firm operating in industrial automation, oil & gas, and agricultural technology across Nigeria, South Africa, and USA.",
      highlights: [
        "Overseeing strategic innovation projects and system integration",
        "Managing global technical operations and partnerships",
        "Delivering solutions in automation and agri-tech"
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:px-16 py-16" id="experience">
      <h2 className="text-7xl font-500 mb-12 bebas-neue-regular text-white">
        Leadership & Experience
      </h2>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="experience bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 cursor-pointer hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                  {exp.title}
                </h3>
                <p className="text-xl text-blue-300 font-medium">{exp.organization}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="inline-block bg-blue-500/30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                  {exp.period}
                </span>
              </div>
            </div>

            <div className="experience-description">
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                {exp.description}
              </p>
              <div className="space-y-2">
                <p className="text-blue-300 font-semibold mb-2">Key Achievements:</p>
                {exp.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-green-400 text-xl mt-1"></i>
                    <p className="text-gray-300">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
