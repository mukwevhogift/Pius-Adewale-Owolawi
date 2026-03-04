"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/components/DataProvider";

gsap.registerPlugin(ScrollTrigger);

const Speeches = () => {
  const { speeches, loading } = usePortfolioData();
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    if (loading) return;

    gsap.from("#speeches h2", {
      y: 40,
      duration: 0.6,
      opacity: 0,
      scrollTrigger: {
        trigger: "#speeches h2",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".speech-card", {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#speeches",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, [loading]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
          <p className="text-white">Loading speeches...</p>
        </div>
      </section>
    );
  }

  const speechTypes = ["all", "keynote", "invited", "panel", "workshop"];
  const filteredSpeeches = selectedType === "all"
    ? speeches
    : speeches.filter(s => s.type === selectedType);

  const typeColors: Record<string, string> = {
    keynote: "from-purple-500 to-pink-500",
    invited: "from-blue-500 to-cyan-500",
    panel: "from-green-500 to-teal-500",
    workshop: "from-orange-500 to-red-500",
  };

  return (
    <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-slate-800 p-4 md:px-8 lg:px-16 py-12 md:py-20 scroll-mt-24" id="speeches">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bebas-neue-regular text-white mb-3 md:mb-4">
          Keynotes & Invited Talks
        </h2>
        <p className="text-base md:text-xl text-purple-200 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
          International speaking engagements and thought leadership across continents
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 mb-6">
          {speechTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base active:scale-95 ${selectedType === type
                  ? "bg-white text-purple-900 shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
        {filteredSpeeches.map((speech, index) => (
          <div key={index} className="speech-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${typeColors[speech.type] || "from-blue-500 to-purple-500"}`}></div>
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
                <div className="flex-1">
                  <span className={`inline-block bg-gradient-to-r ${typeColors[speech.type] || "from-blue-500 to-purple-500"} text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium mb-2`}>
                    {speech.type}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{speech.title}</h3>
                </div>
              </div>

              <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
                {speech.event && (
                  <p className="text-purple-200 text-xs md:text-sm flex items-center gap-1 md:gap-2">
                    <i className="ri-calendar-event-line"></i>
                    {speech.event}
                  </p>
                )}
                <p className="text-purple-300 text-xs md:text-sm flex items-center gap-1 md:gap-2">
                  <i className="ri-map-pin-line"></i>
                  {speech.location}
                </p>
                <p className="text-purple-300 text-xs md:text-sm flex items-center gap-1 md:gap-2">
                  <i className="ri-time-line"></i>
                  {new Date(speech.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>

              {speech.description && (
                <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">{speech.description}</p>
              )}

              <div className="flex flex-wrap gap-2 md:gap-3">
                {speech.video_url && speech.video_url.startsWith('http') && (
                  <a href={speech.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs md:text-sm font-medium min-h-[40px] md:min-h-[44px]">
                    <i className="ri-video-line text-sm md:text-base"></i>
                    <span>Video</span>
                  </a>
                )}
                {speech.slides_url && speech.slides_url.startsWith('http') && (
                  <a href={speech.slides_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs md:text-sm font-medium min-h-[40px] md:min-h-[44px]">
                    <i className="ri-slideshow-line text-sm md:text-base"></i>
                    <span>Slides</span>
                  </a>
                )}
                {(!speech.video_url || !speech.video_url.startsWith('http')) && (!speech.slides_url || !speech.slides_url.startsWith('http')) && (
                  <span className="text-xs text-gray-400 italic">Links not yet available</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSpeeches.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-mic-off-line text-5xl text-white/30 mb-4"></i>
          <p className="text-white/60 text-lg">No speeches found for this category</p>
        </div>
      )}
    </section>
  );
};

export default Speeches;
