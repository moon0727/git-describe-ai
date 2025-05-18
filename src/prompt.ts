export function buildPrompt(diff: string, lang: string): string {
  const prefix =
    lang === "ko"
      ? "아래는 코드 변경 diff입니다. 어떤 변경이 있었는지 요약하고, 명령형 커밋 메시지로 작성해주세요."
      : "Here is a git diff. Summarize the change and write a commit message using imperative style.";
  return `${prefix}\n\n\`\`\`diff\n${diff}\n\`\`\``;
}
