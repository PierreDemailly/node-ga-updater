# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to Semantic Versioning.

## [Unreleased]

### Fixed

- Added missing `update-all` option

## [1.2.1] - 2024-02-24

### Fixed

- Added missing `node:os` import

## [1.2.0] - 2024-02-23

### Added

- Commit after update with `--commit` (alias `-s`). Use a custom commit message with `--message` (alias `-m`), default *chore: update GitHub Actions*.
- Use stdout logs with `--silent` (alias `-s`)

## [1.1.0] - 2023-10-18

### Added

- Choose custom path with `--path` flag (alias `-p`)

## [1.0.0] - 2023-07-08

### Added

- Interactively update any GitHub Actions found in workflows, there is no more default action or custom action
- Update all with `--update-all` flag (alias `-u`)

## [0.0.3] - 2023-06-27

### Added

- Handle any yml syntax

## [0.0.2] - 2023-06-27

### Added

- Handle `- uses:` syntax (instead of only `uses:`)

## [0.0.1] - 2023-06-25

### Added

- Update default GitHub Actions with `npx node-ga-updater`
- Update custom GitHub Actions with `npx node-ga-updater <actionA> <actionB> ... <actionN>`

**Default GitHub Actions List:**
- github/codeql-action
- actions/checkout
- actions/upload-artifact
- step-security/harden-runner
- ossf/scorecard-action
