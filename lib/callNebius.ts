import OpenAI from 'openai';
import fs from 'fs';
import { systemPrompt } from '@/constant';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

export async function callNebius(docBase64: string) {
  const ParagraphSchema = z.object({
    type: z.literal('paragraph'),
    content: z.string(),
  });

  // Define a schema for a bullet note
  const BulletSchema = z.object({
    type: z.literal('bullet'),
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

  console.log("I'm in nebius");
  console.log('docBase64 : ', docBase64);

  try {
    // Initialize the OpenAI client
    const client = new OpenAI({
      baseURL: 'https://api.studio.nebius.com/v1/',
      apiKey: process.env.NEBIUS_API_KEY,
    });

    const result = await client.beta.chat.completions.parse({
      model: 'google/gemma-3-27b-it',
      max_tokens: 512,
      temperature: 0.5,
      top_p: 0.9,
      // extra_body: {
      //   top_k: 50,
      // },
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: docBase64 },
            },
          ],
        },
      ],
      response_format: zodResponseFormat(ResponseSchema, 'response'),
    });

    if (!result) {
      throw new Error('No model response');
    }

    console.log('Result :', result);

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
