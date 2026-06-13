import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const essays = defineCollection({
	// Load Markdown and MDX files in the `src/content/essays/` directory.
	loader: glob({ base: './src/content/essays', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Topic tags, e.g. ["Politics", "Economics"]
			tags: z.array(z.string()).default([]),
			// Set to true to hide a post from the site while you work on it
			draft: z.boolean().default(false),
		}),
});

export const collections = { essays };
