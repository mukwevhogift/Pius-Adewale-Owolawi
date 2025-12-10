import Achieved from "@/components/Achieved";
import TimelineSection from "@/components/Education";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Project";
import Publications from "@/components/Publications";
import Speeches from "@/components/Speeches";
import RecommendationText from "@/components/RecommendationText";
import WhatHaveDone from "@/components/WhatHaveDone";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <TimelineSection />
      <Publications />
      <Speeches />
      <Projects />
      <WhatHaveDone />
      <Achieved />
      <Gallery />
      <RecommendationText />
      <Footer />
    </>
  );
}
