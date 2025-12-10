"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { Testimonial, CommunityInitiative } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const RecommendationText = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [initiatives, setInitiatives] = useState<CommunityInitiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const [testimonialsResponse, initiativesResponse] = await Promise.all([
        supabase.from("testimonials").select("*").order("order_index"),
        supabase.from("community_initiatives").select("*").order("order_index"),
      ]);

      if (testimonialsResponse.data) setTestimonials(testimonialsResponse.data);
      if (initiativesResponse.data) setInitiatives(initiativesResponse.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    gsap.from(".recommendation-text h2", {
      y: 50,
      duration: 0.1,
      opacity: 0,
      scrollTrigger: {
        trigger: ".recommendation-text",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 3,
      },
    });

    gsap.from(".recommendation-text .description, .recommendation-text .testimonial-card", {
      y: 50,
      duration: 0.3,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".recommendation-text",
        start: "top 60%",
        end: "bottom 90%",
        scrub: 3,
      },
    });
  }, [loading]);

  if (loading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-blue-600 animate-spin mb-4"></i>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  const collaborations = [
    { name: "USAID", logo: "ri-global-line" },
    { name: "UNDP", logo: "ri-earth-line" },
    { name: "UNICEF", logo: "ri-heart-line" },
    { name: "European Union", logo: "ri-flag-line" },
    { name: "MICTSETA", logo: "ri-building-4-line" },
    { name: "BANKSETA", logo: "ri-bank-line" },
    { name: "AgriSETA", logo: "ri-seedling-line" },
    { name: "GIZ", logo: "ri-community-line" }
  ];

  return (
    <section className="recommendation-text min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:px-16 py-16">
      <h2 className="text-7xl font-500 mb-8 bebas-neue-regular bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Community Impact & Collaborations
      </h2>

      <div className="description max-w-4xl mb-16">
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Prof. Owolawi is deeply committed to social upliftment and community empowerment through volunteer service, grassroots innovation, and inclusive skills development. His ongoing efforts support marginalised groups, rural enterprises, and small-scale innovators.
        </p>
      </div>

      {/* Community Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {initiatives.map((initiative, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <i className="ri-community-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{initiative.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {initiative.description}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h3 className="text-5xl font-bold mb-8 bebas-neue-regular bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Testimonials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              {/* Profile Image or Quote Icon */}
              {testimonial.image_url ? (
                <div className="mb-6">
                  <img 
                    src={testimonial.image_url} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                  <i className="ri-double-quotes-l text-2xl text-white"></i>
                </div>
              )}
              
              {/* Testimonial Content */}
              <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              {/* Author Info */}
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-xs text-gray-500">{testimonial.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Collaborations */}
      <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl">
        <h3 className="text-4xl font-bold text-white mb-8 text-center bebas-neue-regular">
          Global & National Partnerships
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collaborations.map((collab, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <i className={`${collab.logo} text-3xl text-blue-600`}></i>
              </div>
              <p className="text-white font-semibold">{collab.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationText;