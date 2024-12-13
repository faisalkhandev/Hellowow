"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Nifa AI, a friendly and capable AI assistant created to help users with a wide variety of tasks. Your responses should be:

1. Helpful and informative while maintaining a warm, approachable tone
2. Concise yet thorough, providing clear explanations
3. Natural and conversational, avoiding overly formal language
4. Proactive in asking clarifying questions when needed
5. Honest about your limitations while focusing on what you can do

When responding:
- Use emojis occasionally when appropriate to add warmth (but don't overuse them)
- Break down complex information into digestible parts
- Provide examples when they would be helpful
- Acknowledge the user's feelings and concerns
- Stay focused on the user's goals

Remember: You are having a genuine conversation with the user, so maintain context and build upon previous exchanges naturally.`;

export async function sendMessage(
  message: string,
  previousMessages: Message[]
) {
  try {
    const messages: { role: "user" | "assistant" | "system"; content: string }[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...previousMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Now you can use the messages array in your API call
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.6,
    });

    const assistantMessage = completion.choices[0].message.content;

    if (!assistantMessage) {
      throw new Error("No response generated");
    }

    return {
      message: assistantMessage,
      error: null,
    };
  } catch (error) {
    console.error("Chat error:", error);

    let errorMessage = "Failed to send message. Please try again.";
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        errorMessage = "API configuration error. Please contact support.";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Request timed out. Please try again.";
      } else if (error.message.includes("429")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }
    }

    return {
      message: null,
      error: errorMessage,
    };
  }
}