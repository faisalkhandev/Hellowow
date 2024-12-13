"use server";

import ytdl from "ytdl-core";
import OpenAI from "openai";

import fs from "fs";
import path from "path";


// import { getSubtitles } from "youtube-captions-scraper";


interface TranscriptResponse {
  success: boolean;
  summary?: string;
  error?: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getTranscript(url: string): Promise<TranscriptResponse> {
  try {
    if (!ytdl.validateURL(url)) {
      return {
        success: false,
        error: "Invalid YouTube URL",
      };
    }

    // Get video info including captions
    const videoInfo = await ytdl.getInfo(url);

    // Get available captions tracks
    const captions = videoInfo.player_response.captions;
    if (!captions || !captions.playerCaptionsTracklistRenderer) {
      return {
        success: false,
        error: "No captions available for this video",
      };
    }

    // Get caption tracks
    const tracks = captions.playerCaptionsTracklistRenderer.captionTracks;
    if (!tracks || tracks.length === 0) {
      return {
        success: false,
        error: "No caption tracks found",
      };
    }

    // Find English captions or auto-generated captions
    const captionTrack = tracks.find(
      (track: any) => track.languageCode === "en" || track.kind === "asr"
    );

    if (!captionTrack) {
      return {
        success: false,
        error: "No English captions found",
      };
    }

    // Fetch the caption track XML
    const response = await fetch(captionTrack.baseUrl);
    const transcriptXml = await response.text();

    // Parse the XML to extract text
    const transcriptText = parseTranscriptXml(transcriptXml);

    // Get summary using GPT
    const summary = await summarizeWithGPT(transcriptText);

    return {
      success: true,
      summary,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

function parseTranscriptXml(xml: string): string {
  // Simple XML parsing - you might want to use a proper XML parser for production
  const textContent = xml
    .replace(/<text[^>]*>/g, "")
    .replace(/<\/text>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return textContent.trim();
}

async function summarizeWithGPT(text: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides clear, concise summaries of YouTube video transcripts.",
      },
      {
        role: "user",
        content: `Please summarize this YouTube video transcript in a clear and engaging way: ${text}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return completion.choices[0].message.content!;
}


export interface TranscriptionResponse {
  text?: string;
  error?: string;
}

export async function transcribeAudio(
  formData: FormData
): Promise<TranscriptionResponse> {
  try {
    const audioFile = formData.get("audio");
    if (!audioFile || !(audioFile instanceof File)) {
      return { error: "No valid audio file provided" };
    }

    if (audioFile.size > 25 * 1024 * 1024) {
      return { error: "Audio file must be less than 25MB" };
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    if (!transcription.text) {
      return { error: "No transcription received" };
    }

    return { text: transcription.text };
  } catch (error) {
    console.error("Transcription error:", error);
    return { error: "Failed to transcribe audio" };
  }
}













