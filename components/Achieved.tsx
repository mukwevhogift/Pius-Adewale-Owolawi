"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { AwardItem, ProfessionalMembership } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const Achieved = () => {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [memberships, setMemberships] = useState<ProfessionalMembership[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();
            
            const [awardsResponse, membershipsResponse] = await Promise.all([
                supabase.from("awards").select("*").order("order_index"),
                supabase.from("professional_memberships").select("*").order("order_index"),
            ]);

            if (awardsResponse.data) setAwards(awardsResponse.data);
            if (membershipsResponse.data) setMemberships(membershipsResponse.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (loading) return;

        gsap.from("#achieved h2", {
            y: 50,
            duration: 0.1,
            opacity: 0,
            scrollTrigger: {
                trigger: "#achieved h2",
                start: "top 90%",
                end: "bottom 60%",
                scrub: 3,
            },
        });

        gsap.from(".achievement-card", {
            y: 50,
            duration: 0.3,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: "#achieved h2",
                start: "top 60%",
                end: "bottom 90%",
                scrub: 3,
            },
        });
    }, [loading]);

    if (loading) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-800 p-4 md:px-16 py-20 flex items-center justify-center">
                <div className="text-center">
                    <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
                    <p className="text-white">Loading awards data...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:px-16 py-16" id="achieved">
            <div className="text-center mb-12">
                <h2 className="text-6xl md:text-7xl font-bold bebas-neue-regular bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Honours & Recognition
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    A legacy of excellence, innovation, and contribution to academia
                </p>
            </div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch">
                {awards.map((award, index) => (
                    <div
                        key={index}
                        className="achievement-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-t-4 border-transparent hover:border-blue-500 group flex flex-col"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i className="ri-trophy-line text-3xl text-white"></i>
                        </div>
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-900 flex-1">{award.title}</h3>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-2">
                                {award.year}
                            </span>
                        </div>
                        <p className="text-sm font-semibold text-blue-600 mb-3">{award.issuer}</p>
                        <p className="text-gray-600 text-sm leading-relaxed flex-1">{award.description}</p>
                    </div>
                ))}
            </div>

            {/* Professional Memberships */}
            <div className="mt-16">
                <div className="text-center mb-8">
                    <h3 className="text-5xl font-bold bebas-neue-regular bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Professional Memberships
                    </h3>
                    <p className="text-lg text-gray-600">Affiliations with leading engineering and technology bodies</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {memberships.map((membership, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-purple-500"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="ri-shield-check-line text-2xl text-white"></i>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">{membership.organization}</h4>
                                    <p className="text-sm text-purple-600 font-semibold">{membership.role}</p>
                                    <p className="text-xs text-gray-500 mt-1">Since {membership.year_joined}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact Statistics */}
            <div className="mt-16 p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl">
                <h3 className="text-4xl font-bold text-white mb-8 text-center bebas-neue-regular">
                    Academic Impact & Reach
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">200+</div>
                        <p className="text-blue-100">Publications</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">2000+</div>
                        <p className="text-blue-100">Citations</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">37+</div>
                        <p className="text-blue-100">Graduates Supervised</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">13+</div>
                        <p className="text-blue-100">Active Postdocs</p>
                    </div>
                </div>
            </div>

            {/* Research Philosophy */}
            <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-4 mb-6">
                    <i className="ri-lightbulb-flash-line text-4xl text-blue-600"></i>
                    <h3 className="text-3xl font-bold text-gray-900">Research Philosophy</h3>
                </div>
                <blockquote className="text-xl italic text-gray-700 mb-4 leading-relaxed">
                    &ldquo;If we knew what it was we were doing, it would not be called research, would it?&rdquo;
                </blockquote>
                <p className="text-gray-600 text-right">— Albert Einstein</p>
                <p className="text-gray-700 mt-6 leading-relaxed">
                    As an engineer, researcher, and academician, I am fascinated by the significant contributions researchers make to technological advancements in telecommunications, healthcare, computing, space exploration, and society at large. I firmly believe that technical research is a powerful driver of economic development for any nation. Inspired by Einstein&apos;s words, I embrace the journey into the unknown through research. It is through this exploration and discovery that we transform the unknown into knowledge, propelling innovation and progress in our fields.
                </p>
            </div>
        </section>
    );
};

export default Achieved;