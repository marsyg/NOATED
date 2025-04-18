import OpenAI from 'openai';
import fs from 'fs';
import { systemPrompt } from '@/constant';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

export async function callNebius(docBase64: string) {
	const ParagraphSchema = z.object({
		type: z.literal("paragraph"),
		content: z.string(),
	});

	// Define a schema for a bullet note
	const BulletSchema = z.object({
		type: z.literal("bullet"),
		title: z.string(),
		content: z.string(),
	});

	// A note can be either a paragraph or a bullet
	const NoteSchema = z.union([ParagraphSchema, BulletSchema]);

	// Define the data structure for the notes
	const DataSchema = z.object({
		mainTitle: z.string(),
		introduction: z.string().optional(),
		topicHeading: z.string().optional(),
		notes: z.array(NoteSchema),
	});

	const ResponseSchema = z.object({
		success: z.boolean(),
		message: z.string(),
		data: DataSchema,
	});

	console.log("I'm gpt-4o");
	try {
		// Initialize the OpenAI client
		const client = new OpenAI({
			// baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
			// apiKey: process.env.GEMINI_API_KEY,

			baseURL:"https://api.aimlapi.com/v1",
			apiKey: process.env.AIMLAPI_API_KEY,
		});

		const result = await client.beta.chat.completions.parse({
			// model: "gemini-2.0-flash",
			model: "gpt-4o",
			max_tokens: 512,
			temperature: 0.5,
			top_p: 0.9,
			// extra_body: {
			//   top_k: 50,
			// },
			messages: [
				{
					role: "system",
					content: `${systemPrompt}`,
				},
				{
					role: "user",
					content: [
						{
							type: "image_url",
							image_url: { url: docBase64 },
							// caused Error : 400 status code (no body found)
							// image_url: { url: `data:image/jpeg;base64,${docBase64}` },
						},
					],
				},
			],
			response_format: zodResponseFormat(ResponseSchema, "response"),
		});

		if (!result) {
			throw new Error("No model response");
		}

		const outputText = result?.choices[0].message.parsed?.data;

		console.log(`Model : ${outputText}`);

		return {
			success: true,
			text: outputText,
		};
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message,
		};
	}
}
