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
            {/* Hero Section */}
            <section className="hero min-h-screen flex flex-col md:flex-row items-center justify-end px-4 md:px-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-4 pb-8 md:py-0">
                <div className="w-full h-full md:h-screen md:w-2/5 flex flex-col items-start py-6 md:p-8 justify-around">
                    {/* Mobile Stats - Visible on small screens */}
                    <div
                        id="stats-mobile"
                        className="flex md:hidden items-center justify-between w-full text-white mb-6 gap-4"
                    >
                        <div className="flex-1 text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <blockquote className="font-light text-3xl text-blue-300">{heroData.stat_1_value}</blockquote>
                            <p className="font-regular text-gray-300 text-xs mt-1">{heroData.stat_1_label}</p>
                        </div>
                        <div className="flex-1 text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <blockquote className="font-light text-3xl text-blue-300">{heroData.stat_2_value}</blockquote>
                            <p className="font-regular text-gray-300 text-xs mt-1">{heroData.stat_2_label}</p>
                        </div>
                    </div>

                    {/* Desktop Stats */}
                    <div
                        id="stats"
                        className="hidden intro-stats md:flex items-center justify-space w-full text-white"
                    >
                        <div className="w-1/2">
                            <blockquote className="font-light text-5xl text-blue-300">{heroData.stat_1_value}</blockquote>
                            <p className="font-regular text-gray-300">&emsp;&emsp;&nbsp;{heroData.stat_1_label}</p>
                        </div>
                        <div className="w-1/2">
                            <blockquote className="font-light text-5xl text-blue-300">{heroData.stat_2_value}</blockquote>
                            <p className="font-regular text-gray-300">&emsp;&emsp;{heroData.stat_2_label}</p>
                        </div>
                    </div>

                    <div className="intro-heading mb-8 md:mb-0">
                        <p className="text-xl md:text-2xl lg:text-3xl font-light text-blue-200">{heroData.title}</p>
                        <h1
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-regular bebas-neue-regular text-white leading-tight"
                            id="hero-name"
                        >
                            {heroData.name}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-300 mt-3 md:mt-4">{heroData.credentials}</p>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-white" id="scroll-down">
                        <p>Scroll down</p>
                        <i className="ri-arrow-down-long-line block"></i>
                    </div>
                </div>

                <div
                    id="hero-image"
                    className="w-full h-[400px] md:h-full md:min-h-screen md:w-3/5 flex flex-col items-end justify-end"
                >
                    <div className="w-full h-full flex items-end justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                        <img
                            src={heroData.profile_image_url || "/img/prof-owolawi.jpg"}
                            className="w-full md:w-5/6 h-full object-cover rounded-tl-3xl shadow-2xl"
                            alt={heroData.name}
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 about flex flex-col md:flex-row gap-4 p-4 md:px-16 py-16"
                id="about"
            >
                <div className="px-4 md:px-0 w-full h-full md:w-3/8">
                    <h2 className="text-7xl font-500 mb-4 bebas-neue-regular bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Me</h2>
                    <p className="text-xl font-400 break-normal leading-9 text-gray-700">
                        Prof. Pius Adewale Owolawi is a distinguished academic, engineer, and thought leader in Fourth Industrial Revolution (4IR) education and innovation. Currently serving as Assistant Dean for Industry Liaison, Special Projects, and Work Integrated Learning at Tshwane University of Technology (TUT), he drives collaborative strategies that bridge academia, industry, and community.
                    </p>
                    <img
                        src="/img/arrow.png"
                        className="hidden md:block w-4/5 opacity-20"
                        alt=""
                    />
                </div>

                <div className="hidden md:block w-full md:w-2/8">
                    <div className="center-ele bg-white shadow-xl rounded-2xl h-full p-8 py-8 border border-blue-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                            <i className="ri-global-line text-3xl text-white"></i>
                        </div>
                        <blockquote className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">2000+</blockquote>
                        <p className="text-xl font-400 break-normal leading-9 mt-4 text-gray-700">
                            Citations across 200+ peer-reviewed publications in AI, wireless communications, and renewable energy systems
                        </p>
                        <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                            <p className="text-sm font-semibold text-blue-900 mb-2">Top 500 African Researchers</p>
                            <p className="text-xs text-gray-600">Recognized 2015-2021</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/8">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-full md:w-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="/img/prof-owolawi-2.jpg"
                                className="w-full object-cover"
                                alt="Prof. Owolawi"
                            />
                        </div>
                    </div>

                    <div className="px-4 md:px-8 text-lg leading-7">
                        <div className="flex gap-4 mb-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <i className="ri-lightbulb-flash-line text-2xl text-blue-600"></i>
                            <p className="text-gray-700">
                                <span className="font-semibold text-blue-900">4IR Innovation Leader:</span> Established cutting-edge laboratories in AI, IoT, Robotics, and Drone Technology, advancing research in smart systems and machine learning.
                            </p>
                        </div>
                        <div className="flex gap-4 mb-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <i className="ri-team-line text-2xl text-purple-600"></i>
                            <p className="text-gray-700">
                                <span className="font-semibold text-purple-900">Research Excellence:</span> Supervised 29 Master&apos;s and 8 PhD graduates, with 13 active postdoctoral fellows in AI, Computer Vision, and Wireless Communications.
                            </p>
                        </div>
                        <div className="flex gap-4 mb-12 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <i className="ri-funds-line text-2xl text-green-600"></i>
                            <p className="text-gray-700">
                                <span className="font-semibold text-green-900">Funding Champion:</span> Secured R94+ million (USD $5M+) in research and project funding from MICTSETA, BANKSETA, TIA, GIZ, and AgriSETA.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
