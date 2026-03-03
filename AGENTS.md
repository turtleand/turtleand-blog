# AGENTS.md

This file defines repository instructions for AI coding/content agents.

## Scope

- Applies to the whole repository.
- Prefer this file over ad-hoc agent behavior.

## Project Summary

- Stack: Astro + AstroPaper + Tailwind.
- Content source: `src/content/blog/*.md` (Markdown only).
- Build output: static site (Netlify-friendly).

## Non-Negotiable Rules

- Never introduce em dashes in written content.
- Use `.md` files for blog posts, not `.mdx`.
- Use `author: Turtleand` in frontmatter.
- Do not add real names or LinkedIn references.
- If commit identity must be configured, use `TurtleandBot <openclaw-bot@turtleand.com>`.

## Blog Frontmatter Requirements

All posts must include valid frontmatter fields used by the content schema in `src/content/config.ts`.

Required:
- `title`
- `description`
- `pubDatetime`
- `author`
- `tags`

Common optional:
- `modDatetime`
- `featured`
- `draft`
- `canonicalURL`
- `ogImage`
- `editPost`

Date format rules:
- Use YAML date values, not quoted strings.
- Use ISO-8601 timestamps with `Z` when time is included.
- Example: `pubDatetime: 2026-03-01T15:57:00Z`

## Content and Publishing Checks

When creating or editing a post, verify:
- Frontmatter is complete and schema-valid.
- Description is meaningful and specific.
- Post renders correctly and is readable.
- Site build succeeds.

## LLM/SEO Artifacts

The repository auto-generates:
- `public/llms.txt`
- `public/llms-full.txt`

Generation source:
- Script: `scripts/generate-llms.mjs`
- Runs in `npm run build` before `astro build`

Also present:
- RSS feed at `/rss.xml`
- Headers rules in `public/_headers`
- JSON-LD `BlogPosting` via `src/layouts/PostDetails.astro`

## Recommended Workflow For Agents

1. Make minimal, targeted edits.
2. Validate content schema/frontmatter.
3. Run formatting/lint only when relevant (`npm run format:check`, `npm run lint`).
4. Run build validation (`npm run build`).
5. Report exactly what changed and any remaining risks.

## PR Checklist (Agent-Oriented)

- [ ] Post frontmatter is valid and complete.
- [ ] Author is `Turtleand`.
- [ ] No `.mdx` post was introduced.
- [ ] Build passes and generated LLM files are updated.
- [ ] Rendered post is accessible and readable.

## Useful Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`
- Format check: `npm run format:check`
- Generate LLM artifacts only: `npm run generate:llms`
