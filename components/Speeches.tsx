"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { Speech } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const Speeches = () => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const { data } = await supabase
        .from("speeches")
        .select("*")
        .order("date", { ascending: false });

      if (data) setSpeeches(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    gsap.from("#speeches h2", {
      y: 50,
      duration: 0.1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#speeches h2",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 3,
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
      },
    });
  }, [loading, selectedType]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-800 flex items-center justify-center">
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
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-800 p-4 md:px-16 py-12 md:py-20" id="speeches">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bebas-neue-regular text-white mb-3 md:mb-4">
          Keynotes & Invited Talks
        </h2>
        <p className="text-base md:text-xl text-purple-200 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
          International speaking engagements and thought leadership across continents
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
          {speechTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base active:scale-95 ${
                selectedType === type
                  ? "bg-white text-purple-900 shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 active:bg-white/30 backdrop-blur-sm"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Speeches Timeline */}
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-4">
        {filteredSpeeches.map((speech, index) => (
          <div
            key={index}
            className="speech-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all active:scale-[0.98]"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Date Badge */}
              <div className="flex-shrink-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center min-w-[100px] md:min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {new Date(speech.date).getDate()}
                  </div>
                  <div className="text-xs md:text-sm text-purple-200">
                    {new Date(speech.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-gradient-to-r ${typeColors[speech.type] || 'from-gray-500 to-gray-600'} text-white text-xs md:text-sm font-medium whitespace-nowrap`}>
                    {speech.type.charAt(0).toUpperCase() + speech.type.slice(1)}
                  </div>
                </div>

                <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 leading-snug">
                  {speech.title}
                </h3>

                <div className="space-y-1.5 md:space-y-2 text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                  <div className="flex items-start gap-2">
                    <i className="ri-map-pin-line text-purple-300 flex-shrink-0 mt-0.5"></i>
                    <span className="break-words">{speech.location}</span>
                  </div>
                  {speech.event && (
                    <div className="flex items-start gap-2">
                      <i className="ri-calendar-event-line text-purple-300 flex-shrink-0 mt-0.5"></i>
                      <span className="italic break-words">{speech.event}</span>
                    </div>
                  )}
                </div>

                {speech.description && (
                  <p className="text-gray-200 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                    {speech.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {speech.video_url && (
                    <a
                      href={speech.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition text-xs md:text-sm font-medium min-h-[40px] md:min-h-[44px]"
                    >
                      <i className="ri-video-line text-sm md:text-base"></i>
                      <span>Video</span>
                    </a>
                  )}
                  {speech.slides_url && (
                    <a
                      href={speech.slides_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition text-xs md:text-sm font-medium min-h-[40px] md:min-h-[44px]"
                    >
                      <i className="ri-slideshow-line text-sm md:text-base"></i>
                      <span>Slides</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredSpeeches.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-presentation-line text-5xl md:text-6xl text-white/30 mb-4"></i>
            <p className="text-white/60 text-base md:text-lg">No speeches found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Speeches;
