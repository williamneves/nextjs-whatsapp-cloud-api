import { z } from 'zod';
import { AxiosInstance } from 'axios';
import { PayloadResponse } from './types';
import { sendTextParamsSchema, sendTextReplyParamsSchema } from './schemas';


const messageSchema = z.object({
	messaging_product: z.literal('whatsapp'),
	context: z.object({
		message_id: z.string(),
	}).optional(),
  recipient_type: z.literal('individual'),
  to: z.string(),
  type: z.literal('text'),
  text: z.object({
    preview_url: z.boolean().optional(),
    body: z.string(),
  }),
});

type Message = z.infer<typeof messageSchema>;




export async function sendTextFunc(axios: AxiosInstance, opts: z.infer<typeof sendTextParamsSchema>) {
	try {
    const { to, preview_url, text } = sendTextParamsSchema.refine(
		({ to, country }) => {
			switch (country) {
				case 'br':
					return /^\+?55?\s*\(?[1-9]{2}\)?\s*(?:9\d)?\s*\d{4}[\s.-]?\d{4}$/.test(to);
				case 'usa':
					return /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(to);
				case 'general':
				default:
					return /^\+?\d{1,4}[\s.-]?\(?\d{1,3}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/.test(
						to
					);
			}
		},
		{
			message: 'Invalid phone number for the selected country',
		}
).parse(opts);
    
    const message: Message = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        preview_url,
        body: text,
      }
    }


    // Send the message
    const response = await axios.post<PayloadResponse>('', message);

    return {to, sent_message_id: response.data.messages[0].id};

	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error('Invalid parameters');
		} else {
			throw error;
		}
	}
}

export async function sentTextReplyFunc(axios: AxiosInstance, opts: z.infer<typeof sendTextReplyParamsSchema>) {
	try {
		const { to, preview_url, text, message_id } = sendTextReplyParamsSchema.parse(opts);
		
		const message: Message = {
			messaging_product: 'whatsapp',
			context: {
				message_id
			},
			recipient_type: 'individual',
			to,
			type: 'text',
			text: {
				preview_url,
				body: text,
			}
		}

		// Send the message
		const response = await axios.post<PayloadResponse>('', message);

		return { to, sent_message_id: response.data.messages[0].id };
		
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error('Invalid parameters');
		} else {
			throw error;
		}
	}
}
