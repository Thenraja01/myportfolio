"use client";
import { useState } from "react";
import { useCertifications } from "@/context/CertificationsContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificationMarquee } from "@/components/certifications/CertificationMarquee";
import { CertificationModal } from "@/components/certifications/CertificationModal";

export default function Certifications() {
  const { certifications, loading } = useCertifications();
  const [filter, setFilter] = useState("all");
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  const filteredCerts = certifications.filter((c) => {
    if (filter === "verified") return c.verified === true;
    if (filter === "other") return c.verified === false;
    return true;
  });

  const handleNext = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((prev) => (prev + 1) % filteredCerts.length);
    }
  };

  const handlePrev = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((prev) => (prev - 1 + filteredCerts.length) % filteredCerts.length);
    }
  };

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <SectionHeading
        badge="ACCREDITATIONS"
        title="CERTIFICATIONS & WORKSHOPS"
        subtitle="Verified skills, full-stack workshops, cybersecurity, and cloud credentials."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 my-8 relative z-20">
        {[
          { key: "all", label: "ALL CERTIFICATES" },
          { key: "verified", label: "✓ VERIFIED ONLY" },
          { key: "other", label: "WORKSHOPS & EVENTS" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setFilter(tab.key);
              setSelectedCertIndex(null); // Close modal on filter change
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === tab.key
                ? "bg-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Certification Marquee */}
      <div className="mt-4 -mx-4 md:-mx-12 lg:-mx-24 relative z-10">
        <CertificationMarquee 
          certifications={filteredCerts} 
          onCardClick={(index) => setSelectedCertIndex(index)} 
        />
      </div>

      {/* Full Screen Modal */}
      <CertificationModal
        certifications={filteredCerts}
        selectedIndex={selectedCertIndex}
        onClose={() => setSelectedCertIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
