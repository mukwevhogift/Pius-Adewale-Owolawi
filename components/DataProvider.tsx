"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    HeroSection,
    EducationItem,
    CertificationItem,
    Achievement,
    ResearchArea,
    Publication,
    Speech,
    GalleryImage,
    AwardItem,
    ProfessionalMembership,
    Testimonial,
    CommunityInitiative,
} from "@/types";

interface PortfolioData {
    hero: HeroSection | null;
    education: EducationItem[];
    certifications: CertificationItem[];
    achievements: Achievement[];
    researchAreas: ResearchArea[];
    publications: Publication[];
    speeches: Speech[];
    galleryImages: GalleryImage[];
    awards: AwardItem[];
    memberships: ProfessionalMembership[];
    testimonials: Testimonial[];
    initiatives: CommunityInitiative[];
    loading: boolean;
    error: string | null;
}

const defaultData: PortfolioData = {
    hero: null,
    education: [],
    certifications: [],
    achievements: [],
    researchAreas: [],
    publications: [],
    speeches: [],
    galleryImages: [],
    awards: [],
    memberships: [],
    testimonials: [],
    initiatives: [],
    loading: true,
    error: null,
};

const DataContext = createContext<PortfolioData>(defaultData);

export const usePortfolioData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<PortfolioData>(defaultData);

    const fetchAllData = useCallback(async (retryCount = 0) => {
        try {
            const supabase = createClient();

            // Fetch all data in parallel with a single client
            const [
                heroRes,
                educationRes,
                certificationsRes,
                achievementsRes,
                researchRes,
                publicationsRes,
                speechesRes,
                galleryRes,
                awardsRes,
                membershipsRes,
                testimonialsRes,
                initiativesRes,
            ] = await Promise.all([
                supabase.from("hero_section").select("*").single(),
                supabase.from("education").select("*").order("order_index"),
                supabase.from("certifications").select("*").order("order_index"),
                supabase.from("achievements").select("*").order("order_index"),
                supabase.from("research_areas").select("*").order("order_index"),
                supabase.from("publications").select("*").order("year", { ascending: false }),
                supabase.from("speeches").select("*").order("date", { ascending: false }),
                supabase.from("gallery_images").select("*").order("order_index"),
                supabase.from("awards").select("*").order("order_index"),
                supabase.from("professional_memberships").select("*").order("order_index"),
                supabase.from("testimonials").select("*").order("order_index"),
                supabase.from("community_initiatives").select("*").order("order_index"),
            ]);

            // Deduplicate gallery images
            const uniqueGallery = galleryRes.data
                ? galleryRes.data.filter(
                    (img: GalleryImage, idx: number, arr: GalleryImage[]) =>
                        arr.findIndex((i) => i.image_url === img.image_url) === idx
                )
                : [];

            setData({
                hero: heroRes.data || null,
                education: educationRes.data || [],
                certifications: certificationsRes.data || [],
                achievements: achievementsRes.data || [],
                researchAreas: researchRes.data || [],
                publications: publicationsRes.data || [],
                speeches: speechesRes.data || [],
                galleryImages: uniqueGallery,
                awards: awardsRes.data || [],
                memberships: membershipsRes.data || [],
                testimonials: testimonialsRes.data || [],
                initiatives: initiativesRes.data || [],
                loading: false,
                error: null,
            });
        } catch (err: unknown) {
            console.error("DataProvider fetch error:", err);
            // Retry once after 1 second
            if (retryCount < 2) {
                console.log(`Retrying data fetch (attempt ${retryCount + 2})...`);
                setTimeout(() => fetchAllData(retryCount + 1), 1000);
            } else {
                setData((prev) => ({
                    ...prev,
                    loading: false,
                    error: "Failed to load data. Please refresh the page.",
                }));
            }
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
