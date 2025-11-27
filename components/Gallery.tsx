"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

const Gallery = () => {
    useEffect(() => {
        const imageRows = document.querySelectorAll(".image-row");

        imageRows.forEach((row, index) => {
            const images = row.querySelectorAll("img");
            const direction = index % 2 === 0 ? -1 : 1;

            gsap.to(row, {
                x: direction * (images.length * 620),
                duration: 30,
                repeat: -1,
                ease: "none",
            });
        });
    }, []);

    const galleryImages = [
        {
            src: "/img/lab-4ir.jpg",
            alt: "4IR Innovation Laboratory",
            title: "4IR Innovation Lab"
        },
        {
            src: "/img/lab-drone.jpg",
            alt: "Drone Technology Laboratory",
            title: "Drone Tech Lab"
        },
        {
            src: "/img/lab-ai.jpg",
            alt: "AI & Machine Learning Lab",
            title: "AI/ML Research Lab"
        },
        {
            src: "/img/conference-1.jpg",
            alt: "International Conference",
            title: "ICARTI 2021"
        },
        {
            src: "/img/research-team.jpg",
            alt: "Research Team",
            title: "Research Team"
        },
        {
            src: "/img/award-ceremony.jpg",
            alt: "Award Ceremony",
            title: "Award Recognition"
        }
    ];

    return (
        <section className="horizontal-gallery bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16">
            <div className="px-4 md:px-16 mb-8">
                <h2 className="text-6xl font-500 bebas-neue-regular text-white mb-4">
                    Laboratories & Events
                </h2>
                <p className="text-xl text-gray-300">
                    State-of-the-art facilities and global research collaborations
                </p>
            </div>

            <div className="image-row mb-6">
                {[...galleryImages, ...galleryImages].map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="rounded-2xl border-4 border-white/20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-6">
                            <p className="text-white text-2xl font-bold">{image.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="image-row">
                {[...galleryImages.slice().reverse(), ...galleryImages.slice().reverse()].map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="rounded-2xl border-4 border-white/20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-6">
                            <p className="text-white text-2xl font-bold">{image.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;