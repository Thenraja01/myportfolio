"use client";
import { useState } from "react";
import { useCertifications } from "@/context/CertificationsContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificationGrid } from "@/components/certifications/CertificationGrid";

export default function Certifications() {
  const { certifications, loading } = useCertifications();
  const [filter, setFilter] = useState("all");


  const filteredCerts = certifications.filter((c) => {
    if (filter === "verified") return c.verified === true;
    if (filter === "other") return c.verified === false;
    return true;
  });

  return (
    <section id="certifications" className="py-20 relative">
      <SectionHeading
        badge="ACCREDITATIONS"
        title="CERTIFICATIONS & WORKSHOPS"
        subtitle="Verified skills, full-stack workshops, cybersecurity, and cloud credentials."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 my-8">
        {[
          { key: "all", label: "ALL CERTIFICATES" },
          { key: "verified", label: "✓ VERIFIED ONLY" },
          { key: "other", label: "WORKSHOPS & EVENTS" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === tab.key
                ? "bg-indigo-600 text-white font-bold"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Certification Grid */}
      <div className="mt-8">
        <CertificationGrid certifications={filteredCerts} />
      </div>
    </section>
  );
}
