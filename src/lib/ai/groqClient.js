/**
 * Groq AI Helper Client
 */
export async function generateWithGroq({ message, history = [], context }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key is missing");
  }

  const systemPrompt = `You are Thenraja M's official portfolio AI assistant.

Rules:
1. Answer strictly using the portfolio context.
2. Keep responses very short, friendly, and easy to read (20 to 100 words).
3. Do NOT output <think> tags or internal reasoning process.
4. Use Markdown formatting when helpful.
5. If requested info is missing, say: "That information is not currently available in the portfolio."

PORTFOLIO CONTEXT:
${context}`;

  const modelName = process.env.GROQ_MODEL || process.env.LLM_MODEL || "llama-3.3-70b-versatile";

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6).map((msg) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: String(msg.content || ""),
    })),
    { role: "user", content: message },
  ];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages,
      temperature: 0.3,
      max_tokens: 150,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(`Groq API error: ${errData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  let text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response");
  }

  // Strip unwanted reasoning/think tags
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  return text;
}
