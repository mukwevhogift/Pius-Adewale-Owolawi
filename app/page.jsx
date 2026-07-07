import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Metrics, AboutCompetencies, ExperiencePrograms, Credentials, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Metrics />
      <AboutCompetencies />
      <ExperiencePrograms />
      <Credentials />
      <Contact />
    </main>
  );
}
