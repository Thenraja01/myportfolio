import React, { useContext } from 'react';
import Navbar from '../Navbar';
import Home from '../Home';
import Education from '../Education';
import Projects from '../Projects';
import Skills from '../Skills';
import Experience from '../Experience';
import Certifications from '../Certifications';
import Footer from '../Footer';
import { ThemeContext } from '../../dataprovider/ThemeContext';

export default function RootLayout() {
  const { loading, error } = useContext(ThemeContext);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent p-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="text-red-500 bg-red-500/10 p-6 rounded-3xl border border-red-500/20">
            <h2 className="text-xl font-bold mb-2">Connection Error</h2>
            <p className="text-sm opacity-80">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-themeButton text-white rounded-full font-bold hover:scale-105 transition-transform"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <main className="pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-themeButton"></div>
            <p className="text-[var(--text-primary)] font-medium animate-pulse">Synchronizing Portfolio...</p>
          </div>
        ) : (
          <>
            <Home />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certifications />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
