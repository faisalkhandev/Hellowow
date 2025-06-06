"use server"

import { removeFileExtension } from '@/utils/convert';
import sharp from 'sharp';

async function convertJpg(fileBuffer: Buffer, format: string, fileName: string) {
  let processedBuffer: Buffer;
  const outputFileName = `${fileName}.${format}`;

  switch (format) {
    case 'png':
      processedBuffer = await sharp(fileBuffer).png().toBuffer();
      break;
    case 'webp':
      processedBuffer = await sharp(fileBuffer).webp().toBuffer();
      break;
    case 'gif':
      processedBuffer = await sharp(fileBuffer).gif().toBuffer();
      break;
    case 'tiff': // Adding TIFF format
    case 'tif':  // Adding TIF format as an alternative case
      processedBuffer = await sharp(fileBuffer).tiff({
        compression: 'lzw', // Example compression option
        quality: 90         // Example quality setting
      }).toBuffer();
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  return { processedBuffer, outputFileName };
}

// Server Action that will accept the file and target format, then return the converted image and file name
export const convertImageAction = async (formData: FormData) => {
  const file = formData.get('file') as File;
  const format = formData.get('format') as string;
  const fileName = removeFileExtension(file.name);

  if (!file) {
    throw new Error('No file uploaded.');
  }

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const { processedBuffer, outputFileName } = await convertJpg(fileBuffer, format, fileName);
    const base64String = processedBuffer.toString('base64');

    // Return file name and base64 string
    return {
      fileName: outputFileName,
      base64Image: `data:image/${format};base64,${base64String}`,
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Image processing failed.');
  }
}