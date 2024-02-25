export function parseGitHubActions(workflowsFilesLines) {
  const githubActions = new Map();

  if (workflowsFilesLines.length === 0) {
    console.log("No workflow found");

    return githubActions;
  }

  for (const [absolutePath, lines] of workflowsFilesLines) {
    const linesWithGitHubAction = lines
      .map((line, index) => [line, index])
      .filter(([line]) => {
        const withoutWhiteSpace = line.replace(/\s/g, "");

        return withoutWhiteSpace.startsWith("uses:") || withoutWhiteSpace.startsWith("-uses:");
      });

    for (const [line, index] of linesWithGitHubAction) {
      const [, gaWithVersion] = line.split(":");
      // remove possible comment ("foo/bar@baz # v3.3.3" -> "foo/bar@baz")
      const [ga, version] = gaWithVersion.replace(/\s/g, "").replace("#", " #").split(" ")[0].split("@");
      const usage = { absolutePath, line, index, version, pinned: isPinned(version) };

      if (githubActions.has(ga)) {
        const parsedGitHubActions = githubActions.get(ga);
        githubActions.set(ga, [...parsedGitHubActions, usage].flat());

        continue;
      }

      githubActions.set(ga, [usage]);
    }
  }

  return githubActions;
}

function isPinned(version) {
  if (!version.includes(".")) {
    // even if version does not contains a dot, it can be "v3" which is not a pinned version
    // length 10 make it safe
    return version.length > 10;
  }

  return false;
}
