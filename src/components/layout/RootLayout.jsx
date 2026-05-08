import React, { useContext } from 'react';
import Navbar from '../Navbar';
import Home from '../Home';
import Education from '../Education';
import Projects from '../Projects';
import Skills from '../Skills';
import Footer from '../Footer';
import { ThemeContext } from '../../dataprovider/ThemeContext';

export default function RootLayout() {
  const { loading } = useContext(ThemeContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-themeButton"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <main className="pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        <Home />
        <Skills />
        <Projects />
        <Education />
      </main>

      <Footer />
    </div>
  );
}
