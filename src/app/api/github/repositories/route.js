import { NextResponse } from "next/server";
import { getRepositoriesWithSyncStatus } from "@/lib/github/sync";

export async function GET() {
  try {
    const result = await getRepositoriesWithSyncStatus();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
