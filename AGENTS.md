# AGENTS.md - turtleand-blog

This file defines repository instructions for AI coding and content agents. It gives repository-level guidance for Codex automatic PR reviews and other AI agents.

## Scope

- Applies to the whole `turtleand-blog/` repository.
- Prefer this file over ad-hoc agent behavior.

## Ecosystem role

- `turtleand-blog/` is the active repository behind the Growth property of the Turtleand ecosystem.
- Growth is the reflective essay, philosophy, strategic language, and human-meaning layer of Turtleand.
- Its job is to generate the concepts, metaphors, and human stakes that make the rest of the ecosystem coherent.
- Route tactical engineering to `build/`, curriculum to `ai-lab/`, operational agent notes to `openclaw-lab/` or `hermes-lab/`, compact doctrine to `handbook/`, tool maps to `ai-atlas/`, blockchain systems learning to `chain-lab/`, and identity routing to `portal/`.

## Project summary

- Stack: Astro + AstroPaper + Tailwind
- Status: Active
- Public role: Growth (`growth.turtleand.com`)
- Content source: `src/content/blog/*.md` using Markdown only
- Build output: static site, Netlify-friendly

## Non-negotiable rules

- Never introduce em dashes in written content.
- Use `.md` files for blog posts, not `.mdx`.
- Use `author: Turtleand` in frontmatter.
- Do not add real names or LinkedIn references.
- If commit identity must be configured, use `TurtleandHermes <hermes@turtleand.com>`.

## Blog frontmatter requirements

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

## Workflow

1. Make minimal, targeted edits.
2. Preserve the reflective essay voice and worldview-generation role of Growth.
3. Validate content schema and frontmatter when touching posts.
4. Use this repo for strategic framing, human-AI reflection, and concept formation rather than tactical implementation walkthroughs.

## Public-safety review

Reject changes that expose secrets, credentials, private infrastructure details, internal paths, specific vulnerabilities, operational weaknesses, or avoidable personal exposure. Safe public lessons are allowed when they describe general patterns, architecture trade-offs, defensive principles, or non-sensitive implementation choices.

Keep private things private. Share learnings, not exposure.

## Content quality review

- Favor conceptual clarity, durable mental models, and identity-level questions over tool churn.
- Preserve metaphor, emotional arc, frontmatter rules, image metadata, and no-em-dash style.
- Review claims for grounding, public-safety boundaries, and whether the essay overstates certainty.
- Keep posts Markdown-only unless repository policy changes.
- Preserve Turtleand voice: calm, precise, direct, reflective when useful, practical when needed.
- Keep humans responsible for direction, judgment, taste, ethics, and consequences.

## Repository integrity review

- Keep changes focused to the branch purpose.
- Do not silently modify generated or build output unless the repo explicitly tracks it or the change requires regeneration.
- Keep `public/llms.txt`, `public/llms-full.txt`, RSS, routes, sitemaps, indexes, and generated discovery files in sync when content changes require it.
- Run local validation before PR creation.

## PR review checklist

Codex and other agents should check:

- Does the change strengthen Growth as the concept-generation and reflective essay layer?
- Are public claims grounded, non-hype, and safe to publish?
- Is anything private, unsafe, or operationally sensitive exposed?
- Are frontmatter, image metadata, generated LLM artifacts, routes, and indexes still correct?
- Is the diff small, coherent, and free from unrelated cleanup?

## LLM/SEO artifacts

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

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`
- Format check: `npm run format:check`
- Generate LLM artifacts only: `npm run generate:llms`
