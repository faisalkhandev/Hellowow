'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function extractTextFromImage(base64Image:string,mimeType:string) {
  try {
const gemeni_key=process.env.GEMINI_API_KEY;
if(!gemeni_key) return "Api Key not valid";



    const client = new GoogleGenerativeAI(gemeni_key);

    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt ="Extract only the visible text from the provided image. Ensure the extraction is clear and accurate, including only the text that appears in the image without adding any additional content. Present the extracted text in a clean and properly formatted manner.";
    const image = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, image]);
    return result.response.text();
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error('Failed to extract text from image');
  }
}
