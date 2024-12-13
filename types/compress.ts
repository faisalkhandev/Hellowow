export  type FileActions={
  file:File,
  fileName:string,
  fileSize:number,
  from:string,
  fileType:string,
  isError?:boolean,
  url?:string,
  output?:unknown,
  outputBlob?:Blob
}
export enum QualityType {
  Low = "20",
  Medium = "18",
  High = "15",
}


export enum VideoFormat {
  MP4 = "mp4",
  MKV = "mkv",
  MOV = "mov",
  AVI = "avi",
  FLV = "flv",
  WEBM = "webm",
  MP3 = "mp3",
  WEBP = "webp",
  GIF = "gif",
  WAV = "wav", // Added WAV format
  OGG = "ogg", // Added OGG format
  M4R = "m4r", // Added M4R format
  FLAC = "flac" // Added FLAC format
}
export type videoSettingsInput={
  quality:QualityType,
  videoType:VideoFormat,
  customEndTime:number,
  customStartTime:number,
  removeAudio:false,
 

}

// Define the type for compressed video information
export type CompressedVideoInfo= {
  url: string; // URL of the compressed video
  name: string; // Name of the output file
  size: string; // Size of the file in MB (as a string)
  type: string; // MIME type of the file (e.g., "video/mp4", "audio/mpeg")
}



export type videoConvertionInput={
  quality:QualityType,
  videoType:VideoFormat,
  customEndTime:number,
  customStartTime:number,
  removeAudio:false,
 

}