import { z } from 'zod';
import { AxiosInstance } from 'axios';
import { PayloadResponse } from './types';
import { sendImageParamsSchema, sendReplyImageParamsSchema } from './schemas';

const imageMessageSchema = sendImageParamsSchema.extend({
  messaging_product: z.literal('whatsapp'),
	recipient_type: z.literal('individual'),
});


const imageMessageReplySchema = imageMessageSchema.extend({
	context: z.object({
		message_id: z.string(),
	}),
});

type ImageMessage = z.infer<typeof imageMessageSchema>;

type ImageMessageReply = z.infer<typeof imageMessageReplySchema>;

export async function sendImageFunc(
	axios: AxiosInstance,
	opts: z.infer<typeof sendImageParamsSchema>,
) {
	try {
		const { to, image } = sendImageParamsSchema.parse(opts);

		const imageMessage: ImageMessage = {
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			to,
			type: 'image',
			image,
		};

		const { data } = await axios.post<PayloadResponse>('', imageMessage);

		return data;
	} catch (error) {
		throw error;
	}
}

export async function sendReplyImageFunc(
  axios: AxiosInstance,
  opts: z.infer<typeof sendReplyImageParamsSchema>,
) {
  try {
    const { to, image, context } = sendReplyImageParamsSchema.parse(opts);

    const imageMessage: ImageMessageReply = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      context,
      to,
      type: 'image',
      image,
    };

    const { data } = await axios.post<PayloadResponse>('', imageMessage);

    return data;
  } catch (error) {
    throw error;
  }
}