"use client";

import React from "react";
import { usePortfolioData } from "@/components/DataProvider";

const Gallery = () => {
    const { galleryImages, loading } = usePortfolioData();

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
                    <p className="text-white">Loading gallery...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16 scroll-mt-24" id="gallery">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="mb-12">
                    <a href="#gallery" className="inline-block">
                        <h2 className="text-6xl font-500 bebas-neue-regular text-white mb-4 hover:text-blue-300 transition-colors">
                            Visual Gallery
                        </h2>
                    </a>
                    <p className="text-xl text-gray-300">
                        Documenting research events, conferences, and academic milestones
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-2xl">
                            <img
                                src={image.image_url}
                                alt={image.alt_text}
                                className="w-full h-80 object-cover border-4 border-white/20 transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-6">
                                <p className="text-white text-xl font-bold">{image.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;