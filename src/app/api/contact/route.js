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

    // 6. Write to Firebase Realtime Database using consistent firebase/database SDK
    const { initializeApp, getApps } = await import("firebase/app");
    const { getDatabase, ref, push, set } = await import("firebase/database");

    let firebaseSuccess = false;
    let firebaseErrorDetails = "";

    try {
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      if (!firebaseConfig.databaseURL) {
        throw new Error("NEXT_PUBLIC_FIREBASE_DATABASE_URL is not set");
      }

      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const db = getDatabase(app);
      const contactsRef = ref(db, "contacts");
      const newContactRef = push(contactsRef);
      await set(newContactRef, contactPayload);
      
      firebaseSuccess = true;
    } catch (fbErr) {
      console.error("Firebase SDK write exception:", fbErr.message);
      firebaseErrorDetails = fbErr.message;
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

    // In production, if Firebase fails, we return the error to help debug
    return NextResponse.json(
      { error: `Unable to process your message: ${firebaseErrorDetails}` },
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
