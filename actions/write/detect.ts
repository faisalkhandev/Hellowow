"use server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

interface DetectionResult {
  success: boolean;
  originalText: string;
  realProb?: number;
  fakeProb?: number;
  error?: string;
  classification?: string;
}

export async function detectAIText(text: string): Promise<DetectionResult> {
  if (!text.trim()) {
    return {
      success: false,
      originalText: text,
      error: "Text is required",
    };
  }

  try {
    const result = await hf.textClassification({
      model: "roberta-base-openai-detector",
      inputs: text.slice(0, 1000), // This model can handle longer text
    });

    // The model returns "Real" vs "Fake" probabilities
    const realProb = result.find((r) => r.label === "Real")?.score || 0;
    const fakeProb = result.find((r) => r.label === "Fake")?.score || 0;

    // Classification based on confidence threshold
    const classification =
      realProb > fakeProb ? "Human-written" : "AI-generated";

    return {
      success: true,
      originalText: text,
      realProb: realProb * 100,
      fakeProb: fakeProb * 100,
      classification,
    };
  } catch (error) {
    console.error("Error in AI detection:", error);
    return {
      success: false,
      originalText: text,
      error: error instanceof Error ? error.message : "Failed to analyze text",
    };
  }
}
