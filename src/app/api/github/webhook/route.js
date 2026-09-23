import { NextResponse } from "next/server";
import { syncGithubProjects } from "@/lib/github/sync";

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-hub-signature-256");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 401 }
      );
    }

    const expectedSignature = `sha256=${Buffer.from(
      body,
      process.env.GITHUB_WEBHOOK_SECRET || "fallback-secret"
    ).toString("hex")}`;

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const event = request.headers.get("x-github-event");

    if (event === "repository" || event === "push" || event === "create" || event === "delete") {
      const owner = payload?.repository?.owner?.login || payload?.repository?.full_name?.split("/")[0];
      if (owner === process.env.GITHUB_USERNAME) {
        await syncGithubProjects();
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
