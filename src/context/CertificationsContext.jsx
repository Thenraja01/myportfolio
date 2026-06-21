// src/context/CertificationsContext.js
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const CertificationsContext = createContext();

export function CertificationsProvider({ children }) {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
          if (data.certifications) {
            const certsData = Array.isArray(data.certifications) 
              ? data.certifications 
              : Object.values(data.certifications);
            setCertifications(certsData);
          }
          setError(null);
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const certCount = useMemo(() => certifications.length, [certifications]);
  const verifiedCerts = useMemo(() => 
    certifications.filter(cert => cert.verified === true), 
    [certifications]
  );

  return (
    <CertificationsContext.Provider value={{ 
      certifications, 
      certCount, 
      verifiedCerts, 
      loading, 
      error 
    }}>
      {children}
    </CertificationsContext.Provider>
  );
}

export const useCertifications = () => {
  const context = useContext(CertificationsContext);
  if (!context) {
    throw new Error("useCertifications must be used within a CertificationsProvider");
  }
  return context;
};