"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatHaveDone = () => {
  useEffect(() => {
    gsap.from("#what-done h2", {
      y: 50,
      duration: 0.1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#what-done h2",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 3,
      },
    });

    const doneContainer = document.querySelector(".done-container");

    if (doneContainer) {
      const scrollWidth = doneContainer.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(doneContainer, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: "#what-done",
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }
  }, []);

  const achievements = [
    {
      title: "Postgraduate Supervision",
      count: "37+",
      icon: "ri-graduation-cap-line",
      color: "from-blue-500 to-cyan-500",
      details: [
        "29 Master's graduates",
        "8 PhD graduates",
        "13 active postdoctoral fellows",
        "14 ongoing PhD candidates"
      ]
    },
    {
      title: "Research Funding Secured",
      count: "R94M+",
      icon: "ri-funds-box-line",
      color: "from-green-500 to-emerald-500",
      details: [
        "MICTSETA: R10.6M+",
        "WIL Funding: R55.4M+",
        "Innovation & Seed: R8.2M+",
        "AgriSETA: R12.4M+"
      ]
    },
    {
      title: "Publications & Citations",
      count: "200+",
      icon: "ri-article-line",
      color: "from-purple-500 to-pink-500",
      details: [
        "200+ peer-reviewed papers",
        "2000+ citations",
        "Top 500 African Researchers",
        "Multiple best paper awards"
      ]
    },
    {
      title: "Laboratories Established",
      count: "10+",
      icon: "ri-flask-line",
      color: "from-orange-500 to-red-500",
      details: [
        "4IR Innovation Lab",
        "Drone Technology Lab",
        "AI & ML Lab",
        "EMC/EMI Testing Facility"
      ]
    },
    {
      title: "International Collaborations",
      count: "25+",
      icon: "ri-global-line",
      color: "from-indigo-500 to-purple-500",
      details: [
        "USA: UT Austin, Brown University",
        "Canada: Memorial University",
        "Australia: EIT",
        "Multiple African institutions"
      ]
    },
    {
      title: "Awards & Recognition",
      count: "15+",
      icon: "ri-trophy-line",
      color: "from-yellow-500 to-orange-500",
      details: [
        "Top 500 African Researchers",
        "Senior Researcher (2x)",
        "Most Outstanding Researcher (3x)",
        "VC Teaching Excellence"
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16 overflow-hidden" id="what-done">
      <div className="px-4 md:px-16 mb-12">
        <h2 className="text-7xl font-500 bebas-neue-regular text-white mb-4">
          Key Achievements
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl">
          A legacy of excellence in research, teaching, and community impact spanning over two decades
        </p>
      </div>

      <div className="done-container flex gap-8 px-4 md:px-16">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="min-w-[350px] md:min-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center mb-6`}>
              <i className={`${achievement.icon} text-4xl text-white`}></i>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">{achievement.title}</h3>
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text mb-6">
              {achievement.count}
            </div>
            <div className="space-y-3">
              {achievement.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-green-400 text-xl mt-1"></i>
                  <p className="text-gray-300">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="px-4 md:px-16 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
            <i className="ri-team-line text-5xl text-blue-300 mb-4"></i>
            <h4 className="text-5xl font-bold text-white mb-2">15K+</h4>
            <p className="text-gray-300">Students Impacted through WIL & Training</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
            <i className="ri-building-line text-5xl text-purple-300 mb-4"></i>
            <h4 className="text-5xl font-bold text-white mb-2">8+</h4>
            <p className="text-gray-300">Years as Department Head</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
            <i className="ri-book-line text-5xl text-green-300 mb-4"></i>
            <h4 className="text-5xl font-bold text-white mb-2">100+</h4>
            <p className="text-gray-300">Conference Papers & Presentations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatHaveDone;