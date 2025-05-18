import { buildPrompt } from "./prompt.js";
import fetch from "node-fetch";

export async function generateCommitMessage(
  diff: string,
  lang: "en" | "ko"
): Promise<string> {
  if (!diff.trim()) {
    console.log("No changes detected in the specified range.");
    process.exit(0);
  }

  const OLLAMA_URL = process.env.OLLAMA_URL;
  const OLLAMA_MODEL = process.env.OLLAMA_MODEL;

  if (!OLLAMA_URL || !OLLAMA_MODEL) {
    console.error("❌ Missing OLLAMA_URL or OLLAMA_MODEL in .env");
    process.exit(1);
  }

  const prompt = buildPrompt(diff, lang);

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response.trim();
}
