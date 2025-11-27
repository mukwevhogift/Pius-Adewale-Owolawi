"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Achieved = () => {
    useEffect(() => {
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
    }, []);

    const awards = [
        {
            title: "Top 500 African Researchers",
            year: "2015-2021",
            organization: "Continental Recognition",
            icon: "ri-trophy-line",
            color: "from-yellow-500 to-orange-500",
            description: "Recognized among Africa's leading researchers for scholarly output and impact"
        },
        {
            title: "Senior Researcher of the Year",
            year: "2020 & 2018",
            organization: "Tshwane University of Technology",
            icon: "ri-medal-line",
            color: "from-blue-500 to-purple-500",
            description: "Acknowledged for sustained research excellence and high-impact outputs"
        },
        {
            title: "Most Outstanding Researcher",
            year: "2016, 2014, 2012",
            organization: "TUT Faculty of Engineering",
            icon: "ri-award-line",
            color: "from-green-500 to-emerald-500",
            description: "Recognized for outstanding leadership in research development and postgraduate supervision"
        },
        {
            title: "Senate Research Excellence Award",
            year: "2016",
            organization: "Tshwane University of Technology",
            icon: "ri-star-line",
            color: "from-purple-500 to-pink-500",
            description: "Conferred by University Senate for significant scholarly contributions and national visibility"
        },
        {
            title: "Vice-Chancellor's Teaching Excellence Award",
            year: "2015",
            organization: "Tshwane University of Technology",
            icon: "ri-book-mark-line",
            color: "from-indigo-500 to-blue-500",
            description: "Honoured for innovative teaching practices, learner engagement, and curriculum transformation"
        },
        {
            title: "BIARI Alumnus",
            year: "2013",
            organization: "Brown University, USA",
            icon: "ri-global-line",
            color: "from-cyan-500 to-teal-500",
            description: "Selected for global interdisciplinary fellowship on development, policy, and academic leadership"
        },
        {
            title: "Best Paper Award",
            year: "2012",
            organization: "ATISR Conference, Taipei",
            icon: "ri-file-text-line",
            color: "from-red-500 to-orange-500",
            description: "Joint recipient for novel contributions to wireless systems and optimization"
        },
        {
            title: "Best Engineering Mentor",
            year: "2006 & 2007",
            organization: "University of KwaZulu-Natal",
            icon: "ri-user-star-line",
            color: "from-pink-500 to-rose-500",
            description: "Recognized for exceptional mentorship and student development in engineering education"
        }
    ];

    const memberships = [
        {
            name: "Engineering Council of South Africa (ECSA)",
            role: "Registered Member",
            reg: "Reg. No: 2018400031"
        },
        {
            name: "Institute of Electrical and Electronics Engineers (IEEE)",
            role: "Member",
            reg: "MIEEE"
        },
        {
            name: "South African Institute of Electrical Engineers (SAIEE)",
            role: "Member",
            reg: "Professional Member"
        },
        {
            name: "South African Radio League (SARL)",
            role: "Member",
            reg: "Active Member"
        },
        {
            name: "South African Amateur Radio Satellite Association (SA AMSAT)",
            role: "Member",
            reg: "Active Member"
        }
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:px-16 py-16" id="achieved">
            <h2 className="text-7xl font-500 mb-6 bebas-neue-regular bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Honours & Recognition
            </h2>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {awards.map((award, index) => (
                    <div
                        key={index}
                        className="achievement-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-t-4 border-transparent hover:border-blue-500 group"
                    >
                        <div className={`w-16 h-16 bg-gradient-to-br ${award.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <i className={`${award.icon} text-3xl text-white`}></i>
                        </div>
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-900 flex-1">{award.title}</h3>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-2">
                                {award.year}
                            </span>
                        </div>
                        <p className="text-sm font-semibold text-blue-600 mb-3">{award.organization}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{award.description}</p>
                    </div>
                ))}
            </div>

            {/* Professional Memberships */}
            <div className="mt-16">
                <h3 className="text-5xl font-bold mb-8 bebas-neue-regular bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Professional Memberships
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">{membership.name}</h4>
                                    <p className="text-sm text-purple-600 font-semibold">{membership.role}</p>
                                    <p className="text-xs text-gray-500 mt-1">{membership.reg}</p>
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