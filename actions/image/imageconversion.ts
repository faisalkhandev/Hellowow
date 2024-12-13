'use server';

import sharp from 'sharp';
import heicConvert from 'heic-convert';
import decode from 'heic-decode'



/**
 * Upscale an image using Sharp
 * @param base64Image - The Base64-encoded string of the image
 * @param scaleFactor - The scale factor for upscaling (e.g., 2 or 4)
 * @returns The Base64 string of the upscaled image
 */
export async function upscaleImageAction(base64Image: string, scaleFactor: number): Promise<string> {
  try {
    // Decode Base64 into a Buffer
    const fileBuffer = Buffer.from(base64Image, 'base64');

    // Get metadata for the image
    const metadata = await sharp(fileBuffer).metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Invalid image dimensions");
    }

    // Calculate new dimensions
    const newWidth = Math.round(metadata.width * scaleFactor);
    const newHeight = Math.round(metadata.height * scaleFactor);

    // Resize the image
    const upscaledBuffer = await sharp(fileBuffer)
      .resize(newWidth, newHeight)
      .toFormat('jpeg') // Ensure JPEG output
      .toBuffer();

    // Convert the resized image back to Base64
    return `data:image/jpeg;base64,${upscaledBuffer.toString('base64')}`;
  } catch (error) {
    console.error("Error upscaling image:", error);
    throw new Error("Upscaling failed");
  }
}


