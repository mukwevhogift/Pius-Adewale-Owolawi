"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { Achievement } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const WhatHaveDone = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const { data } = await supabase
        .from("achievements")
        .select("*")
        .order("order_index");

      if (data) setAchievements(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Auto-scroll on hover or auto-play on touch devices
  useEffect(() => {
    if ((!isHovering && !isTouchDevice) || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    const scrollSpeed = 1;

    const autoScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    if (isTouchDevice || isHovering) {
      animationId = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isHovering, isTouchDevice]);

  useEffect(() => {
    if (loading) return;

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

    gsap.from(".achievement-card", {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#what-done",
        start: "top 70%",
      },
    });
  }, [loading]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
          <p className="text-white">Loading achievements...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12 md:py-16" id="what-done">
      <div className="px-4 md:px-16 mb-8 md:mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-500 bebas-neue-regular text-white mb-3 md:mb-4">
          Key Achievements
        </h2>
        <p className="text-base md:text-xl text-gray-300 max-w-3xl mb-4 md:mb-6">
          A legacy of excellence in research, teaching, and community impact spanning over two decades
        </p>
        <p className="text-xs md:text-sm text-blue-300 flex items-center gap-2">
          {isTouchDevice ? (
            <>
              <i className="ri-drag-move-line"></i>
              Auto-scrolling carousel - swipe to control
            </>
          ) : (
            <>
              <i className="ri-mouse-line"></i>
              Hover over the carousel to auto-scroll
            </>
          )}
        </p>
      </div>

      <div 
        ref={scrollRef}
        onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
        className="flex gap-5 md:gap-8 px-4 md:px-16 overflow-x-auto scrollbar-hide touch-pan-x"
        style={{ scrollBehavior: 'smooth' }}
      >
        {achievements.map((achievement, index) => {
          const details = typeof achievement.details === 'string' 
            ? JSON.parse(achievement.details) 
            : achievement.details;

          return (
            <div
              key={index}
              className="achievement-card min-w-[280px] sm:min-w-[350px] md:min-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-8 hover:bg-white/15 transition-all flex-shrink-0 active:scale-[0.98]"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center mb-4 md:mb-6`}>
                <i className={`${achievement.icon} text-3xl md:text-4xl text-white`}></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 leading-tight">{achievement.title}</h3>
              <div className="space-y-2 md:space-y-3">
                {details.map((detail: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 md:gap-3 text-gray-200 text-sm md:text-base">
                    <i className="ri-checkbox-circle-line text-green-400 text-lg md:text-xl mt-0.5 flex-shrink-0"></i>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {/* Duplicate for seamless loop */}
        {achievements.map((achievement, index) => {
          const details = typeof achievement.details === 'string' 
            ? JSON.parse(achievement.details) 
            : achievement.details;

          return (
            <div
              key={`dup-${index}`}
              className="achievement-card min-w-[280px] sm:min-w-[350px] md:min-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-8 hover:bg-white/15 transition-all flex-shrink-0 active:scale-[0.98]"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center mb-4 md:mb-6`}>
                <i className={`${achievement.icon} text-3xl md:text-4xl text-white`}></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 leading-tight">{achievement.title}</h3>
              <div className="space-y-2 md:space-y-3">
                {details.map((detail: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 md:gap-3 text-gray-200 text-sm md:text-base">
                    <i className="ri-checkbox-circle-line text-green-400 text-lg md:text-xl mt-0.5 flex-shrink-0"></i>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatHaveDone;
