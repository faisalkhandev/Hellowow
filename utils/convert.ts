import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FileActions, videoSettingsInput } from "@/types/compress";
import { fetchFile } from "@ffmpeg/util";
import {
  customVideoCompressionCommand,
  customVideoConversionCommand,
  customVideoMuteCommand,
  customVideoTrimCommand,
  getResizeCommand,
 
} from "./ffmpegCommands";

export function getFileExtension(fileName: string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1];
  }

  return "";
}

export function removeFileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return fileName.slice(0, lastDotIndex);
  }
  return fileName;
}

export  async function compressFile(
  ffmpeg: FFmpeg,
  actionFile: FileActions,
  videoSettings: videoSettingsInput
): Promise<any> {
  const { file, fileName, fileType } = actionFile;
  
  const output = removeFileExtension(fileName) + "_compressed." + videoSettings.videoType;
  ffmpeg.writeFile(fileName, await fetchFile(file));
  const command = customVideoCompressionCommand(fileName, output, videoSettings);
  await ffmpeg.exec(command);
  const data = await ffmpeg.readFile(output);

  const blob = new Blob([data], { type: fileType.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return { url, output, outputBlob: blob };
}





export  async function ConvertVideoFile(
  ffmpeg: FFmpeg,
  actionFile: FileActions,
  videoSettings: videoSettingsInput
): Promise<any> {
  const { file, fileName, fileType } = actionFile;

  const outputExtension = videoSettings.videoType;
  console.log("output extention",outputExtension);
  
  const output = `${removeFileExtension(fileName)}_converted.${outputExtension}`;


  ffmpeg.writeFile(fileName, await fetchFile(file));

  
  const command = customVideoConversionCommand(fileName, output, videoSettings);
  
  // Execute the FFmpeg command
  await ffmpeg.exec(command);

  // Read the output file from FFmpeg's virtual file system
  const data = await ffmpeg.readFile(output);

  // Create a Blob from the output data
  const blob = new Blob([data], { type: fileType.split("/")[0] });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Return the URL, output filename, and Blob
  return { url, output, outputBlob: blob };
}












export async function ResizeVideo(
  ffmpeg: FFmpeg,
  actionFile: FileActions,
  videoSettings: videoSettingsInput,
  resolution: string // Add resolution parameter
): Promise<any> {
  const { file, fileName, fileType } = actionFile;

  const outputExtension = videoSettings.videoType;
  console.log("output extension", outputExtension);
  
  const output = `${removeFileExtension(fileName)}_converted.${outputExtension}`;

  // Write the input file to FFmpeg's virtual file system
  ffmpeg.writeFile(fileName, await fetchFile(file));
  
  // Create the command for video conversion with resizing
  const command = getResizeCommand(fileName, output, resolution);
  
  // Execute the FFmpeg command
  await ffmpeg.exec(command);

  // Read the output file from FFmpeg's virtual file system
  const data = await ffmpeg.readFile(output);

  // Create a Blob from the output data
  const blob = new Blob([data], { type: fileType.split("/")[0] });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Return the URL, output filename, and Blob
  return { url, output, outputBlob: blob };
}















export  async function MuteVideoFile(
  ffmpeg: FFmpeg,
  actionFile: FileActions,
  videoSettings: videoSettingsInput
): Promise<any> {
  const { file, fileName, fileType } = actionFile;

  const outputExtension = videoSettings.videoType;
  console.log("output extention",outputExtension);
  
  const output = `${removeFileExtension(fileName)}_converted.${outputExtension}`;


  ffmpeg.writeFile(fileName, await fetchFile(file));

  
  const command = customVideoMuteCommand(fileName, output);
  
  // Execute the FFmpeg command
  await ffmpeg.exec(command);

  // Read the output file from FFmpeg's virtual file system
  const data = await ffmpeg.readFile(output);

  // Create a Blob from the output data
  const blob = new Blob([data], { type: fileType.split("/")[0] });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Return the URL, output filename, and Blob
  return { url, output, outputBlob: blob };
}


export const formatTime = (seconds: number): string => {
  seconds = Math.round(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "hr";
    if (minutes > 0 || remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (minutes > 0) {
    formattedTime += `${minutes.toString()} min`;
    if (remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (remainingSeconds > 0 || formattedTime === "") {
    formattedTime += `${remainingSeconds} sec`;
  }

  return formattedTime;
};








export async function TrimVideoFile(
  ffmpeg: FFmpeg,
  startTime: number,
  endTime: number,
  actionFile: FileActions,
  videoSettings: videoSettingsInput
): Promise<any> {
  const { file, fileName, fileType } = actionFile;

  // Validate start and end times
  if (startTime < 0 || endTime <= startTime) {
    throw new Error("Invalid start or end time.");
  }

  const output = removeFileExtension(fileName) + "_trimmed." + videoSettings.videoType;

  // Write the video file to FFmpeg's virtual file system
  ffmpeg.writeFile(fileName, await fetchFile(file));

  // Get the custom command for trimming
  const command = customVideoTrimCommand(fileName, output, startTime, endTime);
  console.log("FFmpeg command:", command); // Log the command for debugging

  // Execute the FFmpeg command to trim the video
  try {
    console.log("kikiikik");
    
    await ffmpeg.exec(command);
    console.log("looooooo");

  } catch (error) {
    console.error("FFmpeg execution error:", error);
    throw new Error("Error during video trimming.");
  }

  // Read the output file from FFmpeg's virtual file system
  const data = await ffmpeg.readFile(output);

  // Create a Blob from the output data
  const blob = new Blob([data], { type: fileType.split("/")[0] });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Return the URL and output filename
  return { url, output };
}




