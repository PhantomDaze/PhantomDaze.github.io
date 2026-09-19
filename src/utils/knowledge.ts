import { readFileSync } from 'node:fs';
import { getEntryDescription, getEntryTitle } from './content';
import { createWikiLinkResolver, getBlogMarkdownFiles, getMarkdownIdFromFile } from './wiki-links';

const wikiLinkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

interface BlogPost {
	id: string;
	data: {
		title: string;
		description: string;
		tags: string[];
		draft?: boolean;
	};
}

export interface WikiLink {
	target: string;
	label: string;
}

export interface BlogNote {
	id: string;
	title: string;
	description: string;
	tags: string[];
	links: WikiLink[];
}

export interface GraphNode {
	id: string;
	label: string;
	type: 'post';
	href?: string;
}

export interface GraphEdge {
	source: string;
	target: string;
	type: 'wiki-link';
}

function stripFrontmatter(markdown: string): string {
	return markdown.replace(/^---[\s\S]*?---\s*/, '');
}

export function extractWikiLinks(markdown: string, resolveTarget: (target: string) => string = (target) => target): WikiLink[] {
	const body = stripFrontmatter(markdown);
	const links: WikiLink[] = [];
	let match;

	wikiLinkPattern.lastIndex = 0;
	while ((match = wikiLinkPattern.exec(body))) {
		const rawTarget = match[1].trim().replace(/^\/+|\/+$/g, '');
		if (!rawTarget) continue;

		links.push({
			target: resolveTarget(rawTarget).split('#')[0],
			label: (match[2] ?? match[1]).trim(),
		});
	}

	return links;
}

function readPostMarkdown(id: string): string {
	const match = markdownFileById.get(id);
	return match ? readFileSync(match, 'utf-8') : '';
}

const markdownFileById = new Map(getBlogMarkdownFiles().map((file) => [getMarkdownIdFromFile(file), file]));
const notesCache = new Map<string, BlogNote[]>();

function getPostsCacheKey(posts: BlogPost[]): string {
	return posts
		.filter((post) => !post.data.draft)
		.map((post) => post.id)
		.sort()
		.join('\n');
}

export function getBlogNotes(posts: BlogPost[]): BlogNote[] {
	const cacheKey = getPostsCacheKey(posts);
	const cached = notesCache.get(cacheKey);
	if (cached) return cached;

	const resolveTarget = createWikiLinkResolver(posts.map((post) => post.id));

	const notes = posts
		.filter((post) => !post.data.draft)
		.map((post) => ({
			id: post.id,
			title: getEntryTitle(post),
			description: getEntryDescription(post),
			tags: post.data.tags,
			links: extractWikiLinks(readPostMarkdown(post.id), resolveTarget),
		}));

	notesCache.set(cacheKey, notes);
	return notes;
}

export function getBacklinks(currentId: string, posts: BlogPost[]): BlogNote[] {
	return getBlogNotes(posts).filter((note) => note.id !== currentId && note.links.some((link) => link.target === currentId));
}

export function getKnowledgeGraph(posts: BlogPost[]) {
	const notes = getBlogNotes(posts);
	const existingPosts = new Set(notes.map((note) => note.id));
	const nodeMap = new Map<string, GraphNode>();
	const edgeMap = new Map<string, GraphEdge>();

	notes.forEach((note) => {
		nodeMap.set(note.id, {
			id: note.id,
			label: note.title,
			type: 'post',
			href: `/blog/${note.id}`,
		});

		note.links.forEach((link) => {
			if (!existingPosts.has(link.target)) return;
			edgeMap.set(`${note.id}->${link.target}`, { source: note.id, target: link.target, type: 'wiki-link' });
		});
	});

	return {
		nodes: [...nodeMap.values()],
		edges: [...edgeMap.values()],
	};
}
