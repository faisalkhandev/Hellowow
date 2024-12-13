"use server";

import sharp from "sharp";
import { decode, decodeFrames, encode } from "modern-gif";

// Ensure workerUrl is correctly imported if using a bundler
// import workerUrl from 'modern-gif/worker?url';

export async function compressImageAction(
  base64Image: string,
  quality: number,
  lossless: boolean,
  format: string
): Promise<string> {
  try {
    // Convert base64 string to a Buffer
    const buffer = Buffer.from(base64Image, "base64");
    return await handleStaticImage(buffer, format, quality, lossless);
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error("Image compression failed.");
  }
}



// Handle static image compression using sharp
async function handleStaticImage(
  buffer: Buffer,
  format: string,
  quality: number,
  lossless: boolean
): Promise<string> {
  try {
    let sharpImage = sharp(buffer);

    // Configure Sharp for the specified format
    switch (format) {
      case "jpeg":
      case "jpg":
        sharpImage = sharpImage.jpeg({ quality: lossless ? 100 : quality });
        break;
      case "png":
        sharpImage = sharpImage.png({
          compressionLevel: lossless ? 0 : Math.ceil((100 - quality) / 10),
        });
        break;
      case "webp":
        sharpImage = sharpImage.webp({ quality: lossless ? 100 : quality });
        break;
      case "avif":
        sharpImage = sharpImage.avif({ quality: lossless ? 100 : quality });
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Compress the image
    const compressedBuffer = await sharpImage.toBuffer();

    // Convert back to base64
    return `data:image/${format};base64,${compressedBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Error compressing static image:", error);
    throw new Error("Static image compression failed.");
  }
}




