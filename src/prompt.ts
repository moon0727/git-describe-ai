export function buildPrompt(diff: string, lang: "en" | "ko"): string {
  const langNote = lang === "ko" ? "Write in Korean." : "Write in English.";

  return `
You are an AI that generates Conventional Commit messages.

Task:
- Read the following git diff.
- Output ONLY a one-line commit message.
- Use the Conventional Commits format (e.g., feat: ..., fix: ..., chore: ...).
- ${langNote}
- DO NOT explain the diff.
- DO NOT include code blocks, markdown, or multiple lines.

Here is the diff:
\`\`\`diff
${diff}
\`\`\`
`;
}
