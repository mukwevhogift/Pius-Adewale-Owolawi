"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/components/DataProvider";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const { hero: heroData, loading } = usePortfolioData();

    useEffect(() => {
        if (loading || !heroData) return;

        // Subtle entrance animations — one-time only
        const heroName = document.querySelector("#hero-name");
        if (heroName) {
            const text = heroName.textContent?.trim() || "";
            heroName.innerHTML = text
                .split("")
                .map((char: string) => `<span class="a inline-block">${char === " " ? "&nbsp;" : char}</span>`)
                .join("");

            gsap.from("#hero-name .a", {
                y: 40,
                duration: 0.4,
                ease: "back.out(1.7)",
                delay: 0.8,
                stagger: 0.04,
                opacity: 0,
            });
        }

        gsap.from("#stats div, .intro-heading p, #hero-image", {
            y: 30,
            delay: 1,
            duration: 0.5,
            opacity: 0,
            stagger: 0.1,
        });

        // About section — one-time entrance
        gsap.from("#about h2, #about .section-badge", {
            y: 40,
            duration: 0.6,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        gsap.from("#about .bento-card", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
                toggleActions: "play none none none",
            },
        });
    }, [loading, heroData]);

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

    const stats = typeof heroData.stats === "string" ? JSON.parse(heroData.stats) : heroData.stats;

    return (
        <>
            {/* SEO: Static H1 for crawlers — always present regardless of Supabase data */}
            <h1 className="sr-only">
                Prof. Pius Adewale Owolawi – Leading AI &amp; 4IR Researcher | Tshwane University of Technology
            </h1>
            <noscript>
                <div style={{ padding: '2rem', textAlign: 'center', background: '#0f172a', color: '#fff' }}>
                    <h1>Prof. Pius Adewale Owolawi – Leading AI &amp; 4IR Researcher</h1>
                    <p>Distinguished Professor of Telecommunication &amp; IT | Assistant Dean | Tshwane University of Technology, South Africa</p>
                    <p>200+ publications | 2000+ citations | R94M+ research funding | Top 500 African Researcher</p>
                </div>
            </noscript>

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 pt-24 md:pt-28 pb-16 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-8 intro-heading">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-blue-300 font-medium">{heroData.title}</span>
                        </div>

                        <div>
                            {/* Visual heading — h2 since the static sr-only h1 is above */}
                            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-4 tracking-tight" id="hero-name">
                                {heroData.name}
                            </h2>
                            <p className="text-xl sm:text-2xl text-blue-200 font-light leading-relaxed">
                                {heroData.subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4" id="stats">
                            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-default">
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    {stats.publications}
                                </div>
                                <p className="text-sm text-gray-300 mt-2">Publications</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-default">
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                                    {stats.funding}
                                </div>
                                <p className="text-sm text-gray-300 mt-2">Research Funding</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <a href="#about" className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all">
                                <span>Explore Research</span>
                                <i className="ri-arrow-right-line"></i>
                            </a>
                            <a href="#projects" className="flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                                <span>View Projects</span>
                            </a>
                        </div>

                        <div className="hidden lg:flex items-center gap-3 text-gray-400 text-sm pt-6">
                            <div className="flex flex-col items-center gap-2 animate-pulse cursor-default">
                                <i className="ri-mouse-line text-2xl"></i>
                                <span>Scroll to explore</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end" id="hero-image">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
                            <div className="relative w-full max-w-md lg:max-w-lg">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                    <img src={heroData.image_url || "/img/prof-owolawi.jpg"} className="w-full h-full object-cover object-top" alt={heroData.name} />
                                </div>
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

            {/* ═══════════ ABOUT SECTION ═══════════ */}
            <section className="bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 md:py-28 px-4 md:px-8 lg:px-16 scroll-mt-24" id="about">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                            <i className="ri-user-star-line text-blue-600"></i>
                            <span className="text-sm font-semibold text-blue-900">About Professor</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Leading 4IR Innovation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {heroData.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bento-card lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl overflow-hidden shadow-xl relative min-h-[400px]">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                            <img src="/img/prof-owolawi-2.jpg" className="w-full h-full object-cover absolute inset-0" alt="Prof. Owolawi" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                                <h3 className="text-3xl font-bold mb-3">Assistant Dean</h3>
                                <p className="text-blue-100 leading-relaxed">Industry Liaison, Special Projects, and Work Integrated Learning at Tshwane University of Technology</p>
                            </div>
                        </div>

                        <div className="bento-card bg-white rounded-3xl p-8 shadow-md border border-gray-100 cursor-default">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                                <i className="ri-article-line text-3xl text-white"></i>
                            </div>
                            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">2000+</div>
                            <p className="text-gray-600 text-lg">Citations across 200+ peer-reviewed publications</p>
                        </div>

                        <a href="#gallery" className="bento-card bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl p-8 shadow-md text-white block hover:shadow-lg transition-shadow">
                            <i className="ri-gallery-line text-5xl mb-4 opacity-80"></i>
                            <h4 className="text-2xl font-bold mb-3">Visual Gallery</h4>
                            <p className="text-orange-50 leading-relaxed">Documenting research events, conferences, and academic milestones worldwide</p>
                        </a>

                        <div className="bento-card lg:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 shadow-md text-white cursor-default">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <i className="ri-team-line text-5xl mb-4 opacity-80"></i>
                                    <h4 className="text-3xl font-bold mb-3">Research Excellence</h4>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full cursor-default">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Active Research</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold mb-1">29</div>
                                    <p className="text-purple-200 text-sm">Master&apos;s Grads</p>
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

                        <div className="bento-card bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-md text-white cursor-default">
                            <i className="ri-funds-box-line text-5xl mb-4 opacity-80"></i>
                            <div className="text-4xl font-bold mb-2">R94M+</div>
                            <h4 className="text-xl font-bold mb-2">Funding Secured</h4>
                            <p className="text-green-50 text-sm">Research grants from MICTSETA, AgriSETA, TIA & more</p>
                        </div>

                        <div className="bento-card lg:col-span-2 bg-white rounded-3xl p-8 shadow-md border border-gray-100 cursor-default">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                    <i className="ri-trophy-line text-3xl text-white"></i>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900">Top 500 African Researchers</h4>
                                    <p className="text-gray-600">AD Scientific Index · Recognized 2015–2021</p>
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
        </>
    );
};

export default Hero;
