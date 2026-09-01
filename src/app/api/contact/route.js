import { NextResponse } from "next/server";
import { validateContactInput } from "@/lib/validation/contactValidation";
import { sanitizeContactData } from "@/lib/security/sanitize";
import { sendContactEmail } from "@/lib/email/sendContactEmail";
import { formatDate, formatTime } from "@/lib/utils";

export async function POST(request) {
  try {
    // 1. Parse payload
    const body = await request.json().catch(() => ({}));
    const { name, email, subject, message, honeypot } = body;

    // 3. Server-side validation
    const validation = validateContactInput({ name, email, subject, message, honeypot });
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed.", details: validation.errors },
        { status: 400 }
      );
    }

    // 4. Sanitize inputs
    const cleanData = sanitizeContactData({ name, email, subject, message });

    // 5. Server timestamp & date/time (IST timezone)
    const now = new Date();
    const serverTimestamp = now.getTime();
    const dateStr = formatDate(now);
    const timeStr = formatTime(now);

    const contactPayload = {
      name: cleanData.name,
      email: cleanData.email,
      subject: cleanData.subject,
      message: cleanData.message,
      date: dateStr,
      time: timeStr,
      timestamp: serverTimestamp,
      status: "new",
    };

    // 6. Write to Firebase Realtime Database via REST API
    const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
    let firebaseSuccess = false;

    if (dbUrl) {
      try {
        const firebaseUrl = `${dbUrl.replace(/\/$/, "")}/contacts.json`;
        const fbRes = await fetch(firebaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactPayload),
        });

        if (fbRes.ok) {
          firebaseSuccess = true;
        } else {
          console.error("Firebase REST write failed with status:", fbRes.status);
        }
      } catch (fbErr) {
        console.error("Firebase REST write exception:", fbErr);
      }
    } else {
      console.warn("NEXT_PUBLIC_FIREBASE_DATABASE_URL is not set.");
    }

    // 7. Send email notification asynchronously
    sendContactEmail({
      name: cleanData.name,
      email: cleanData.email,
      subject: cleanData.subject,
      message: cleanData.message,
      date: dateStr,
      time: timeStr,
    }).catch((err) => console.error("Email notification error:", err));

    // 8. Return response
    if (firebaseSuccess || process.env.NODE_ENV === "development") {
      return NextResponse.json(
        { message: "Message sent successfully.", success: true },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Unable to process your message right now. Please try again later." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Server API /api/contact Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
