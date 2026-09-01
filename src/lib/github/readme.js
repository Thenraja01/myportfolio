/**
 * Transform relative image and anchor links in Markdown string to raw GitHub content URLs.
 */
export function processReadmeMarkdown(content, owner, repo, defaultBranch = "main") {
  if (!content || typeof content !== "string") return "";

  const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}`;
  const blobBaseUrl = `https://github.com/${owner}/${repo}/blob/${defaultBranch}`;

  // Process markdown images: ![alt](url)
  let processed = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    const cleanUrl = url.trim().replace(/^['"]|['"]$/g, "");
    if (isAbsoluteUrl(cleanUrl)) return match;

    const absoluteImageUrl = resolveGithubRelativeUrl(cleanUrl, rawBaseUrl);
    return `![${alt}](${absoluteImageUrl})`;
  });

  // Process markdown links: [text](url)
  processed = processed.replace(/(^|[^!])\[([^\]]+)\]\(([^)]+)\)/g, (match, prefix, text, url) => {
    const cleanUrl = url.trim().replace(/^['"]|['"]$/g, "");
    if (isAbsoluteUrl(cleanUrl)) return match;

    const absoluteLinkUrl = resolveGithubRelativeUrl(cleanUrl, blobBaseUrl);
    return `${prefix}[${text}](${absoluteLinkUrl})`;
  });

  return processed;
}

function isAbsoluteUrl(url) {
  if (!url) return true;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("data:")
  );
}

function resolveGithubRelativeUrl(relativePath, baseUrl) {
  const cleanPath = relativePath.replace(/^\.?\//, "");
  return `${baseUrl.replace(/\/$/, "")}/${cleanPath}`;
}
