export type PayloadResponse = {
	messaging_product: 'whatsapp';
	contacts: {
		input: string;
		wa_id: string;
	}[];
	messages: {
		id: string;
	}[];
};
