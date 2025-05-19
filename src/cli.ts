#!/usr/bin/env node
import { Command } from "commander";
import dotenv from "dotenv";
import { getGitDiff } from "./git.js";
import { generateCommitMessage } from "./ai.js";

dotenv.config();

const program = new Command();

program
  .name("git-describe-ai")
  .description("Generate commit messages using AI based on git diff")
  .option(
    "-l, --lang <lang>",
    "Language for commit message output (en|ko)",
    "en"
  )
  .option("--des", "Include additional commit description")
  .option("--diff", "Print the git diff used for generation")
  .action(async (options) => {
    const diff = await getGitDiff();
    const message = await generateCommitMessage(
      diff,
      options.lang,
      options.des
    );

    console.log("\n✨ Suggested commit message:\n" + message + "\n");

    if (options.diff) {
      console.log("📄 Based on git diff:\n");
      console.log(diff);
    }
  });

program.parse();
