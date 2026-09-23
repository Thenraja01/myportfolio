import { generateWithGroq } from "./groqClient";
import { generateWithGemini } from "./geminiClient";

export async function generateSkillsFromAI(portfolioData) {
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const preferredProvider = (process.env.LLM_PROVIDER || "groq").toLowerCase();

  const context = buildPortfolioContext(portfolioData);

  const skillPrompt = `Analyze the following portfolio data and generate a comprehensive list of AI-based technical skills and categories.

PORTFOLIO CONTEXT:
${context}

TASK: Generate a structured skills object where:
- Each key is a skill category name (e.g., "Frontend Development", "Backend & Databases", "AI/ML Tools", "DevOps", "Programming Languages", "Databases", "Version Control", "Cloud Services")
- Each value is an array of specific skill names (e.g., ["React", "Node.js", "Python", "TensorFlow"])

RULES:
1. Extract skills directly mentioned or implied by the projects, experience, education, and certifications.
2. Include AI/ML skills like Python, TensorFlow, PyTorch, LLM, NLP, RAG, LangChain, etc. if the portfolio shows AI/ML work.
3. Include all technologies, frameworks, tools, and languages mentioned in projects and experience.
4. Be specific and accurate - only list skills that are actually present in the portfolio.
5. Group skills into logical categories.
6. Return ONLY the JSON object, no markdown, no explanation, no code blocks.

Return the skills as a raw JSON object with category names as keys and arrays of skill strings as values.`;

  let replyText;

  if (groqKey && (preferredProvider === "groq" || !geminiKey)) {
    try {
      replyText = await generateWithGroq({
        message: skillPrompt,
        history: [],
        context,
      });
    } catch (err) {
      console.warn("Groq skill generation failed, trying Gemini...", err.message);
      if (geminiKey) {
        replyText = await generateWithGemini({
          message: skillPrompt,
          history: [],
          context,
        });
      }
    }
  } else if (geminiKey) {
    replyText = await generateWithGemini({
      message: skillPrompt,
      history: [],
      context,
    });
  } else {
    throw new Error("No AI API key available for skill generation");
  }

  replyText = replyText.replace(/[\s\S]*?<\/think>/gi, "").trim();

  try {
    const jsonMatch = replyText.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, replyText];
    const jsonStr = jsonMatch[1] || replyText;
    const skills = JSON.parse(jsonStr);
    return skills;
  } catch (err) {
    console.error("Failed to parse AI-generated skills:", err);
    throw new Error("Could not parse AI-generated skills into valid JSON");
  }
}

function buildPortfolioContext(data) {
  const personalInfo = data?.personalInfo || {};
  const projects = data?.projects || [];
  const workExperience = data?.workExperience || [];
  const education = data?.education || [];
  const certifications = data?.certifications || [];
  const technicalSkills = data?.technicalSkills || {};

  let context = `NAME: ${personalInfo.name || "Unknown"}
TITLE: ${personalInfo.title || "Developer"}
LOCATION: ${personalInfo.location || "Unknown"}

WORK EXPERIENCE:
${workExperience.map((w) => `- ${w.role} at ${w.company} (${w.duration}): ${w.description || "No description"}`).join("\n")}

PROJECTS:
${projects.map((p) => `- ${p.name} (${p.category}): ${p.description || "No description"}\n  Technologies: ${(p.technologies || []).join(", ")}`).join("\n")}

EDUCATION:
${education.map((e) => `- ${e.degree} at ${e.institution} (${e.duration})`).join("\n")}

CERTIFICATIONS:
${certifications.map((c) => `- ${c.title} by ${c.institute}`).join("\n")}

EXISTING TECHNICAL SKILLS:
${JSON.stringify(technicalSkills, null, 2)}`;

  return context;
}
