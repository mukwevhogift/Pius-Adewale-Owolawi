"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { HeroSection } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [heroData, setHeroData] = useState<HeroSection | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();
            
            const { data } = await supabase
                .from("hero_section")
                .select("*")
                .single();

            if (data) setHeroData(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (loading) return;

        const scrollDownArrow = document.querySelector("#scroll-down i");

        if (scrollDownArrow) {
            gsap.to(scrollDownArrow, {
                y: -10,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }

        const statsDiv = document.querySelectorAll(
            "#stats div, .intro-heading p, #scroll-down, #hero-image"
        );
        if (statsDiv) {
            gsap.from(statsDiv, {
                y: 50,
                delay: 1,
                duration: 0.3,
                opacity: 0,
                stagger: 0.1,
            });
        }

        const heroName = document.querySelector("#hero-name");
        if (heroName) {
            const text = heroName.textContent.trim();
            heroName.innerHTML = text
                .split("")
                .map((char) => `<span class="a">${char}</span>`)
                .join("");

            gsap.from("#hero-name .a", {
                y: 50,
                duration: 0.3,
                ease: "back.out(1.7)",
                delay: 1,
                stagger: 0.05,
                opacity: 0,
            });
        }

        gsap.from("#about h2", {
            y: 50,
            duration: 0.1,
            opacity: 0,
            scrollTrigger: {
                trigger: "#about h2",
                start: "top 90%",
                end: "bottom 60%",
                scrub: 3,
            },
        });

        gsap.from("#about p, #about blockquote, #about .center-ele, #about img, #about h3, #about i", {
            y: 50,
            duration: 0.3,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: "#about h2",
                start: "top 60%",
                end: "bottom 90%",
                scrub: 3,
            },
        });

    }, [loading]);

    if (loading || !heroData) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
                    <p className="text-white">Loading...</p>
                </div>
            </section>
        );
    }

    return (
        <div className="parallax">
            {/* Hero Section - Modern Split Layout */}
            <section className="hero min-h-screen flex items-center px-4 md:px-16 lg:px-24 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 pt-24 md:pt-28 pb-12 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {/* Title Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-blue-300 font-medium">{heroData.title}</span>
                        </div>

                        {/* Name - Large & Bold */}
                        <div>
                            <h1
                                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-4 tracking-tight"
                                id="hero-name"
                            >
                                {heroData.name}
                            </h1>
                            <p className="text-xl sm:text-2xl text-blue-200 font-light leading-relaxed">
                                {heroData.credentials}
                            </p>
                        </div>

                        {/* Stats Cards - Modern Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-blue-400/30 transition-all hover:scale-105">
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    {heroData.stat_1_value}
                                </div>
                                <p className="text-sm text-gray-300 mt-2">{heroData.stat_1_label}</p>
                            </div>
                            <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-400/30 transition-all hover:scale-105">
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                                    {heroData.stat_2_value}
                                </div>
                                <p className="text-sm text-gray-300 mt-2">{heroData.stat_2_label}</p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="#about"
                                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105"
                            >
                                <span>Explore Research</span>
                                <i className="ri-arrow-right-line"></i>
                            </a>
                            <a
                                href="#projects"
                                className="flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all hover:scale-105"
                            >
                                <span>View Projects</span>
                            </a>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="hidden lg:flex items-center gap-3 text-gray-400 text-sm pt-8">
                            <div className="flex flex-col items-center gap-2 animate-bounce">
                                <i className="ri-mouse-line text-2xl"></i>
                                <span>Scroll to explore</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image - Modern Card */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative group">
                            {/* Decorative elements */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            
                            {/* Main image container */}
                            <div className="relative w-full max-w-md lg:max-w-lg">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                    <img
                                        src={heroData.profile_image_url || "/img/prof-owolawi.jpg"}
                                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                                        alt={heroData.name}
                                    />
                                </div>
                                
                                {/* Floating badge */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white backdrop-blur-xl rounded-full shadow-2xl flex items-center gap-3 border border-gray-200">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">IoT</div>
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">4IR</div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">Research Focus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section - Modern Bento Grid */}
            <section
                className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 md:py-32 px-4 md:px-16 lg:px-24"
                id="about"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                            <i className="ri-user-star-line text-blue-600"></i>
                            <span className="text-sm font-semibold text-blue-900">About Professor</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Leading 4IR Innovation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Prof. Pius Adewale Owolawi is a distinguished academic, engineer, and thought leader in Fourth Industrial Revolution (4IR) education and innovation.
                        </p>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Large Feature Card - Profile */}
                        <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl overflow-hidden shadow-2xl group relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <img
                                src="/img/prof-owolawi-2.jpg"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                alt="Prof. Owolawi"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-3xl font-bold mb-3">Assistant Dean</h3>
                                <p className="text-blue-100 leading-relaxed">
                                    Industry Liaison, Special Projects, and Work Integrated Learning at Tshwane University of Technology
                                </p>
                            </div>
                        </div>

                        {/* Stats Card - Citations */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all group border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <i className="ri-article-line text-3xl text-white"></i>
                            </div>
                            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                                2000+
                            </div>
                            <p className="text-gray-600 text-lg">Citations across 200+ peer-reviewed publications</p>
                        </div>

                        {/* Gallery Card */}
                        <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all text-white">
                            <i className="ri-gallery-line text-5xl mb-4 opacity-80"></i>
                            <h4 className="text-2xl font-bold mb-3">Visual Gallery</h4>
                            <p className="text-orange-50 leading-relaxed">
                                Documenting research events, conferences, and academic milestones worldwide
                            </p>
                        </div>

                        {/* Research Excellence Card */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all text-white">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <i className="ri-team-line text-5xl mb-4 opacity-80"></i>
                                    <h4 className="text-3xl font-bold mb-3">Research Excellence</h4>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Active Research</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold mb-1">29</div>
                                    <p className="text-purple-200 text-sm">Master's Grads</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold mb-1">8</div>
                                    <p className="text-purple-200 text-sm">PhD Grads</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold mb-1">13</div>
                                    <p className="text-purple-200 text-sm">Postdocs</p>
                                </div>
                            </div>
                        </div>

                        {/* Funding Card */}
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all text-white">
                            <i className="ri-funds-box-line text-5xl mb-4 opacity-80"></i>
                            <div className="text-4xl font-bold mb-2">R94M+</div>
                            <h4 className="text-xl font-bold mb-2">Funding Secured</h4>
                            <p className="text-green-50 text-sm">Research grants from MICTSETA, AgriSETA, TIA & more</p>
                        </div>

                        {/* Recognition Card */}
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                    <i className="ri-trophy-line text-3xl text-white"></i>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900">Top 500 African Researchers</h4>
                                    <p className="text-gray-600">Recognized 2015-2021</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">AI & ML</span>
                                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Wireless Communications</span>
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">Renewable Energy</span>
                                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Computer Vision</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
