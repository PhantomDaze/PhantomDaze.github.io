import { readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const wikiLinkPattern = /(!?)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
const blogDir = resolve('src/content/blog');
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const assetExtensions = new Set([...imageExtensions, '.pdf']);

function slugifyContentPath(value) {
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

function slugifyHeading(value) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s_-]/gu, '')
		.replace(/\s+/g, '-');
}

function readMarkdownFiles(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return readMarkdownFiles(path);
		return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
	});
}

function readAssetFiles(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return readAssetFiles(path);
		return entry.isFile() && assetExtensions.has(extname(entry.name).toLowerCase()) ? [path] : [];
	});
}

function getMarkdownIdFromFile(file) {
	const relativePath = relative(blogDir, file).replace(/\\/g, '/').replace(/\.md$/, '');
	return slugifyContentPath(relativePath);
}

function getAssetRawPathFromFile(file) {
	return relative(blogDir, file).replace(/\\/g, '/');
}

function createUniqueBasenameMap(values) {
	const map = new Map();

	values.forEach((value) => {
		const name = value.split('/').at(-1);
		if (!name) return;

		const key = name.toLowerCase();
		if (map.has(key)) {
			map.delete(key);
			return;
		}

		map.set(key, value);
	});

	return map;
}

function createWikiResolver() {
	const ids = readMarkdownFiles(blogDir).map(getMarkdownIdFromFile);
	const exactMap = new Map(ids.map((id) => [id.toLowerCase(), id]));
	const basenameMap = createUniqueBasenameMap(ids);

	return (target) => {
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

function createAssetResolver() {
	const assets = readAssetFiles(blogDir).map(getAssetRawPathFromFile);
	const exactMap = new Map(assets.map((asset) => [asset.toLowerCase(), asset]));
	const basenameMap = createUniqueBasenameMap(assets);

	return (target) => {
		const normalized = target.replace(/^\/+|\/+$/g, '').replace(/\\/g, '/');
		const exact = exactMap.get(normalized.toLowerCase());
		if (exact) return exact;

		if (!normalized.includes('/')) {
			const basename = basenameMap.get(normalized.toLowerCase());
			if (basename) return basename;
		}

		return normalized;
	};
}

function createTextNode(value) {
	return { type: 'text', value };
}

function encodePath(path) {
	return path
		.split('/')
		.map((segment) => encodeURIComponent(segment))
		.join('/');
}

function createLinkNode(target, label, resolveWikiTarget, resolveAssetTarget) {
	const cleanTarget = target.trim().replace(/^\/+|\/+$/g, '');
	const extension = extname(cleanTarget).toLowerCase();

	if (assetExtensions.has(extension)) {
		const assetPath = resolveAssetTarget(cleanTarget);

		return {
			type: 'link',
			url: `/blog-assets/${encodePath(assetPath)}`,
			title: null,
			children: [createTextNode(label.trim() || cleanTarget)],
		};
	}

	const slug = resolveWikiTarget(cleanTarget);
	const [path, hash] = slug.split('#');

	return {
		type: 'link',
		url: `/blog/${encodeURI(path)}${hash ? `#${encodeURIComponent(hash)}` : ''}`,
		title: null,
		children: [createTextNode(label.trim() || slug)],
	};
}

function createImageNode(target, label, resolveAssetTarget) {
	const assetPath = resolveAssetTarget(target.trim().replace(/^\/+|\/+$/g, ''));

	return {
		type: 'image',
		url: `/blog-assets/${encodePath(assetPath)}`,
		title: null,
		alt: label?.trim() || target.trim(),
	};
}

function transformTextNode(node, resolveWikiTarget, resolveAssetTarget) {
	if (node.type !== 'text' || !wikiLinkPattern.test(node.value)) return node;

	wikiLinkPattern.lastIndex = 0;
	const children = [];
	let lastIndex = 0;
	let match;

	while ((match = wikiLinkPattern.exec(node.value))) {
		if (match.index > lastIndex) {
			children.push(createTextNode(node.value.slice(lastIndex, match.index)));
		}

		if (match[1] === '!') {
			children.push(createImageNode(match[2], match[3] ?? match[2], resolveAssetTarget));
		} else {
			children.push(createLinkNode(match[2], match[3] ?? match[2], resolveWikiTarget, resolveAssetTarget));
		}

		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < node.value.length) {
		children.push(createTextNode(node.value.slice(lastIndex)));
	}

	return children;
}

function mergeAdjacentTextChildren(children) {
	const merged = [];

	children.forEach((child) => {
		const previous = merged.at(-1);
		if (child.type === 'text' && previous?.type === 'text') {
			previous.value += child.value;
			return;
		}

		merged.push(child);
	});

	return merged;
}

function visit(node, resolveWikiTarget, resolveAssetTarget, parent) {
	if (!node || typeof node !== 'object') return;
	if (node.type === 'code' || node.type === 'inlineCode' || node.type === 'link') return;
	if (!Array.isArray(node.children)) return;

	node.children = mergeAdjacentTextChildren(node.children).flatMap((child) => {
		const transformed = transformTextNode(child, resolveWikiTarget, resolveAssetTarget);
		if (Array.isArray(transformed)) return transformed;
		visit(transformed, resolveWikiTarget, resolveAssetTarget, node);
		return transformed;
	});

	if (parent) parent.children = parent.children;
}

export default function remarkWikiLinks() {
	const resolveWikiTarget = createWikiResolver();
	const resolveAssetTarget = createAssetResolver();

	return (tree) => {
		visit(tree, resolveWikiTarget, resolveAssetTarget);
	};
}
