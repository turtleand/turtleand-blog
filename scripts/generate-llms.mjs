import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, body: content };
  const raw = match[1];
  const body = content.slice(match[0].length).trim();
  const data = {};
  let currentKey = null;
  let inArray = false;
  for (const line of raw.split('\n')) {
    if (inArray) {
      const itemMatch = line.match(/^\s+-\s+(.*)/);
      if (itemMatch) {
        data[currentKey].push(itemMatch[1].replace(/^["']|["']$/g, ''));
        continue;
      } else {
        inArray = false;
      }
    }
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (kvMatch) {
      const key = kvMatch[1];
      let val = kvMatch[2].trim();
      if (val === '') {
        // could be start of array or empty
        currentKey = key;
        data[key] = [];
        inArray = true;
        continue;
      }
      val = val.replace(/^["']|["']$/g, '');
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      data[key] = val;
      currentKey = key;
    }
  }
  return { data, body };
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).sort();
const posts = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const { data, body } = parseFrontmatter(content);
  if (data.draft === true) continue;
  posts.push({
    slug: data.slug || file.replace(/\.md$/, ''),
    title: data.title || file,
    description: data.description || '',
    pubDatetime: data.pubDatetime || '',
    modDatetime: data.modDatetime || '',
    body,
  });
}

// Sort by date descending
posts.sort((a, b) => new Date(b.pubDatetime) - new Date(a.pubDatetime));

// Generate llms.txt
const llmsTxt = `# Turtleand Growth Blog

> Essays on AI, technology, human potential, and personal growth. Where humans and technology evolve together.

## Articles
${posts.map(p => `- [${p.title}](https://growth.turtleand.com/posts/${p.slug}/): ${p.description}`).join('\n')}

## About
Written by Turtleand — software engineer with 10+ years, exploring AI integration and human-centered technology.
- Portal: https://turtleand.com
- GitHub: https://github.com/turtleand
- Dev.to: https://dev.to/turtleand

## Feed
- RSS: https://growth.turtleand.com/rss.xml
`;

// Generate llms-full.txt
const llmsFullTxt = `# Turtleand Growth Blog — Full Content

> All posts concatenated for AI consumption.

${posts.map(p => `---\n\n# ${p.title}\n\n> ${p.description}\n\nPublished: ${p.pubDatetime}\nURL: https://growth.turtleand.com/posts/${p.slug}/\n\n${p.body}`).join('\n\n')}
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt);
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt);

console.log(`✅ Generated llms.txt (${posts.length} posts) and llms-full.txt`);
