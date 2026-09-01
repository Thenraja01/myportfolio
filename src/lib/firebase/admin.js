// src/lib/firebase/admin.js
// Server-side Firebase — runs only in API routes / Server Components
// Never imported client-side. Uses service credentials from env.

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

function initAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Use environment variables for Firebase Admin credentials
  // Set FIREBASE_DATABASE_URL in .env.local (server-only, no NEXT_PUBLIC_)
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newlines in private key
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

/**
 * Get the Firebase Admin Database instance.
 * Falls back to client SDK if admin credentials not provided.
 */
export function getAdminDb() {
  try {
    const app = initAdmin();
    return getDatabase(app);
  } catch {
    return null;
  }
}
