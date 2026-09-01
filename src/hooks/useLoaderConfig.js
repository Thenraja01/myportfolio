"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

const DEFAULT_CONFIG = {
  title: "THEN RAJA M",
  subtitle: "Full Stack · AI-Integrated Engineer",
  bg_theme: "dark",       // "dark" | "light" | "brand" | "glass"
  duration_ms: 2400,
  enabled: true,
};

/**
 * Fetches loader config from Firebase Realtime DB at /loaderConfig.
 * Falls back to DEFAULT_CONFIG if not found or on error.
 */
export function useLoaderConfig() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const snap = await get(ref(db, "/loaderConfig"));
        if (snap.exists()) {
          setConfig({ ...DEFAULT_CONFIG, ...snap.val() });
        }
      } catch (err) {
        console.warn("loaderConfig fetch failed, using defaults:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  return { config, loading };
}
