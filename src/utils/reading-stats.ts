export type ReadingStats = {
	wordCount: number;
	readingMinutes: number;
};

const CJK_PATTERN = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g;
const WORD_PATTERN = /[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g;

function stripMarkdown(content: string) {
	return content
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
		.replace(/\[[^\]]*]\([^)]*\)/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#>*_~|[\]()-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function getReadingStats(content = ''): ReadingStats {
	const plainText = stripMarkdown(content);
	const cjkCount = plainText.match(CJK_PATTERN)?.length ?? 0;
	const wordCount = plainText.replace(CJK_PATTERN, ' ').match(WORD_PATTERN)?.length ?? 0;
	const totalCount = cjkCount + wordCount;
	const readingMinutes = Math.max(1, Math.ceil(cjkCount / 500 + wordCount / 220));

	return {
		wordCount: totalCount,
		readingMinutes,
	};
}

export function formatReadingStats(
	stats: ReadingStats,
	locale: 'zh' | 'en',
) {
	const count = new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en').format(stats.wordCount);

	if (locale === 'zh') {
		return {
			wordCount: `约 ${count} 字`,
			readingTime: `预计 ${stats.readingMinutes} 分钟读完`,
			compact: `${count} 字 / ${stats.readingMinutes} 分钟`,
		};
	}

	return {
		wordCount: `${count} words`,
		readingTime: `${stats.readingMinutes} min read`,
		compact: `${count} words / ${stats.readingMinutes} min`,
	};
}
