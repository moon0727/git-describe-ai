import { Command } from "commander";
import dotenv from "dotenv";
import { getGitDiff } from "./git.js";
import { generateCommitMessage } from "./ai.js";

dotenv.config();

const program = new Command();

program
  .name("git-describe-ai")
  .description("Generate commit messages using AI based on git diff")
  .option("-r, --range <range>", "Git diff range", "HEAD~1..HEAD")
  .option(
    "-l, --lang <lang>",
    "Language for commit message output (en|ko)",
    "en"
  )
  .action(async (options) => {
    const diff = await getGitDiff(options.range);
    const message = await generateCommitMessage(diff, options.lang);
    console.log("\n✨ Suggested commit message:\n" + message + "\n");
  });

program.parse();
