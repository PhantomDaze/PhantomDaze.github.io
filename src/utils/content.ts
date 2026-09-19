export function titleFromSlug(id: string): string {
	const filename = id.split('/').at(-1) ?? id;

	return filename
		.replace(/[-_]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getEntryTitle(entry: { id: string; data: { title?: string } }): string {
	return entry.data.title || titleFromSlug(entry.id);
}

export function getEntryDescription(entry: { data: { description?: string } }): string {
	return entry.data.description || 'No description yet.';
}
