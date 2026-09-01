/**
 * Gemini AI Helper Client
 */
export async function generateWithGemini({ message, history = [], context }) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is missing");
  }

  const systemInstruction = `You are Thenraja M's official portfolio AI assistant.

Rules:
1. Answer strictly using the portfolio context.
2. Keep responses very short, friendly, and easy to read (20 to 100 words).
3. Do NOT output <think> tags or internal reasoning process.
4. Use Markdown formatting when helpful.
5. If requested info is missing, say: "That information is not currently available in the portfolio."

PORTFOLIO CONTEXT:
${context}`;

  const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const conversationHistory = history.slice(-6).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: String(msg.content || "") }],
  }));

  const res = await fetch(geminiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        ...conversationHistory,
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\nUser Message: ${message}` }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800,
      },
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${errData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  // Strip unwanted reasoning/think tags (even if unclosed due to truncation)
  text = text.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, "").trim();

  return text;
}
