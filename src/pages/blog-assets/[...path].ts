import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, isAbsolute, join, relative, resolve } from 'node:path';

const blogDir = resolve('src/content/blog');
export const prerender = true;

const contentTypes: Record<string, string> = {
	'.avif': 'image/avif',
	'.gif': 'image/gif',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
};

function getAssetFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return getAssetFiles(path);
		return entry.isFile() && contentTypes[extname(entry.name).toLowerCase()] ? [path] : [];
	});
}

export function getStaticPaths() {
	return getAssetFiles(blogDir).map((file) => ({
		params: {
			path: relative(blogDir, file).replace(/\\/g, '/'),
		},
	}));
}

export async function GET({ params }: { params: { path: string } }) {
	const requestedPath = params.path.replace(/\\/g, '/');
	const file = resolve(blogDir, requestedPath);
	const relativePath = relative(blogDir, file);

	if (relativePath.startsWith('..') || relativePath === '' || isAbsolute(relativePath) || !existsSync(file)) {
		return new Response('Not found', { status: 404 });
	}

	const extension = extname(file).toLowerCase();
	const contentType = contentTypes[extension] ?? 'application/octet-stream';

	return new Response(readFileSync(file), {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
