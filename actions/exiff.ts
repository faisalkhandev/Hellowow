// app/actions/uploadFile.ts
'use server';  // Mark this file as a server component

import { exiftool } from 'exiftool-vendored';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file provided');
  }

  // Create a temporary directory if it doesn't exist
  const tmpDir = path.join(process.cwd(), 'tmp');
  try {
    await fs.mkdir(tmpDir, { recursive: true });
  } catch (error) {
    console.error('Error creating tmp directory:', error);
  }

  // Create a temporary file path
  const tempFilePath = path.join(tmpDir, `temp-${Date.now()}-${file.name}`);

  try {
    // Convert the File object to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
console.log(tempFilePath);

    // Write the buffer to a temporary file
    await fs.writeFile(tempFilePath, buffer);

    // Extract metadata using exiftool
    const metadata = await exiftool.read(tempFilePath);
    console.log(metadata);

    // Clean up: delete the temporary file
    await fs.unlink(tempFilePath);
    
    // End the exiftool process
    await exiftool.end();

    return { success: true, metadata };
  } catch (error) {
    console.error('Error processing file:', error);
    
    // Ensure cleanup even on error
    try {
      await fs.unlink(tempFilePath);
    } catch (unlinkError) {
      console.error('Error deleting temporary file:', unlinkError);
    }
    
    await exiftool.end();
    throw new Error('Failed to process file');
  }
}