import { execa } from "execa";

export async function getGitDiff(): Promise<string> {
  const staged = await execa("git", ["diff", "--cached"]);
  if (staged.stdout.trim()) {
    return staged.stdout;
  }

  const working = await execa("git", ["diff"]);
  return working.stdout;
}
