import { existsSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const blogDir = resolve('src/content/blog');
let markdownFilesCache: string[] | undefined;

export function slugifyContentPath(value: string): string {
	return value
		.replace(/\\/g, '/')
		.split('/')
		.map((segment) =>
			segment
				.trim()
				.toLowerCase()
				.replace(/[^\p{L}\p{N}\s_-]/gu, '')
				.replace(/\s/g, '-'),
		)
		.join('/');
}

export function slugifyHeading(value: string): string {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s_-]/gu, '')
		.replace(/\s+/g, '-');
}

function readMarkdownFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return readMarkdownFiles(path);
		return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
	});
}

export function getMarkdownIdFromFile(file: string): string {
	const relativePath = relative(blogDir, file).replace(/\\/g, '/').replace(/\.md$/, '');
	return slugifyContentPath(relativePath);
}

export function getBlogMarkdownFiles(): string[] {
	if (!markdownFilesCache) {
		markdownFilesCache = existsSync(blogDir) ? readMarkdownFiles(blogDir) : [];
	}

	return markdownFilesCache;
}

export function createWikiLinkResolver(ids: string[]) {
	const exactMap = new Map(ids.map((id) => [id.toLowerCase(), id]));
	const basenameMap = new Map<string, string>();

	ids.forEach((id) => {
		const basename = id.split('/').at(-1);
		if (!basename) return;

		const key = basename.toLowerCase();
		if (basenameMap.has(key)) {
			basenameMap.delete(key);
			return;
		}

		basenameMap.set(key, id);
	});

	return (target: string): string => {
		const [pathTarget, heading] = target.replace(/^\/+|\/+$/g, '').split('#');
		const normalized = slugifyContentPath(pathTarget);
		const hash = heading ? `#${slugifyHeading(heading)}` : '';
		const exact = exactMap.get(normalized.toLowerCase());
		if (exact) return `${exact}${hash}`;

		if (!normalized.includes('/')) {
			const basename = basenameMap.get(normalized.toLowerCase());
			if (basename) return `${basename}${hash}`;
		}

		return `${normalized}${hash}`;
	};
}
