#!/usr/bin/env node

import "dotenv/config";

// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// Import Third-party Dependencies
import { request, Headers } from "@myunisoft/httpie";
import { walkSync } from "@nodesecure/fs-walk";
import kleur from "kleur";
import { confirm } from "@topcli/prompts";

// Import Internal Dependencies
import { parseGitHubActions } from "../src/parseGitHubActions.mjs";

// CONSTANTS
const kGitHubApiUrl = "https://api.github.com";
const kRequestOptions = {
  headers: new Headers({
    "X-GitHub-Api-Version": "2022-11-28"
  }),
  authorization: process.env.GITHUB_TOKEN
};
const kFetchedTags = new Map();

async function getLastTagSha(repo) {
  const requestUrl = new URL(`/repos/${repo}/tags`, kGitHubApiUrl);
  const { data } = await request("GET", requestUrl, kRequestOptions);

  kFetchedTags.set(repo, data);

  return [data[0].name, data[0].commit.sha];
}

const workflowsFilesPath = [...walkSync(path.join(process.cwd(), "/.github/workflows"), { extensions: new Set([".yml"]) })];
const workflowsFilesLines = workflowsFilesPath.map(([, absolutePath]) => {
  const content = fs.readFileSync(absolutePath, "utf8");
  const lines = content.split(/\r?\n/);

  return [absolutePath, lines];
});

hr();

const projectGitHubActions = parseGitHubActions(workflowsFilesLines);

for (const [ga, usage] of projectGitHubActions) {
  // format foo/bar/baz -> foo/bar
  const repository = ga.split("/").slice(0, 2).join("/");
  const [name, sha] = await getLastTagSha(repository);
  const updates = [];

  for (const { absolutePath, line, index, version, pinned } of usage) {
    const [, version] = line.split("@");
    const newLine = `${line.replace(version, sha)} # ${name}`;

    if (line === newLine) {
      continue;
    }

    let missingLineVersion;

    if (pinned && !line.includes("#")) {
      const tag = kFetchedTags.get(repository).find((tag) => tag.commit.sha === version);
      missingLineVersion = tag.name;
    }
    console.log(kleur.yellow().bold(absolutePath));
    console.log(`${kleur.red().bold(`-\t${line}`)}${missingLineVersion ? kleur.white().bold(` (${missingLineVersion})`) : ""}`);
    console.log(kleur.green().bold(`+\t${newLine}`));
    // skip line
    console.log();

    updates.push({ absolutePath, index, newLine });
    // const content = fs.readFileSy
  }

  if (updates.length === 0) {
    console.log(kleur.green().bold(`${ga} is up-to-date!`));
    hr();

    continue;
  }

  const confirmUpdate = await confirm(`Update ${ga} ?`, { initial: true });

  if (confirmUpdate) {
    for (const update of updates) {
      const workflowLines = workflowsFilesLines.find(([absolutePath]) => absolutePath === update.absolutePath)[1];
      workflowLines[update.index] = update.newLine;

      fs.writeFileSync(update.absolutePath, workflowLines.join(os.EOL));
    }
  }

  hr();
}

console.log("Done!");

function hr() {
  console.log();
  console.log(kleur.grey("-".repeat(process.stdout.columns)));
  console.log();
}
