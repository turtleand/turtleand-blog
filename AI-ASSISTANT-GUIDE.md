Never introduce em dashes

# CLAUDE.md — Turtleand Growth Blog

## Agent-Friendly PR Checklist
Every content PR must:
- [ ] Blog post frontmatter complete: title, description, pubDatetime, author, tags
- [ ] Description is meaningful (agents use it to decide relevance)
- [ ] Build succeeds (`llms.txt` and `llms-full.txt` auto-generated)
- [ ] JSON-LD BlogPosting schema auto-included via PostDetails layout
- [ ] Author always "Turtleand" (pseudonymous, no real name, no LinkedIn)

## Bot Translation Layer
- `/llms.txt` — Auto-generated at build time listing all posts
- `/llms-full.txt` — Auto-generated, all post content concatenated
- `/rss.xml` — RSS feed
- `/_headers` — Content Signals (ai-train=yes, search=yes, ai-input=yes)
- JSON-LD BlogPosting in every post page (via PostDetails.astro layout)

## Auto-Generation
`scripts/generate-llms.mjs` runs before every `astro build`:
- Reads `src/content/blog/*.md`
- Generates `public/llms.txt` (index) and `public/llms-full.txt` (full content)
- No manual updating needed — just add blog posts normally

## Stack
- Astro + AstroPaper theme + Tailwind
- Content: Markdown in `src/content/blog/`
- Deploy: Netlify static

## Identity
- Author: "Turtleand" (pseudonymous)
- No real name, no LinkedIn — ever
- Git identity: TurtleandBot <openclaw-bot@turtleand.com>
