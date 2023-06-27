#!/usr/bin/env node

import "dotenv/config";

// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";

// Import Third-party Dependencies
import { request, Headers } from "@myunisoft/httpie";
import { walkSync } from "@nodesecure/fs-walk";
import { Spinner } from "@topcli/spinner";
import kleur from "kleur";

// CONSTANTS
const kGivenGAs = process.argv.slice(2);
const kDefaultGAs = [
  "github/codeql-action",
  "actions/checkout",
  "actions/upload-artifact",
  "step-security/harden-runner",
  "ossf/scorecard-action"
];
const kGitHubApiUrl = "https://api.github.com";
const kRequestOptions = {
  headers: new Headers({
    "X-GitHub-Api-Version": "2022-11-28"
  }),
  authorization: process.env.GITHUB_TOKEN
};

async function getLastTagSha(repo) {
  const requestUrl = new URL(`/repos/${repo}/tags`, kGitHubApiUrl);
  const { data } = await request("GET", requestUrl, kRequestOptions);

  return [data[0].name, data[0].commit.sha];
}

const spinner = new Spinner({ name: "line" }).start("Updating GitHub Actions");

const ymlFiles = [...walkSync(path.join(process.cwd(), "/.github/workflows"), { extensions: new Set([".yml"]) })];

const gas = kGivenGAs.length > 0 ? kGivenGAs : kDefaultGAs;

for (const [, absolutePath] of ymlFiles) {
  const content = fs.readFileSync(absolutePath, "utf8");
  const lines = content.split("\n");

  for (const ga of gas) {
    const [name, sha] = await getLastTagSha(ga);

    const linesToUpdate = lines
      .map((line, index) => [line, index])
      .filter(([line]) => {
        const withoutWhiteSpace = line.replace(/\s/g, "");

        return withoutWhiteSpace.startsWith(`uses:${ga}`) || withoutWhiteSpace.startsWith(`-uses:${ga}`);
      });

    for (const [lineToUpdate, index] of linesToUpdate) {
      const [, version] = lineToUpdate.split("@");
      const newLine = `${lineToUpdate.replace(version, sha)} # ${name}`;

      lines[index] = newLine;
    }

    fs.writeFileSync(absolutePath, lines.join("\n"));
  }
}

spinner.succeed(`GitHub Actions updated (${gas.join(", ")})`);
