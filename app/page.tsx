import Achieved from "@/components/Achieved";
import TimelineIntro from "@/components/Education";
import TimelineSection from "@/components/Education";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Project";
import RecommendationText from "@/components/RecommendationText";
import WhatHaveDone from "@/components/WhatHaveDone";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      {/* <Gallery /> */}
      {/* <Experience /> */}
      {/* <Education /> */}
      <TimelineSection />
      <Projects />
      <WhatHaveDone />
      <Achieved />
      <RecommendationText />
      <Footer />
    </>
  );
}
