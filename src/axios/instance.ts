import axios from 'axios';
import { z } from 'zod';

import dotenv from 'dotenv';
dotenv.config();

const versionEnum = z.enum(['v15.0', 'v16.0', 'v17.0']);

export type VersionEnum = z.infer<typeof versionEnum>;

const FACEBOOK_API_URL = 'https://graph.facebook.com/';

const VERSION = process.env.FACEBOOK_API_VERSION
	? (process.env.FACEBOOK_API_VERSION as VersionEnum)
	: 'v17.0';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

const params = z.object({
	token: z.string().optional(),
	facebookApiUrl: z.string().optional(),
	fromPhoneNumberId: z.string(),
	version: versionEnum.default(VERSION).optional(),
});

export function getWhatsAppApiInstance(input: z.infer<typeof params>) {
	try {
		// Parse and validate the input using Zod
    const { token, facebookApiUrl, fromPhoneNumberId } = params.parse({
      token: input.token || WHATSAPP_TOKEN,
      facebookApiUrl: input.facebookApiUrl || FACEBOOK_API_URL,
      fromPhoneNumberId: input.fromPhoneNumberId,
    });
    
    console.log({ token, facebookApiUrl, fromPhoneNumberId });

		const baseURL = `${facebookApiUrl}${fromPhoneNumberId}/messages`;

		return axios.create({
			baseURL,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			// Customize the error message
			throw new Error('Invalid parameters');
		} else {
			// Rethrow the error if it's not a ZodError
			throw error;
		}
	}
}
