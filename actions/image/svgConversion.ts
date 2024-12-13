// Importing Potrace correctly, assuming it uses CommonJS export style
"use server"
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Potrace = require('potrace').Potrace;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharp = require('sharp');

// Utility function to convert the image to PNG format if it's not in PNG already
const convertToPng = async (inputBuffer) => {
  return sharp(inputBuffer)
    .png()
    .toBuffer();
};

/**
 * Convert PNG image to SVG using Potrace
 * @param {Buffer} pngBuffer - The PNG image buffer
 * @returns {Promise<string>} - A promise that resolves to the SVG string
 */
const convertPngToSvg = async (pngBuffer) => {
  return new Promise((resolve, reject) => {
    
    const potrace1 = new Potrace();
    console.log(potrace1);
    
    potrace1.loadImage(pngBuffer, (potrace1:Potrace,error) => {
      if (error) {
        reject('Error loading image for tracing: ' + error);
      } else {
        resolve(potrace1.getSVG());
      }
    });
  });
};

// Define the server action to handle file conversion
export const convertImageToSvg = async (formData) => {
  try {
    const file = formData.get('file');
    if (!file) {
      throw new Error('No file uploaded.');
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Convert the image to PNG format if necessary
    const pngBuffer = await convertToPng(fileBuffer);

    // Convert the PNG to SVG using Potrace
    const svg = await convertPngToSvg(pngBuffer);

    // Convert the SVG to base64 string for easy rendering
    const base64String = Buffer.from(svg).toString('base64');
    const fileName = file.name.replace(/\.[^/.]+$/, ""); // Removing file extension

    return {
      fileName: `${fileName}.svg`,
      base64Image: `data:image/svg+xml;base64,${base64String}`,
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Image conversion failed.');
  }
};