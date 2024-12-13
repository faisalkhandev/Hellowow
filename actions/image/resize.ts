"use server";

import sharp from "sharp";

export async function resizeImageAction(
  base64Image: string,
  width: number,
  height: number,
  maintainAspectRatio: boolean
): Promise<string> {
  try {
    // Decode base64 image to a Buffer
    const buffer = Buffer.from(base64Image, "base64");

    let sharpImage = sharp(buffer);

    if (maintainAspectRatio) {
      sharpImage = sharpImage.resize({ width }); // Resize with aspect ratio
    } else {
      sharpImage = sharpImage.resize({ width, height }); // Resize to specified dimensions
    }

    // Generate resized image buffer
    const resizedBuffer = await sharpImage.toBuffer();

    // Convert the resized image back to base64
    return `data:image/png;base64,${resizedBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Error resizing the image:", error);
    throw new Error("Image resizing failed.");
  }
}
