"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  useEffect(() => {
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

    const horizontalContainer = document.querySelector(".horizontal-container");

    if (horizontalContainer) {
      const scrollWidth = horizontalContainer.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(horizontalContainer, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }
  }, []);

  const researchAreas = [
    {
      title: "Artificial Intelligence & Machine Learning",
      icon: "ri-brain-line",
      color: "from-blue-500 to-cyan-500",
      projects: [
        "Human activity recognition & biomedical imaging",
        "Transfer learning & ensemble models (GANs, VAE, CycleGAN)",
        "Transformer-based NLP for African languages",
        "Hybrid LSTM-CNN for medical diagnosis",
        "Domain adaptation for EEG classification"
      ]
    },
    {
      title: "Wireless & Optical Communications",
      icon: "ri-signal-tower-line",
      color: "from-purple-500 to-pink-500",
      projects: [
        "Radio frequency propagation modeling",
        "Advanced FSO/RF hybrid systems",
        "Reconfigurable Intelligent Surfaces (RIS) for 6G",
        "UAV-assisted wireless energy harvesting",
        "mmWave, Ka/V bands channel modeling"
      ]
    },
    {
      title: "Renewable Energy & Smart Grid",
      icon: "ri-leaf-line",
      color: "from-green-500 to-emerald-500",
      projects: [
        "PV, wind, and hybrid system modeling",
        "Demand-side management (DSM)",
        "Fault detection in PV modules using vision",
        "IoT-enabled load management",
        "AI-driven renewable resource forecasting"
      ]
    },
    {
      title: "Computer Vision & Intelligent Systems",
      icon: "ri-eye-line",
      color: "from-orange-500 to-red-500",
      projects: [
        "2D-to-3D image reconstruction",
        "Object detection (YOLO v5-v9)",
        "Plant disease identification",
        "Livestock monitoring systems",
        "Cloud-based license plate recognition"
      ]
    },
    {
      title: "IoT & Edge Computing",
      icon: "ri-router-line",
      color: "from-indigo-500 to-purple-500",
      projects: [
        "Spectrum optimization & energy-efficient routing",
        "Internet of Remote Things (IoRT)",
        "Smart aquaponics & remote weather monitoring",
        "UAV-based inspection frameworks",
        "Fog-cloud hybrid architectures"
      ]
    },
    {
      title: "Robotics & Embedded Systems",
      icon: "ri-robot-line",
      color: "from-pink-500 to-rose-500",
      projects: [
        "IoT-integrated embedded control systems",
        "Drone-based image acquisition for agriculture",
        "Smart mobility aids for visually impaired",
        "Virtual labs & remote robotics simulation",
        "Brain-controlled robotic systems (EEG/BCI)"
      ]
    }
  ];

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
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16 overflow-hidden" id="projects">
      <div className="px-4 md:px-16 mb-12">
        <h2 className="text-7xl font-500 bebas-neue-regular text-white mb-4">
          Research & Projects
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl">
          Leading cutting-edge research across AI, wireless communications, renewable energy, and smart systems with over 200 peer-reviewed publications and R94M+ in secured funding.
        </p>
      </div>

      {/* Horizontal Scrolling Research Areas */}
      <div className="horizontal-container flex gap-6 px-4 md:px-16">
        {researchAreas.map((area, index) => (
          <div
            key={index}
            className="project-card min-w-[400px] md:min-w-[500px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-full flex items-center justify-center mb-6`}>
              <i className={`${area.icon} text-3xl text-white`}></i>
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">{area.title}</h3>
            <div className="space-y-3">
              {area.projects.map((project, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <i className="ri-arrow-right-s-line text-blue-400 text-xl mt-1"></i>
                  <p className="text-gray-300">{project}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
