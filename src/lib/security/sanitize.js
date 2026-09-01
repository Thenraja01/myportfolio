/**
 * Basic HTML escaping to prevent XSS.
 */
export function sanitizeString(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizeContactData(data) {
  return {
    name: sanitizeString(data.name?.trim()),
    email: sanitizeString(data.email?.trim()),
    subject: sanitizeString(data.subject?.trim()),
    message: sanitizeString(data.message?.trim()),
  };
}
