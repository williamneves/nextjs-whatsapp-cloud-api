import { z } from 'zod';
import { AxiosInstance } from 'axios';
import { PayloadResponse } from './types';
import { sendReactionParamsSchema } from './schemas';



const messageSchema = sendReactionParamsSchema.extend({
	messaging_product: z.literal('whatsapp'),
	recipient_type: z.literal('individual'),
	to: z.string(),
});

type Message = z.infer<typeof messageSchema>;

export async function sendReactionFunc(axios: AxiosInstance, opts: z.infer<typeof sendReactionParamsSchema>) {
  try {
    const { to, reaction } = sendReactionParamsSchema.parse(opts);

    const reactionMessage: Message = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'reaction',
      reaction,
    }

    console.log(reactionMessage);


    const { data } = await axios.post<PayloadResponse>('', reactionMessage);

    return data;
  } catch (error) {
    throw error;
  }
}
