import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string().default(''),
		description: z.string().default(''),
		pubDate: z.date().default(new Date('1970-01-01')),
		updatedDate: z.date().optional(),
		tags: z.array(z.string()).default([]),
		cover: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
