export function cleanContentSlug(id: string): string {
	return id.replace(/-en$/, '');
}
