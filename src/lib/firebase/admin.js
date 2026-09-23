// src/lib/firebase/admin.js
// Server-side Firebase — runs only in API routes / Server Components
// Never imported client-side. Uses service credentials from env.

import { initializeApp, getApps, cert, getApps as getAppsFn } from 'firebase-admin/app';
import { getDatabase, ref, get, set, update, remove } from 'firebase-admin/database';

let cachedDb = null;

function initAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export function getDb() {
  try {
    if (!cachedDb) {
      const app = initAdmin();
      cachedDb = getDatabase(app);
    }
    return cachedDb;
  } catch {
    return null;
  }
}

export const db = getDb();
export { getDatabase, ref, get, set, update, remove };
export { initializeApp, getApps, cert };

