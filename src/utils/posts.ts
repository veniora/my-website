import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'essays'>;
export type DraftPost = CollectionEntry<'drafts'>;

export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection('essays');
	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export async function getDraftPosts(): Promise<DraftPost[]> {
	if (!import.meta.env.DEV) return [];
	const posts = await getCollection('drafts');
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
