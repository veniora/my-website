#!/usr/bin/env node
// Scaffolds a new draft post in src/content/essay-drafts/ from a title.
//   npm run new -- "My Post Title"
// When ready to publish, drag the file into src/content/essays/.

import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOG_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'essay-drafts');

// A title is optional: `npm run new -- "My Post Title"` names the file from
// the title, while a bare `npm run new` (e.g. the VS Code NPM Scripts button)
// scaffolds an "untitled-draft" you rename and retitle by hand.
const title = process.argv.slice(2).join(' ').trim();

// Same slug rules as tagSlug() in src/utils/posts.ts.
const baseSlug =
	title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '') || 'untitled-draft';

// Never overwrite: if the slug is taken, append -2, -3, … until it's free.
let slug = baseSlug;
let filePath = join(BLOG_DIR, `${slug}.md`);
for (let n = 2; existsSync(filePath); n++) {
	slug = `${baseSlug}-${n}`;
	filePath = join(BLOG_DIR, `${slug}.md`);
}

const postTitle = title || 'Untitled draft';

// e.g. "Jun 12 2026" — matches the format the template uses (no comma).
const now = new Date();
const month = now.toLocaleDateString('en-US', { month: 'short' });
const today = `${month} ${String(now.getDate()).padStart(2, '0')} ${now.getFullYear()}`;

const escapeQuotes = (s) => s.replace(/"/g, '\\"');

const content = `---
title: "${escapeQuotes(postTitle)}"
description: "A short summary of what this piece is about."
pubDate: "${today}"
# updatedDate: "${today}"
# heroImage: "./my-image.jpg"
tags: []
---

Write your opening here. The first paragraph is your hook.
`;

writeFileSync(filePath, content);

console.log(`Created draft: src/content/essay-drafts/${slug}.md`);
console.log(`Preview at:    http://localhost:4321/drafts/${slug}/  (run \`npm run dev\`)`);
console.log(`Publish by moving the file into src/content/essays/.`);
