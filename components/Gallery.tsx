"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { createClient } from "@/lib/supabase/client";
import { GalleryImage } from "@/types";

const Gallery = () => {
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();
            
            const { data } = await supabase
                .from("gallery_images")
                .select("*")
                .order("order_index");

            if (data) setGalleryImages(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (loading || galleryImages.length === 0) return;

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
    }, [loading, galleryImages]);

    if (loading) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <i className="ri-loader-4-line text-5xl text-white animate-spin mb-4"></i>
                    <p className="text-white">Loading gallery...</p>
                </div>
            </section>
        );
    }

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
                            src={image.image_url}
                            alt={image.alt_text}
                            className="rounded-2xl border-4 border-white/20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-6">
                            <p className="text-white text-2xl font-bold">{image.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="image-row">
                {[...galleryImages.slice().reverse(), ...galleryImages.slice().reverse()].map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image.image_url}
                            alt={image.alt_text}
                            className="rounded-2xl border-4 border-white/20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-6">
                            <p className="text-white text-2xl font-bold">{image.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;