import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export const prerender = process.env.ATLAS_DYNAMIC !== 'true';

type VisitorData = {
	count: number;
};

const dataFile = resolve(process.env.ATLAS_DATA_DIR || '.atlas-data', 'visitors.json');
let writeQueue = Promise.resolve();

async function readVisitorCount() {
	try {
		const data = JSON.parse(await readFile(dataFile, 'utf8')) as Partial<VisitorData>;
		return Number.isSafeInteger(data.count) && data.count >= 0 ? data.count : 0;
	} catch {
		return 0;
	}
}

async function writeVisitorCount(count: number) {
	await mkdir(dirname(dataFile), { recursive: true });
	const tempFile = `${dataFile}.${process.pid}.tmp`;
	await writeFile(tempFile, `${JSON.stringify({ count }, null, 2)}\n`, 'utf8');
	await rename(tempFile, dataFile);
}

async function incrementVisitorCount() {
	const currentCount = await readVisitorCount();
	const nextCount = currentCount + 1;
	await writeVisitorCount(nextCount);
	return nextCount;
}

async function countVisit() {
	if (process.env.ATLAS_DYNAMIC !== 'true') {
		return Response.json({ ok: false, count: null, updatedAt: new Date().toISOString() });
	}

	const count = await (writeQueue = writeQueue.then(incrementVisitorCount, incrementVisitorCount));
	return Response.json({ ok: true, count, updatedAt: new Date().toISOString() });
}

export async function GET() {
	return countVisit();
}
