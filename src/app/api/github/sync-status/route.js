import { NextResponse } from "next/server";
import { getSyncStatus } from "@/lib/github/sync";

export async function GET() {
  try {
    const status = await getSyncStatus();
    return NextResponse.json(status || { lastSyncAt: null, status: "never" });
  } catch {
    return NextResponse.json({ lastSyncAt: null, status: "error" });
  }
}
