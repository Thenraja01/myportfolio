import { Container } from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Projects from "@/components/sections/Projects";

export const metadata = {
  title: "Projects | Then Raja M — Full Stack & AI Portfolio",
  description: "Browse all software projects, MERN stack web applications, AI platforms, and IDEs built by Then Raja M.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 pb-16">
        <Container>
          <Projects />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
