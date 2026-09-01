import Link from "next/link";
import { Container } from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-20 flex-1 flex items-center justify-center text-center">
        <Container className="max-w-md space-y-6">
          <div className="text-6xl font-mono font-bold text-indigo-400">404</div>
          <h1 className="text-2xl font-bold text-slate-100 font-mono">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-sm font-sans">
            The page or project details you are looking for does not exist or has been moved.
          </p>

          <Link href="/">
            <Button variant="primary" size="md">
              Back to Home
            </Button>
          </Link>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
