"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { Publication } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const { data } = await supabase
        .from("publications")
        .select("*")
        .order("year", { ascending: false });

      if (data) {
        setPublications(data);
        setFilteredPublications(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = publications;

    // Filter by type
    if (filter !== "all") {
      filtered = filtered.filter(pub => pub.type === filter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPublications(filtered);
  }, [filter, searchQuery, publications]);

  useEffect(() => {
    if (loading) return;

    gsap.from("#publications h2", {
      y: 50,
      duration: 0.1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#publications h2",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 3,
      },
    });

    gsap.from(".pub-card", {
      y: 50,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      scrollTrigger: {
        trigger: "#publications",
        start: "top 70%",
      },
    });
  }, [loading, filteredPublications]);

  if (loading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-blue-600 animate-spin mb-4"></i>
          <p className="text-gray-600">Loading publications...</p>
        </div>
      </section>
    );
  }

  const publicationTypes = ["all", "journal", "conference", "book", "patent"];
  const typeIcons: Record<string, string> = {
    journal: "ri-file-text-line",
    conference: "ri-presentation-line",
    book: "ri-book-line",
    patent: "ri-lightbulb-line",
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:px-16 py-12 md:py-20" id="publications">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bebas-neue-regular bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4">
          Publications & Research
        </h2>
        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
          Over 200 peer-reviewed publications in top-tier journals and conferences
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-4">
          <div className="relative">
            <i className="ri-search-line absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications..."
              className="w-full pl-12 md:pl-14 pr-4 py-3 md:py-4 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-sm md:text-base"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
          {publicationTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base active:scale-95 ${
                filter === type
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 active:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Count */}
      <div className="text-center mb-6 md:mb-8">
        <p className="text-sm md:text-base text-gray-600">
          Showing <span className="font-bold text-blue-600">{filteredPublications.length}</span> publication{filteredPublications.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
        {filteredPublications.map((pub, index) => (
          <div
            key={index}
            className="pub-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 md:p-6 border-l-4 border-blue-500 group active:scale-[0.98]"
          >
            <div className="flex items-start gap-3 md:gap-4">
              {/* Icon */}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <i className={`${typeIcons[pub.type] || 'ri-file-line'} text-xl md:text-2xl text-white`}></i>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 md:gap-4 mb-2 md:mb-3">
                  <h3 className="text-base md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {pub.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0">
                    {pub.year}
                  </span>
                </div>

                <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 break-words">
                  <span className="font-semibold">Authors:</span> {pub.authors}
                </p>

                <p className="text-blue-600 font-medium text-xs md:text-sm mb-2 md:mb-3 italic break-words">
                  {pub.journal}
                </p>

                {pub.doi && (
                  <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm mb-2 md:mb-3">
                    <span className="text-gray-500 break-all">DOI: {pub.doi}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-4">
                  {pub.pdf_url && (
                    <a
                      href={pub.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition text-xs md:text-sm font-medium min-h-[40px] md:min-h-[44px]"
                    >
                      <i className="ri-file-pdf-line text-sm md:text-base"></i>
                      <span>PDF</span>
                    </a>
                  )}
                  {pub.external_url && (
                    <a
                      href={pub.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition text-xs md:text-sm font-medium min-h-[40px] md:min-h-[44px]"
                    >
                      <i className="ri-external-link-line text-sm md:text-base"></i>
                      <span>Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-search-line text-5xl md:text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-base md:text-lg">No publications found matching your criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;
