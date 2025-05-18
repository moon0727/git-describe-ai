import { buildPrompt } from "./prompt";
import fetch from "node-fetch"; // Node 18+는 필요 없음

export async function generateCommitMessage(
  diff: string,
  lang: string
): Promise<string> {
  const prompt = buildPrompt(diff, lang);

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "codellama:7b",
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response.trim();
}
