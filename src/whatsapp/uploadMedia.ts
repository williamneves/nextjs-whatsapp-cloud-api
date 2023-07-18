import axios from 'axios';
import { z } from 'zod';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { uploadMediaParamsSchema } from './schemas';

// Define the type for the input
type UploadMediaParams = z.infer<typeof uploadMediaParamsSchema>;

type Response = {
	id: string;
};

// Function to upload media
export async function uploadMediaFunc(input: UploadMediaParams) {
	// Validate the input
	const { file, type, messaging_product, phone_id, access_token, base_path } =
		uploadMediaParamsSchema.parse(input);

	// Prepare form data
	const data = new FormData();

	// Consider the file as a path and read the file
	const filePath = path.resolve(base_path || 'public/whatsapp/to_upload/', file);
	const fileData = fs.createReadStream(filePath);
	data.append('file', fileData);

	data.append('messaging_product', messaging_product);

	// Define the config
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `https://graph.facebook.com/v17.0/${phone_id}/media`,
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${access_token}`,
			...data.getHeaders(),
		},
		data: data,
	};

	// Make the POST request
	try {
		const response = await axios.request<Response>(config);

		// Return the media ID
		return response.data.id;
	} catch (error) {
		// Handle error
		console.error(error);
		throw error;
	}
}
