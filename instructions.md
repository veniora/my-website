# Writing and publishing a post

A step-by-step guide for adding a new post, adding images, previewing it, and
publishing it. Posts live in `src/content/blog/` as Markdown files.

---

## The short version

1. `npm run new` — creates a new draft file.
2. Rename the file and edit the `title`.
3. Write the post (and add images if you want).
4. `npm run dev` — preview it locally with a **Draft** badge.
5. Set `draft: false` when you're happy.
6. Commit and push to publish.

---

## 1. Create the draft

From the terminal, either:

```bash
npm run new -- "My Post Title"     # names the file from the title
```

or just run `npm run new` (or click **new** in the VS Code *NPM Scripts*
panel) to get an `untitled-draft.md` you rename yourself.

This drops a new file in `src/content/blog/` with all the frontmatter filled
in and `draft: true` already set.

> The **file name becomes the URL**. `my-post-title.md` → `/articles/my-post-title/`.
> Use lowercase words separated by hyphens.

## 2. Fill in the frontmatter

The block at the top of the file (between the `---` lines) controls how the
post appears:

```yaml
---
title: "My Post Title"          # shown as the headline
description: "One or two sentences." # used in lists, previews, search
pubDate: "Jun 12 2026"          # publish date — keep the quotes
# updatedDate: "Jun 20 2026"    # optional, uncomment if you revise later
# heroImage: "./my-image.jpg"   # optional, see "Adding images" below
tags: ["Economics", "Politics"] # topics — power the tag pages
draft: true                     # true = hidden from the live site
---
```

Keep dates in quotes. Pick a few consistent tags — reusing the same tag names
keeps the tag pages tidy.

## 3. Write the post

Below the frontmatter, write in normal Markdown: `##` headings, `**bold**`,
`_italic_`, `[links](https://example.com)`, lists, and `> quotes`.

If you use **Obsidian** to write, note two things:
- Don't use `[[wikilinks]]` — they won't render on the site. Use
  `[text](/articles/other-post/)` style links instead.
- See the image note below about Obsidian's attachment setting.

## 4. Adding images

Store images **inside `src/`**, next to the post, and reference them with a
relative path. Astro automatically resizes them, converts to modern formats,
and caches them.

**Hero image** (the big image at the top of the post): put the file next to
the `.md` and point `heroImage` at it.

```
src/content/blog/
  my-post-title.md
  my-post-title.jpg     ← hero image
```

```yaml
heroImage: "./my-post-title.jpg"
```

**Images inside the body**: use standard Markdown with a relative path.

```markdown
![A chart of interest rates](./rates-chart.png)
```

> **Obsidian tip:** Settings → Files & Links → *Default location for new
> attachments* → "Same folder as current file", so pasted images land next to
> the post. Then change the inserted `![[image.jpg]]` to `![](./image.jpg)`.

If you ever need a file served untouched (a PDF, a social-share image), put it
in `public/` instead and link it with an absolute path like `/file.pdf`. Most
of the time you want `src/`.

## 5. Preview it locally

```bash
npm run dev
```

Open the printed URL (usually http://localhost:4321). Because the post is
still a draft, it only shows up while running `npm run dev` — marked with an
orange **Draft** badge in the lists and on the post page. Drafts are invisible
on the live site, so don't share the local draft URL expecting it to work for
others.

## 6. Publish

When the post is ready:

1. Change `draft: true` to `draft: false` in the frontmatter.
   (In Obsidian this is the **draft** checkbox in the Properties panel.)
2. Save.
3. Commit and push:

   ```bash
   git add .
   git commit -m "Add post: My Post Title"
   git push
   ```

The post will now be included in the production build — it appears on the home
page, the articles list, the relevant tag pages, and the RSS feed.

> **Note:** automated deployment isn't set up in this repo yet, so pushing to
> GitHub stores the post but doesn't by itself put it on a live website. Once a
> host (Netlify, Vercel, GitHub Pages, etc.) is connected, this push is all
> publishing takes. Until then, `npm run build` produces the finished site in
> `dist/`.

---

## Un-publishing

To pull a post back off the site, set `draft: true` again, then commit and
push. It disappears from the next build.
