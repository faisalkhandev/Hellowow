
"use server"


import sharp from "sharp";

export async function processImageWithOriginalFormat(formData: FormData): Promise<{ fileName: string; base64Image: string }> {
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
      .grayscale()
      .toFormat(format) // Use the original format
      .toBuffer();

  
    const base64String = processedBuffer.toString("base64");

    // Return the file name and Base64 image string
    return {
      fileName: file.name,
      base64Image: `data:image/${format};base64,${base64String}`,
    };
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Image processing failed.");
  }
}
