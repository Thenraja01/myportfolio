import { NextResponse } from "next/server";
import { getRepositoryReadme } from "@/lib/github/client";
import { processReadmeMarkdown } from "@/lib/github/readme";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Owner and repo parameters are required." },
      { status: 400 }
    );
  }

  try {
    const readmeData = await getRepositoryReadme(owner, repo);
    if (!readmeData || !readmeData.success || !readmeData.content) {
      return NextResponse.json(
        { success: false, message: "README not found for repository." },
        { status: 404 }
      );
    }

    const processedMarkdown = processReadmeMarkdown(
      readmeData.content,
      owner,
      repo,
      readmeData.defaultBranch
    );

    return NextResponse.json({
      success: true,
      content: processedMarkdown,
      htmlUrl: readmeData.htmlUrl || `https://github.com/${owner}/${repo}`,
    });
  } catch (error) {
    console.error("API /api/readme error:", error);
    return NextResponse.json(
      { error: "Failed to fetch repository README." },
      { status: 500 }
    );
  }
}
