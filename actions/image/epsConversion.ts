"use server"

import { removeFileExtension } from '@/utils/convert';
import sharp from 'sharp';

async function convertEps(fileBuffer: Buffer, format: string, fileName: string) {
  let processedBuffer: Buffer;
  const outputFileName = `${fileName}.${format}`;

  switch (format) {
    case 'png':
      // Convert EPS to PNG
      processedBuffer = await sharp(fileBuffer)
        .png()
        .toBuffer();
      break;
    case 'jpeg':
    case 'jpg':
      // Convert EPS to JPEG
      processedBuffer = await sharp(fileBuffer)
        .jpeg({ quality: 90 })
        .toBuffer();
      break;
    case 'svg':
      // Convert EPS to SVG (will output a vector SVG from EPS)
      processedBuffer = await sharp(fileBuffer)
        .toFormat('svg')
        .toBuffer();
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  return { processedBuffer, outputFileName };
}

// Server Action to convert EPS to PNG, JPEG, or SVG
export const convertImageAction = async (formData: FormData) => {
  const file = formData.get('file') as File;
  const format = formData.get('format') as string;
  const fileName = removeFileExtension(file.name);

  if (!file) {
    throw new Error('No file uploaded.');
  }

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Only process if the uploaded file is EPS format
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'eps') {
      throw new Error('Uploaded file is not an EPS file.');
    }

    // Convert the EPS file
    const { processedBuffer, outputFileName } = await convertEps(fileBuffer, format, fileName);
    const base64String = processedBuffer.toString('base64');

    // Return file name and base64 string for the converted file
    return {
      fileName: outputFileName,
      base64Image: `data:image/${format};base64,${base64String}`,
    };
  } catch (error) {
    console.error('Error processing EPS file:', error);
    throw new Error('EPS to image conversion failed.');
  }
}
