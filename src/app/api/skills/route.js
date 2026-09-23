import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/admin";
import { ref, set, get } from "firebase/database";
import { generateSkillsFromAI } from "@/lib/ai/skillsClient";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase database not available" }, { status: 500 });
    }

    const snap = await get(ref(db, "/"));
    if (!snap.exists()) {
      return NextResponse.json({ error: "No portfolio data found" }, { status: 404 });
    }

    const portfolioData = snap.val();

    const skills = await generateSkillsFromAI(portfolioData);

    return NextResponse.json({
      success: true,
      skills,
      message: "AI-generated skills retrieved successfully",
    });
  } catch (error) {
    console.error("Error generating AI skills:", error);
    return NextResponse.json(
      { error: "Failed to generate skills", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { saveToFirebase = true } = body;

    const db = getDb();
    if (!db) {
      return NextResponse.json({ error: "Firebase database not available" }, { status: 500 });
    }

    const snap = await get(ref(db, "/"));
    if (!snap.exists()) {
      return NextResponse.json({ error: "No portfolio data found" }, { status: 404 });
    }

    const portfolioData = snap.val();
    const skills = await generateSkillsFromAI(portfolioData);

    if (saveToFirebase) {
      await set(ref(db, "technicalSkills"), skills);
    }

    return NextResponse.json({
      success: true,
      skills,
      savedToFirebase: saveToFirebase,
      message: saveToFirebase
        ? "AI-generated skills saved to Firebase"
        : "AI-generated skills retrieved (not saved)",
    });
  } catch (error) {
    console.error("Error generating and saving AI skills:", error);
    return NextResponse.json(
      { error: "Failed to generate and save skills", message: error.message },
      { status: 500 }
    );
  }
}
