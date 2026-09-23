import { NextResponse } from "next/server";
import { syncGithubProjects } from "@/lib/github/sync";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const result = await syncGithubProjects(body.options || {});
    return NextResponse.json(result);
  } catch (error) {
    console.error("GitHub sync failed:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
