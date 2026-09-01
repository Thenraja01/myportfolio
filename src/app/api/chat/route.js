import { NextResponse } from "next/server";
import { generateWithGroq } from "@/lib/ai/groqClient";
import { generateWithGemini } from "@/lib/ai/geminiClient";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Firebase client config (server-safe, uses NEXT_PUBLIC_ vars)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseDb() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  return getDatabase(app);
}

// Fetch all portfolio data from Firebase Realtime DB
async function getPortfolioData() {
  try {
    const db = getFirebaseDb();
    const snap = await get(ref(db, "/"));
    if (!snap.exists()) return null;
    return snap.val();
  } catch (err) {
    console.error("Firebase fetch error in chat API:", err.message);
    return null;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, userMessage } = body;
    const promptMessage = userMessage || (messages && messages[messages.length - 1]?.content) || "";

    if (!promptMessage.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const preferredProvider = (process.env.LLM_PROVIDER || "groq").toLowerCase();

    // Fetch live data from Firebase Realtime DB
    const portfolioData = await getPortfolioData();

    const personalInfo = portfolioData?.personalInfo || {};
    const objective = portfolioData?.objective || "";
    const projects = portfolioData?.projects
      ? Array.isArray(portfolioData.projects)
        ? portfolioData.projects
        : Object.values(portfolioData.projects)
      : [];
    const workExperience = portfolioData?.workExperience
      ? Array.isArray(portfolioData.workExperience)
        ? portfolioData.workExperience
        : Object.values(portfolioData.workExperience)
      : [];
    const education = portfolioData?.education
      ? Array.isArray(portfolioData.education)
        ? portfolioData.education
        : Object.values(portfolioData.education)
      : [];
    const certifications = portfolioData?.certifications
      ? Array.isArray(portfolioData.certifications)
        ? portfolioData.certifications
        : Object.values(portfolioData.certifications)
      : [];
    const technicalSkills = portfolioData?.technicalSkills || {};

    const context = `
NAME: ${personalInfo.name || "Then Raja M"} (${personalInfo.title || "Full Stack Developer & AI Engineer"})
LOCATION: ${personalInfo.location || "Madurai, India"} | EMAIL: ${personalInfo.email || "thenwthen@gmail.com"}
CAREER OBJECTIVE: ${objective}
SKILLS:
- Frontend: ${(technicalSkills.frontendDevelopment || []).join(", ")}
- Backend & DB: ${(technicalSkills.backendAndDatabases || []).join(", ")}
- AI/ML & Emerging: ${(technicalSkills.aiToolsAndEmergingTech || []).join(", ")}
PROJECTS:
${projects.map((p) => `- ${p.name} (${p.category}): ${p.description}`).join("\n")}
WORK EXPERIENCE:
${workExperience.map((w) => `- ${w.role} at ${w.company} (${w.duration}): ${w.description || ""}`).join("\n")}
EDUCATION:
${education.map((e) => `- ${e.degree} at ${e.institution} (${e.duration})`).join("\n")}
CERTIFICATIONS:
${certifications.map((c) => `- ${c.title} by ${c.institute}`).join("\n")}
`;

    // 1. TRY GROQ API FIRST
    if (groqKey && (preferredProvider === "groq" || !geminiKey)) {
      try {
        let replyText = await generateWithGroq({
          message: promptMessage,
          history: messages || [],
          context,
        });

        replyText = replyText.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

        if (replyText) {
          return NextResponse.json({
            reply: replyText,
            provider: "Groq AI (Llama 3.3 70B)",
            suggestions: ["What projects has he built?", "What are his skills?", "How to contact him?"],
          });
        }
      } catch (err) {
        console.warn("Groq API error, trying Gemini...", err.message);
      }
    }

    // 2. TRY GOOGLE GEMINI API
    if (geminiKey) {
      try {
        let replyText = await generateWithGemini({
          message: promptMessage,
          history: messages || [],
          context,
        });

        replyText = replyText.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

        if (replyText) {
          return NextResponse.json({
            reply: replyText,
            provider: "Google Gemini 2.0",
            suggestions: ["Tell me about his projects", "Where did he study?", "Get in touch"],
          });
        }
      } catch (err) {
        console.warn("Gemini API error:", err.message);
      }
    }

    // 3. FALLBACK
    return NextResponse.json({
      reply: `Hello! 👋 I'm **Thenraja's AI Portfolio Assistant**. Feel free to ask about his projects, skills, or experience! (Email: **${personalInfo.email || "thenwthen@gmail.com"}**)`,
      provider: "AI Assistant",
      suggestions: ["What projects has he built?", "What are his skills?", "How to contact him?"],
    });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", reply: "Sorry, I ran into an error. Please try again!" },
      { status: 500 }
    );
  }
}
