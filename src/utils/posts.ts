import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * In `astro dev` we surface drafts so you can preview how they'll render.
 * Production builds (`astro build`) never include them.
 */
const includeDrafts = import.meta.env.DEV;

/**
 * Published posts, most recent first. Drafts are included only in dev
 * (see {@link includeDrafts}).
 */
export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection(
		'blog',
		({ data }) => includeDrafts || !data.draft,
	);
	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

/**
 * Every unique tag across published posts, alphabetically sorted.
 */
export async function getAllTags(): Promise<string[]> {
	const posts = await getPublishedPosts();
	const tags = new Set<string>();
	for (const post of posts) {
		for (const tag of post.data.tags) tags.add(tag);
	}
	return [...tags].sort((a, b) => a.localeCompare(b));
}

/** Turn a tag into a URL-safe slug. */
export function tagSlug(tag: string): string {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
