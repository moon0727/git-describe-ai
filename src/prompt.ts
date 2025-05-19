export function buildPrompt(
  diff: string,
  lang: "en" | "ko",
  withDescription: boolean
): string {
  const langNote = lang === "ko" ? "Write in Korean." : "Write in English.";

  if (!withDescription) {
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

  return `
You are an AI that generates Conventional Commit messages.

Task:
- Read the following git diff.
- Output a commit message in the Conventional Commits format (e.g., feat: ..., fix: ...).
- ${langNote}
- After the message, add a list of 2–4 bullet points describing the changes made.
- The list must be in markdown format, like:
  - 항목1
  - 항목2

Here is the diff:
\`\`\`diff
${diff}
\`\`\`
`;
}
