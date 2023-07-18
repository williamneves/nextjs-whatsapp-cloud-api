import { z } from "zod";

export const sendImageParamsSchema = z.object({
	to: z.string(),
	type: z.literal('image').optional(),
	image: z
		.object({
			link: z.string(),
		})
		.or(
			z.object({
				id: z.string(),
			})
		),
});

export const sendReplyImageParamsSchema = sendImageParamsSchema.extend({
	context: z.object({
		message_id: z.string(),
	}),
});

export const sendReactionParamsSchema = z.object({
  to: z.string(),
  type: z.literal('reaction').optional(),
	reaction: z.object({
		message_id: z.string(),
		emoji: z.string(),
	}),
});

export const countryEnum = z.enum(['br', 'usa', 'general']).default('general');

export const sendTextParamsSchema = z.object({
	to: z.string(),
	preview_url: z.boolean().optional(),
	text: z.string().min(1, 'At least one char is needed'),
	country: countryEnum.optional(),
});

export const sendTextReplyParamsSchema = sendTextParamsSchema.extend({
	message_id: z.string(),
});

export const uploadMediaParamsSchema = z.object({
	file: z.string(),
	type: z.string(),
	messaging_product: z.literal('whatsapp'),
	phone_id: z.string(),
	access_token: z.string(),
	base_path: z.string().optional(),
});

