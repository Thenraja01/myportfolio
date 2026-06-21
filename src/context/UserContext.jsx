// src/context/UserContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useState({});
  const [objective, setObjective] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
          if (data.personalInfo) setPersonalInfo(data.personalInfo);
          if (data.objective) setObjective(data.objective);
          setError(null);
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ personalInfo, objective, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};