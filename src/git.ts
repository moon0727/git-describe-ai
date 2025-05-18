import { execa } from "execa";

export async function getGitDiff(range: string): Promise<string> {
  const { stdout } = await execa("git", ["diff", range]);
  return stdout;
}
