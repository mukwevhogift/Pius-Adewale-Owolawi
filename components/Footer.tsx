"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    gsap.from("#footer h2, #footer p, #footer a, #footer div", {
      y: 30,
      duration: 0.3,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#footer",
        start: "top 80%",
        end: "bottom 90%",
        scrub: 2,
      },
    });
  }, []);

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-8 md:px-16 py-16" id="footer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-4xl font-bold mb-6 bebas-neue-regular text-blue-300">Contact</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <i className="ri-phone-line text-2xl text-blue-400 mt-1"></i>
              <div>
                <p className="text-gray-300 text-sm">South Africa</p>
                <a href="tel:+27829750484" className="text-white hover:text-blue-300 transition-colors">
                  +27 82 975 0484
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <i className="ri-phone-line text-2xl text-blue-400 mt-1"></i>
              <div>
                <p className="text-gray-300 text-sm">United States</p>
                <a href="tel:+14783814264" className="text-white hover:text-blue-300 transition-colors">
                  +1 478 381 4264
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <i className="ri-mail-line text-2xl text-blue-400 mt-1"></i>
              <div>
                <a href="mailto:OwolawiPA@tut.ac.za" className="text-white hover:text-blue-300 transition-colors block">
                  OwolawiPA@tut.ac.za
                </a>
                <a href="mailto:p.owolawi@gmail.com" className="text-white hover:text-blue-300 transition-colors block">
                  p.owolawi@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <i className="ri-building-line text-2xl text-blue-400 mt-1"></i>
              <div>
                <p className="text-gray-300 text-sm">Office</p>
                <p className="text-white">Block 13, Room 153</p>
                <p className="text-white">Tel: +27 12 382 9689</p>
              </div>
            </div>
          </div>
        </div>

        {/* Office Address */}
        <div>
          <h2 className="text-4xl font-bold mb-6 bebas-neue-regular text-blue-300">Office Address</h2>
          <div className="space-y-3">
            <p className="text-white leading-relaxed">
              Office of Assistant Dean for Industry Liaison, Special Projects, and Work Integrated Learning
            </p>
            <p className="text-gray-300">
              Faculty of Information and Communication Technology<br />
              Tshwane University of Technology<br />
              Soshanguve, South Campus<br />
              Pretoria, South Africa
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-300">Residential Addresses</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">South Africa</p>
                <p className="text-gray-300">8 Retief Street, 3610 Ashley Pinetown, KZN</p>
              </div>
              <div>
                <p className="text-gray-400">United States</p>
                <p className="text-gray-300">116 Falcon Way SE, Milledgeville, GA 31061-8873</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links & Social */}
        <div>
          <h2 className="text-4xl font-bold mb-6 bebas-neue-regular text-blue-300">Connect</h2>

          <div className="space-y-4 mb-8">
            <a
              href="https://scholar.google.com/citations?user=uxyoAbYAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <i className="ri-graduation-cap-line text-xl"></i>
              </div>
              <span>Google Scholar</span>
            </a>
            <a
              href="https://www.researchgate.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <i className="ri-search-line text-xl"></i>
              </div>
              <span>ResearchGate</span>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <i className="ri-linkedin-box-line text-xl"></i>
              </div>
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-xl font-bold mb-3 text-blue-300">Research Interests</h3>
            <div className="flex flex-wrap gap-2">
              {["AI & ML", "Wireless Comm", "IoT", "Renewable Energy", "Computer Vision", "Robotics"].map((tag, index) => (
                <span key={index} className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Quotes */}
      <div className="border-t border-white/20 pt-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/5 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-300 mb-3">LIFE PHILOSOPHY</h4>
            <blockquote className="text-sm italic text-gray-300 leading-relaxed">
              &ldquo;Kindness is seeing the best in others when they cannot see it in themselves&rdquo;
            </blockquote>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-300 mb-3">TEACHING PHILOSOPHY</h4>
            <blockquote className="text-sm italic text-gray-300 leading-relaxed">
              &ldquo;I hear and I forget. I see and I remember. I do and I understand.&rdquo;
            </blockquote>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-300 mb-3">RESEARCH PHILOSOPHY</h4>
            <blockquote className="text-sm italic text-gray-300 leading-relaxed">
              &ldquo;Research is what I am doing when I don&apos;t know what I am doing&rdquo; — Wernher Von Braun
            </blockquote>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Prof. Pius Adewale Owolawi. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>PhD, ECSA, MIEEE, SAIEE</span>
          <span className="hidden md:inline">•</span>
          <span>Assistant Dean, TUT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
