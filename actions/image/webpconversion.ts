"use server"

import { removeFileExtension } from '@/utils/convert';
import sharp from 'sharp';

async function convertWebp(fileBuffer: Buffer, format: string,fileName:string) {
  let processedBuffer: Buffer;
  const outputFileName = `${fileName}.${format}`;

  switch (format) {
    case 'png':
      processedBuffer = await sharp(fileBuffer).png().toBuffer();
      break;
    case 'jpeg':
    case 'jpg':
      processedBuffer = await sharp(fileBuffer).jpeg({ quality: 90 }).toBuffer();
      break;
    case 'gif':
      processedBuffer = await sharp(fileBuffer).gif().toBuffer();
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  return { processedBuffer, outputFileName };
}

// Server Action that will accept the file and target format, then return the converted image and file name
export const convertImageAction =async(formData: FormData) => {
  const file = formData.get('file') as File;
  const format = formData.get('format') as string;
  const fileName=removeFileExtension(file.name)

  

  
  if (!file) {
    throw new Error('No file uploaded.');
  }

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const { processedBuffer, outputFileName } = await convertWebp(fileBuffer, format,fileName);
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
