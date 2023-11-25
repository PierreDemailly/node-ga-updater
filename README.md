# node-ga-updater

![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/PierreDemailly/node-ga-updater/main/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/PierreDemailly/node-ga-updater/graphs/commit-activity)
[![mit](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://github.com/PierreDemailly/node-ga-updater/blob/main/LICENSE)

Update your GitHub Actions.

> **Note** This tool uses pinned version only for security purpose.

## Requirements
- [Node.js](https://nodejs.org/en/) v18 or higher

## Getting Started

```bash
npx node-ga-updater
```

## Usage

Use `--update-all` or `-u` (alias) to skip prompts and update all by default.

```bash
npx node-ga-updater -u
```

Use `--path` or `-p` (alias) for custom path. Default `.github/workflows`.

Use `--silent` or `-s` (alias) to skip stdout logs.

## Authentication

You can authenticate yourself to the GitHub API if you wont be annoyed with **Rate Limits**.

Create a `.env` if you don't have one.

```bash
touch .env
```

Add this following ENV variable

```bash
# GitHub access token
GITHUB_TOKEN=your_token
```

You can create a GitHub token [here](https://github.com/settings/tokens)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=80" width="80px;" alt="PierreD"/><br /><sub><b>PierreD</b></sub></a><br /><a href="https://github.com/PierreDemailly/node-ga-updater/commits?author=PierreDemailly" title="Code">💻</a> <a href="https://github.com/PierreDemailly/node-ga-updater/commits?author=PierreDemailly" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
