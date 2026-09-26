import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each page's content is one YAML file in src/content/, edited through Pages CMS.
// Keep these schemas in sync with the fields in .pages.yml. A schema mismatch fails
// the build, so a bad edit never reaches the live site (Netlify keeps the last good deploy).

const single = <T extends z.ZodType>(name: string, schema: T) =>
	defineCollection({ loader: glob({ pattern: `${name}.yml`, base: './src/content' }), schema });

// Pages CMS writes cleared optional fields as null or "".
const optional = z.string().nullish();

const header = z.object({ eyebrow: z.string(), title: z.string(), intro: z.string() });
const section = z.object({ eyebrow: z.string(), title: z.string() });

const duesItem = z.object({
	title: z.string(),
	details: z.string(),
	note: optional,
	link_label: optional,
	link_url: optional,
});

export const collections = {
	settings: single(
		'settings',
		z.object({
			applications_open: z.boolean(),
			applications_open_when: z.string(),
			contact_email: z.email(),
			instagram_url: z.url(),
			facebook_url: z.url(),
			slide_seconds: z.number().min(2).max(12),
		}),
	),
	home: single(
		'home',
		z.object({
			hero: header,
			rituals: section,
			map: section,
			join_cta: section,
		}),
	),
	camp: single(
		'camp',
		z.object({
			header,
			rituals_eyebrow: z.string(),
			rituals: z
				.array(
					z.object({
						name: z.string(),
						when: z.string(),
						short: z.string(),
						long: z.string(),
						image: optional,
					}),
				)
				.min(1),
			dues: section.extend({
				intro: z.string(),
				covered_note: z.string(),
				not_covered_note: z.string(),
				covered: z.array(duesItem),
				not_covered: z.array(duesItem),
			}),
		}),
	),
	history: single(
		'history',
		z.object({
			header,
			years: z.array(
				z.object({
					year: z.number().int(),
					title: z.string(),
					note: z.string(),
					// Camp address, e.g. 4:15 & E. Leave both blank for a "where next?" year.
					address_time: z
						.string()
						.regex(/^(1[0-2]|[1-9]):[0-5][0-9]$/, 'Use clock time like 4:15')
						.nullish()
						.or(z.literal('')),
					address_street: z
						.string()
						.regex(/^[A-L]$/, 'Use one street letter, A to L')
						.nullish()
						.or(z.literal('')),
					map_label: z.enum(['below', 'left', 'right']).nullish().or(z.literal('')),
					photo: optional,
				}),
			),
		}),
	),
	about: single(
		'about',
		z.object({
			header: z.object({ eyebrow: z.string(), title: z.string(), paragraphs: z.array(z.string()) }),
			values_title: z.string(),
			values: z.array(z.string()),
			principles: section.extend({
				warning: z.string(),
				items: z.array(
					z.object({
						title: z.string(),
						paragraphs: z.array(z.string()),
						list: z.array(z.string()).nullish(),
						after_list: z.array(z.string()).nullish(),
					}),
				),
			}),
		}),
	),
	join: single(
		'join',
		z.object({
			header,
			steps: z.array(
				z.object({ label: z.string(), title: z.string(), text: z.string(), text_when_open: optional }),
			),
			pitch_in: section.extend({
				items: z.array(z.object({ label: z.string(), title: z.string(), text: z.string() })),
			}),
			faq: section.extend({
				first_timers: z.array(z.object({ question: z.string(), answer: z.string() })),
				veterans: z.array(z.object({ question: z.string(), answer: z.string() })),
			}),
		}),
	),
	contact: single(
		'contact',
		z.object({
			eyebrow: z.string(),
			title: z.string(),
			subtitle: z.string(),
			topics: z.array(z.string()),
			reply_note: z.string(),
		}),
	),
};
