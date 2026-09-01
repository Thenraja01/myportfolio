import "./globals.css";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { AIChatbot } from "@/components/chat/AIChatbot";
import { ThemeProvider } from "@/context/ThemeContext";
import { Scene3DBackground } from "@/components/3d/Scene3DBackground";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AppProviders } from "@/context/Provider";
import InitialLoaderOverlay from "@/components/animations/InitialLoaderOverlay";

const PORTFOLIO_URL = "https://thenraja-01.vercel.app";

export const metadata = {
  title: "Then Raja M | Full Stack Developer & AI-Integrated Engineer",
  description:
    "Professional portfolio of Then Raja M, Full Stack Developer and AI-Integrated Engineer building modern MERN stack web applications, AI-powered systems, and FastAPI backends.",
  keywords: [
    "Then Raja M",
    "Full Stack Developer",
    "AI-Integrated Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "FastAPI",
    "MERN Stack",
    "OpenAI API",
    "Madurai India",
  ],
  authors: [{ name: "Then Raja M" }],
  metadataBase: new URL(PORTFOLIO_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Then Raja M | Full Stack Developer & AI-Integrated Engineer",
    description:
      "Portfolio of Then Raja M, Full Stack Developer building modern web applications and AI-powered solutions.",
    url: PORTFOLIO_URL,
    siteName: "Then Raja M Portfolio",
    type: "website",
    images: [
      {
        url: "/images/user1.jpg",
        width: 1200,
        height: 630,
        alt: "Then Raja M - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Then Raja M | Full Stack Developer & AI-Integrated Engineer",
    description:
      "Portfolio of Then Raja M, Full Stack Developer building modern web applications.",
    images: ["/images/user1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Then Raja M",
              url: PORTFOLIO_URL,
              jobTitle: "Full Stack Developer & AI-Integrated Engineer",
              sameAs: [
                "https://github.com/Thenraja01",
                "https://linkedin.com/in/thenraja-m",
                "https://leetcode.com/ePsMYahxiO",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased selection:bg-indigo-500 selection:text-white relative">
        <InitialLoaderOverlay />
        <AppProviders>
          <SmoothScroll>
            <Scene3DBackground />
            <ScrollProgress />
            <div className="relative z-10">{children}</div>
            <AIChatbot />
          </SmoothScroll>
        </AppProviders>
      </body>
    </html>
  );
}