export async function sharpenImageAction(base64Image: string, sigma: number): Promise<string> {
  try {
  

    // Decode Base64 into a Buffer
    const fileBuffer = Buffer.from(base64Image, 'base64'); // Remove Base64 prefix if present

    // Apply sharpening using the scaled sigma value
    const sharpenedBuffer = await sharp(fileBuffer)
      .sharpen(sigma) // Apply sharpening with the scaled sigma
      .toFormat('jpeg') // Ensure output is in JPEG format
      .toBuffer();

    // Convert the sharpened image back to Base64
    return `data:image/jpeg;base64,${sharpenedBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error sharpening image:', error);
    throw new Error('Sharpening failed');
  }
}







export async function convertImageToJpeg(formData: FormData): Promise<{ fileName: string; base64Image: string }> {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file uploaded.");
  }
try{
  const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert the file to a Buffer
  const { format } = await sharp(fileBuffer).metadata();
   if (!format) {
     throw new Error("Unsupported or invalid image format.");
   }

   const processedBuffer = await sharp(fileBuffer)
   .jpeg({ quality: 100 }) 
   .toBuffer();

 
   const base64String = processedBuffer.toString("base64");

   const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ""); // Remove original extension
   const updatedFileName = `${fileNameWithoutExtension}.jpeg`;

   // Return the new file name and Base64 image string
   return {
     fileName: updatedFileName,
     base64Image: `data:image/jpeg;base64,${base64String}`, // Use the correct MIME type for JPEG
   };
 } catch (error) {
   console.error("Error processing image:", error);
   throw new Error("Image processing failed.");
 }
}


export async function convertImageToPng(formData: FormData): Promise<{ fileName: string; base64Image: string }> {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file uploaded.");
  }
try{
  const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert the file to a Buffer
  const { format } = await sharp(fileBuffer).metadata();
   if (!format) {
     throw new Error("Unsupported or invalid image format.");
   }

   const processedBuffer = await sharp(fileBuffer)
   .png({ quality: 100 }) 
   .toBuffer();

 
   const base64String = processedBuffer.toString("base64");

   const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ""); // Remove original extension
   const updatedFileName = `${fileNameWithoutExtension}.png`;

   // Return the new file name and Base64 image string
   return {
     fileName: updatedFileName,
     base64Image: `data:image/png;base64,${base64String}`, // Use the correct MIME type for JPEG
   };
 } catch (error) {
   console.error("Error processing image:", error);
   throw new Error("Image processing failed.");
 }
}
export async function convertImageToAvif(formData: FormData): Promise<{ fileName: string; base64Image: string }> {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file uploaded.");
  }
try{
  const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert the file to a Buffer
  const { format } = await sharp(fileBuffer).metadata();
   if (!format) {
     throw new Error("Unsupported or invalid image format.");
   }

   const processedBuffer = await sharp(fileBuffer)
   .avif({ quality: 100 }) 
   .toBuffer();

 
   const base64String = processedBuffer.toString("base64");

   const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ""); // Remove original extension
   const updatedFileName = `${fileNameWithoutExtension}.png`;

   // Return the new file name and Base64 image string
   return {
     fileName: updatedFileName,
     base64Image: `data:image/png;base64,${base64String}`, // Use the correct MIME type for JPEG
   };
 } catch (error) {
   console.error("Error processing image:", error);
   throw new Error("Image processing failed.");
 }
}

export async function HeicToJpgConversion(base64Image: string): Promise<string> {
  try {
    const base64Data = base64Image; 
    if (!base64Data) {
      throw new Error("Invalid Base64 image data");
    }
    
    const fileBuffer = Buffer.from(base64Data, 'base64');
    const uint8Array = new Uint8Array(fileBuffer.buffer, fileBuffer.byteOffset, fileBuffer.byteLength);
    const outputBuffer = await heicConvert({
      buffer: uint8Array,  // Pass Uint8Array instead of ArrayBuffer
      format: 'JPEG',      // Output format (JPEG)
      quality: 1,          // JPEG quality (0 to 1)
    });
    
    const buffer=Buffer.from(outputBuffer);

    // Step 3: Convert the resulting output buffer to Base64
    const base64Jpeg = buffer.toString('base64');
    const jpegBase64String = `data:image/jpeg;base64,${base64Jpeg}`;

    return jpegBase64String;
  } catch (error) {
    console.error('Error converting HEIC to JPEG:', error);
    throw new Error('Failed to convert HEIC image');
  }
}
export async function HeicToPngConversion(base64Image: string): Promise<string> {
  try {
    const base64Data = base64Image; 
    if (!base64Data) {
      throw new Error("Invalid Base64 image data");
    }
    
    const fileBuffer = Buffer.from(base64Data, 'base64');
    const uint8Array = new Uint8Array(fileBuffer.buffer, fileBuffer.byteOffset, fileBuffer.byteLength);
    const outputBuffer = await heicConvert({
      buffer: uint8Array,  // Pass Uint8Array instead of ArrayBuffer
      format: 'PNG',      // Output format (JPEG)
      quality: 1,          // JPEG quality (0 to 1)
    });
    
    const buffer=Buffer.from(outputBuffer);

    // Step 3: Convert the resulting output buffer to Base64
    const base64Jpeg = buffer.toString('base64');
    const jpegBase64String = `data:image/jpeg;base64,${base64Jpeg}`;

    return jpegBase64String;
  } catch (error) {
    console.error('Error converting HEIC to JPEG:', error);
    throw new Error('Failed to convert HEIC image');
  }
}







export async function HeicToAVIFConversion(formData: FormData): Promise<string> {
  try {
    // Retrieve the file from form data
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error("No file uploaded.");
    }

    // Convert file to ArrayBuffer and decode
    const arrayBuffer = new Uint8Array(await file.arrayBuffer())
    const decoded = await decode({ buffer: arrayBuffer });
    const imageData = Buffer.from(decoded.data);
 

    // Convert to AVIF using sharp
    const avifBuffer = await sharp(imageData, {
      raw: {
        width: decoded.width,
        height: decoded.height,
        channels: 4,  // Assuming HEIC images are decoded into RGBA
      },
    })
    .toFormat('avif', { quality: 50 })  // Set AVIF quality
    .toBuffer();

    // Convert the AVIF buffer to base64 string
    const base64 = avifBuffer.toString('base64');
    const avifBase64String = `data:image/avif;base64,${base64}`;

    return avifBase64String;
  } catch (error) {
    console.error('Error converting HEIC to AVIF:', error);
    throw new Error('Failed to convert HEIC image');
  }
}


import { exiftool } from 'exiftool-vendored';
import fs from 'fs';
import os from 'os';
import path from 'path';

export const extractImageMetadata = async (formData: FormData) => {
  let tempFilePath = '';
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file found in the FormData');
    }

    const fileBuffer = await file.arrayBuffer();
    const tempDir = os.tmpdir();
    tempFilePath = path.join(tempDir, `tempfile-${Date.now()}`);
    fs.writeFileSync(tempFilePath, Buffer.from(fileBuffer));

    const metadata = await exiftool.read(tempFilePath);
    if (!metadata) {
      return { error: 'No metadata found for this image.' };
    }

    return {
      width: metadata.ImageWidth || null,
      height: metadata.ImageHeight || null,
      mimeType: metadata.MIMEType || null,
      extension: metadata.FileTypeExtension || null,
      bitDepth: metadata.BitDepth || null,
      color: metadata.ColorSpace || null,
      megapixels: metadata.ImageWidth && metadata.ImageHeight ? (metadata.ImageWidth * metadata.ImageHeight) / 1000000 : null,
      ...metadata
    };
  } catch (error) {
    console.error('Failed to extract metadata from image:', error);
    // Optionally retry or handle differently based on the error type
    throw new Error('Failed to extract metadata from image');
  } finally {
    // Ensure the temporary file is cleaned up in case of success or failure
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
};