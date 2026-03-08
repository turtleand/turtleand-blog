# AGENTS.md

This file defines repository instructions for AI coding and content agents.

## Scope

- Applies to the whole `turtleand-blog/` repository.
- Prefer this file over ad-hoc agent behavior.

## Ecosystem role

- `turtleand-blog/` is the active repository behind the Growth property of the Turtleand ecosystem.
- Growth is the philosophy layer, reflective essay system, and narrative intelligence of the platform.
- Its primary job is to generate the concepts, language, and human stakes that make the rest of Turtleand coherent.

## Project summary

- Stack: Astro + AstroPaper + Tailwind
- Status: Active
- Public role: Growth (`growth.turtleand.com`)
- Content source: `src/content/blog/*.md` (Markdown only)
- Build output: static site (Netlify-friendly)

## Non-negotiable rules

- Never introduce em dashes in written content.
- Use `.md` files for blog posts, not `.mdx`.
- Use `author: Turtleand` in frontmatter.
- Do not add real names or LinkedIn references.
- If commit identity must be configured, use `TurtleandBot <openclaw-bot@turtleand.com>`.

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

## Content guidance

- Favor conceptual clarity, durable mental models, and identity-level questions over tool churn.
- Keep the writing focused on AI, technology, programming, blockchain, personal growth, and how those domains interact in human development.
- Preserve Growth as the place where Turtleand explains what AI is changing in work, agency, learning, and judgment.
- Use essays here to generate language and frameworks that other properties can later compress, teach, or operationalize.

## Cross-project boundaries

- Route new engineering-focused writing to `build/`.
- Route AI learning-path content to `ai-lab/`.
- Route agent operations and persistent workflow material to `openclaw/`.
- Route ecosystem identity and routing work to `portal/`.
- Route compact doctrine and portable operating principles to `handbook/`.
- Route tool-landscape mapping and category orientation to `ai-atlas/`.

## Content and publishing checks

When creating or editing a post, verify:
- Frontmatter is complete and schema-valid.
- Description is meaningful and specific.
- Post renders correctly and is readable.
- Site build succeeds.

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
