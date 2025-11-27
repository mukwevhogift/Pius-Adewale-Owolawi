import Achieved from "@/components/Achieved";
import TimelineSection from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Project";
import RecommendationText from "@/components/RecommendationText";
import WhatHaveDone from "@/components/WhatHaveDone";

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
