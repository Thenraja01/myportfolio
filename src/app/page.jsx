import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import WhatIBuild from "@/components/sections/WhatIBuild";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CodingActivity from "@/components/sections/CodingActivity";
import AIEngineering from "@/components/sections/AIEngineering";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import { ScrollScene } from "@/components/3d/ScrollScene";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-transparent text-current">
      <Navbar />

      <main className="flex-1 w-full space-y-12 overflow-x-clip">
        <Container>
          <ScrollScene perspective={1200}>
            <Hero />
          </ScrollScene>
        </Container>

        <Container>
          <About />
        </Container>

        <Container>
          <WhatIBuild />
        </Container>

        <Container>
          <Skills />
        </Container>

        <Container>
          <Projects />
        </Container>

        <Container>
          <CodingActivity />
        </Container>

        <Container>
          <AIEngineering />
        </Container>

        <Experience />

        <Education />

        <Container>
          <Certifications />
        </Container>

        <Container>
          <Contact />
        </Container>
      </main>

      <Footer />
    </div>
  );
}
