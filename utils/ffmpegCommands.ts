import { VideoFormat, videoSettingsInput } from "@/types/compress";
import { getFileExtension } from "./convert";

export const customVideoCompressionCommand = (
  input: string,
  output: string,
  videoSettings: videoSettingsInput
): string[] => {
  const inputType = getFileExtension(input);
  if (inputType === "mp4") {
    return getMP4toMP4Command(input, output, videoSettings);
  } else {
    switch (videoSettings.videoType) {
      case VideoFormat.MP4:
        return getMP4Command(input, output, videoSettings);
      case VideoFormat.AVI:
        return getAVICommand(input, output, videoSettings);
      case VideoFormat.MKV:
        return getMKVCommand(input, output, videoSettings);
      case VideoFormat.MOV:
        return getMOVCommand(input, output, videoSettings);
      default:
        return ["-i", input, output];
    }
  }
};

const getMP4toMP4Command = (
  input: string,
  output: string,
  videoSettings: videoSettingsInput
) => {
  const ffmpegCommand = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "superfast", // Use a faster preset
    "-crf",
    "25", // Adjust CRF for more compression
    "-c:a",
    "aac",
    "-b:a",
    "128k", // Adjust audio bitrate if necessary
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
  return ffmpegCommand;
};

const getMP4Command = (
  input: string,
  output: string,
  videoSettings: videoSettingsInput
) => {
  const ffmpegCommand = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "superfast", // Use a faster preset
    "-crf",
    "25", // Adjust CRF for more compression
    "-c:a",
    "aac",
    "-b:a",
    "128k", // Adjust audio bitrate if necessary
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];

  if (videoSettings.removeAudio) {
    ffmpegCommand.push("-an"); // Remove audio if specified
  }

  return ffmpegCommand;
};


export const getResizeCommand = (
  input: string,
  output: string,
  resolution: string // e.g., "1280:720"
) => {
  const ffmpegCommand = [
    "-i",
    input,
    "-vf", // Video filter option
    `scale=${resolution}`, // Add scale filter for resizing
    "-c:v",
    "libx264", // Video codec
    "-preset",
    "superfast", // Use a faster preset
    "-crf",
    "25", // Adjust CRF for more compression
    output, // Output file
  ];

  return ffmpegCommand;
};











const getMOVCommand = (
  input: string,
  output: string,
  videoSettings: videoSettingsInput
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const ffmpegCommand = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "superfast", // Use a faster preset
    "-crf",
    "25", // Adjust CRF for more compression
    ...audioOptions,
    output,
  ];

  return ffmpegCommand;
};

const getMKVCommand = (
  input: string,
  output: string,
  videoSettings: videoSettingsInput
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const ffmpegCommand = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "superfast", // Use a faster preset
    "-crf",
    "25", // Adjust CRF for more compression
    ...audioOptions,
    output,
  ];

  return ffmpegCommand;
};

const getAVICommand = (
  input: string,
  output: string,
  videoSettings: videoSettingsInput
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const ffmpegCommand = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "superfast", // Use a faster preset
    "-crf",
    "25", // Adjust CRF for more compression
    ...audioOptions,
    output,
  ];

  return ffmpegCommand;
};




//Conversion Command



export const customVideoConversionCommand = (
  input: string,
  output: string,
  videoSettings: videoSettingsInput
): string[] => {
  const inputType = getFileExtension(input);

  switch (inputType) {
    case "mp4":
      if (output.endsWith(".mp3")) {
        return getMP4toMP3Command(input, output);
      } else if (output.endsWith(".webp")) {
        return getVideoToWebPCommand(input, output);
      }
      else if (output.endsWith(".gif")) {
        return getMP4toGIFCommand(input, output);
      }
      else if (output.endsWith(".avi")) {
        return getMP4toAVICommand(input, output);
      }
      else if (output.endsWith(".mov")) {
        return getMP4toMOVCommand(input, output);
      }
     else if (output.endsWith(".webm")) {
        return getMP4toWEBMCommand(input, output);
      }
    else  if (output.endsWith(".wav")) {
        return getMP4toWAVCommand(input, output);
      }
     else if (output.endsWith(".ogg")) {
        return getMP4toOGGCommand(input, output);
      }
      break;
      
      case "avi":
        if (output.endsWith(".mp4")) {
          return getAVItoMP4Command(input, output);
        }
       
        else  if (output.endsWith(".mov")) {
            return getAVItoMOVCommand(input, output);
          }
         else if (output.endsWith(".mp3")) {
            return getAVItoMP3Command(input, output);
          }
         else if (output.endsWith(".mkv")) {
            return getAVItoMKVCommand(input, output);
          }
          else if (output.endsWith(".gif")) {
            return getAVItoGIFCommand(input, output);
          }

        break;
      case "mkv":
        if (output.endsWith(".mp4")) {
          return getMKVtoMP4Command(input, output);
        }
        break;
    case "mp3":
      if (output.endsWith(".mp4")) {
        return getMP3toMP4Command(input, output);
      }
      break;
    case "webm":
      if (output.endsWith(".mp4")) {
        console.log("Converting WEBM to MP4");
        return getWEBMtoMP4Command(input, output);
      }
      break;
      case "m4a": // Add case for M4A
      if (output.endsWith(".mp3")) {
        console.log("Converting M4A to MP3");
        return getM4AtoMP3Command(input, output);
      }
      else  if (output.endsWith(".wav")) {
        console.log("Converting MP4 to WAV");
        return getM4AtoWAVCommand(input, output);
      }
      
       else if (output.endsWith(".mp4")) {
          console.log("Converting M4A to MP4");
          return getM4AtoMP4Command(input, output);
        }
       
      break;
      case "ogg":
        if (output.endsWith(".mp3")) {
          console.log("Converting OGG to MP3");
          return getOGGtoMP3Command(input, output);
        }
        else if (output.endsWith(".wav")) {
          console.log("Converting OGG to WAV");
          return getOGGtoWAVCommand(input, output);
        }
        break;

      case "webm":
        if (output.endsWith(".mp4")) {
          console.log("Converting WEBM to MP4");
          return getWEBMtoMP4Command(input, output);
        }
    
        else  if (output.endsWith(".mp3")) {
            console.log("Converting WEBM to MP3");
            return getWEBMtoMP3Command(input, output);
          }
         else if (output.endsWith(".webm")) {
            return getGIFtoWEBMCommand(input, output);
          }
         else if (output.endsWith(".mov")) {
            console.log("Converting WEBM to MOV");
            return getWEBMtoMOVCommand(input, output);
          }
     
        break;
        case "aac":
          if (output.endsWith(".mp3")) {
            console.log("Converting AAC to MP3");
            return getAACtoMP3Command(input, output);
          }
          else if (output.endsWith(".wav")) {
            console.log("Converting AAC to WAV without compression");
            return getAACtoWAVCommand(input, output);
          }
         else if (output.endsWith(".mp4")) {
            console.log("Converting AAC to MP4 without compression");
            return getAACtoMP4Command(input, output);
          }

          if (output.endsWith(".m4r")) {
            console.log("Converting AAC to M4R without compression");
            return getAACtoM4RCommand(input, output);
          }
          else if (output.endsWith(".flac")) {
            console.log("Converting AAC to FLAC without compression");
            return getAACtoFLACCommand(input, output);
          }

          break;
          case "mkv":
            if (output.endsWith(".mp3")) {
              console.log("Converting MKV to MP3");
              return getMKVtoMP3Command(input, output);
            }
           else if (output.endsWith(".mov")) {
              console.log("Converting MKV to MOV without compression");
              return getMKVtoMOVCommand(input, output);
            }
           else if (output.endsWith(".gif")) {
              console.log("Converting MKV to GIF without compression");
              return getMKVtoGIFCommand(input, output);
            }
            break;
            case "gif":
              if (output.endsWith(".mov")) {
                console.log("Converting GIF to MOV");
                return getGIFtoMOVCommand(input, output);
              }
             
              else  if (output.endsWith(".avi")) {
                  console.log("Converting MKV to AVI");
                  return getMKVtoAVICommand(input, output);
                }
                else  if (output.endsWith(".mp4")) {
                  return getGIFtoMP4Command(input, output);
                }
              
              break;
              case "jpg":
                if (output.endsWith(".gif")) {
                  return getJPGtoGIFCommand(input, output);
                }
                break;
      case "mov":
        if (output.endsWith(".mp4")) {
          console.log("Converting MOV to MP4");
          return getMOVtoMP4Command(input, output);
        } else if (output.endsWith(".webp")) {
          console.log("Converting MOV to WebP");
          return getVideoToWebPCommand(input, output);
        }
        else if (output.endsWith(".gif")) {
          console.log("Converting MOV to GIF");
          return getMOVtoGIFCommand(input, output);
        }
        else if (output.endsWith(".mp3")) {
          console.log("Converting MOV to MP3");
          return getMOVtoMP3Command(input, output);
        }
        else if (output.endsWith(".avi")) {
          console.log("Converting MOV to AVI");
          return getMOVtoAVICommand(input, output);
        }
       else if (output.endsWith(".wav")) {
          console.log("Converting MOV to WAV without compression");
          return getMOVtoWAVCommand(input, output);
        }
        break;
    // Add more cases as needed for other formats
    default:
      // Return a default command or throw an error
      throw new Error(`Unsupported conversion from ${inputType} to ${output}`);
  }

  // Ensure a return statement is present
  return []; // Return an empty array or a default command if needed
};

const getMP4toMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-q:a",
    "0", // Best audio quality
    "-map",
    "a", // Select audio stream
    output,
  ];
};


const getAVItoGIFCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-vf",
    "fps=10,scale=320:-1:flags=lanczos", // Adjust fps and scale as needed
    "-c:v",
    "gif", // Specify GIF codec
    output,
  ];
};

const getOGGtoWAVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-acodec",
    "pcm_s16le", // Use PCM signed 16-bit little-endian codec
    "-ar",
    "44100", // Set audio sample rate to 44100 Hz
    "-ac",
    "2", // Set number of audio channels to 2 (stereo)
    output,
  ];
};

const getAVItoMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-q:a",
    "0", // Best audio quality
    "-map",
    "a", // Select audio stream
    output,
  ];
};

const getAVItoMKVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "copy", // Copy the video stream without re-encoding
    "-c:a",
    "copy", // Copy the audio stream without re-encoding
    output,
  ];
};




const getMKVtoMOVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "copy", // Copy the video stream without re-encoding
    "-c:a",
    "copy", // Copy the audio stream without re-encoding
    output,
  ];
};

const getAACtoMP4Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:a",
    "copy", // Copy the audio stream without re-encoding
    output,
  ];
};


const getAACtoFLACCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:a",
    "flac", // Use FLAC codec for audio
    output,
  ];
};



const getAACtoM4RCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:a",
    "copy", // Copy the audio stream without re-encoding
    output,
  ];
};

const getMKVtoMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-q:a",
    "0", // Best audio quality
    "-map",
    "a", // Select audio stream
    output,
  ];
};

const getMP4toWAVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-acodec",
    "pcm_s16le", // Use PCM signed 16-bit little-endian codec
    "-ar",
    "44100", // Set audio sample rate to 44100 Hz
    "-ac",
    "2", // Set number of audio channels to 2 (stereo)
    output,
  ];
};


const getMOVtoWAVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-acodec",
    "copy", // Copy the audio stream without re-encoding
    output,
  ];
};


const getGIFtoWEBMCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libvpx", // Use VP8 codec for video
    "-b:v",
    "1M", // Set video bitrate
    "-c:a",
    "libvorbis", // Use Vorbis codec for audio
    output,
  ];
};

const getGIFtoMP4Command = (input: string, output: string): string[] => {
  return [
    "-i", input,                 // Input file
    "-movflags", "faststart",   // Optimize MP4 for fast starting when streamed
    "-pix_fmt", "yuv420p",      // Set pixel format to yuv420p for broad compatibility
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", // Ensure dimensions are even (required by yuv420p)
    "-c:v", "libx264",          // Video codec to use
    "-preset", "veryfast",      // Encoding speed/quality trade-off (faster encoding)
    "-crf", "23",               // Constant Rate Factor (quality level, where lower is better and typical range is 18-28)
    output                      // Output file
  ];
};


const getJPGtoGIFCommand = (input: string, output: string): string[] => {
  return [
    "-i", input,                 // Input file
    "-vf", "fps=10,scale=320:-1:flags=lanczos", // Set frame rate and scale, apply Lanczos filter
    "-loop", "0",               // Loop output GIF
    output                      // Output file
  ];
};
const getAVItoMOVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "aac", // Use AAC codec for audio
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
};

const getMKVtoAVICommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "libmp3lame", // Use MP3 codec for audio
    output,
  ];
};


const getMKVtoGIFCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-vf",
    "fps=10,scale=320:-1:flags=lanczos", // Adjust fps and scale as needed
    "-c:v",
    "gif", // Specify GIF codec
    output,
  ];
};

const getWEBMtoMOVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "aac", // Use AAC codec for audio
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
};

const getM4AtoMP4Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "copy", // Copy the video stream (if any)
    "-c:a",
    "aac", // Use AAC codec for audio
    output,
  ];
};


const getGIFtoMOVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-pix_fmt",
    "yuv420p", // Set pixel format
    output,
  ];
};

const getMOVtoAVICommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "libmp3lame", // Use MP3 codec for audio
    output,
  ];
};
 


const getWEBMtoMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-q:a",
    "0", // Best audio quality
    "-map",
    "a", // Select audio stream
    output,
  ];
};
const getM4AtoWAVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-acodec",
    "pcm_s16le", // Use PCM signed 16-bit little-endian codec
    "-ar",
    "44100", // Set audio sample rate to 44100 Hz
    "-ac",
    "2", // Set number of audio channels to 2 (stereo)
    output,
  ];
};

const getMP4toMOVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "copy", // Copy the video stream without re-encoding
    "-c:a",
    "aac", // Use AAC codec for audio
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
};

const getAVItoMP4Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "aac", // Use AAC codec for audio
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
};

const getMOVtoMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-q:a",
    "0", // Best audio quality
    "-map",
    "a", // Select audio stream
    output,
  ];
};


const getMKVtoMP4Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "copy", // Copy the video stream without re-encoding
    "-c:a",
    "aac", // Use AAC codec for audio
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
};


const getOGGtoMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-codec:a",
    "libmp3lame", // Use the LAME MP3 encoder
    "-q:a",
    "2", // Set the quality (0-9, where 0 is best quality)
    output,
  ];
};


const getAACtoMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-codec:a",
    "libmp3lame", // Use the LAME MP3 encoder
    "-q:a",
    "2", // Set the quality (0-9, where 0 is best quality)
    output,
  ];
};

const getMP4toWEBMCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libvpx", // Use VP8 codec for video
    "-c:a",
    "libvorbis", // Use Vorbis codec for audio
    output,
  ];
};




const getMP3toMP4Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "copy", // Copy video stream (if any)
    "-c:a",
    "aac", // Convert audio to AAC
    output,
  ];
};



const getMOVtoMP4Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "aac", // Convert audio to AAC
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
};

const getMOVtoGIFCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-vf",
    "fps=10,scale=320:-1:flags=lanczos", // Adjust fps and scale as needed
    "-c:v",
    "gif",
    output,
  ];
};



const getM4AtoMP3Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-q:a",
    "0", // Best audio quality
    "-map",
    "a", // Select audio stream
    output,
  ];
};

const getMP4toOGGCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:a",
    "libvorbis", // Use Vorbis codec for audio
    "-q:a",
    "5", // Set the quality (0-10, where 0 is best quality)
    output,
  ];
};



export const customVideoMuteCommand = (
  input: string,
  output: string
): string[] => {
  return [
    "-i",
    input,
    "-an", // Disable audio
    output,
  ];
};

const getVideoToWebPCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-vcodec",
    "libwebp", // Use the WebP codec
    "-lossless",
    "1", // Set to 1 for lossless compression, or 0 for lossy
    "-q:v",
    "80", // Quality setting (0-100), where 100 is the best quality
    "-preset",
    "picture", // Use the picture preset for better quality
    output,
  ];
};


export function customVideoTrimCommand(inputFile: string, outputFile: string, startTime: number, endTime: number): string[] {
  return ['-i', inputFile, '-ss', startTime.toString(), '-to', endTime.toString(), '-c', 'copy', outputFile];
}



const getMP4toGIFCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-vf",
    "fps=10,scale=320:-1:flags=lanczos", // Adjust fps and scale as needed
    "-c:v",
    "gif",
    output,
  ];
};



const getMP4toAVICommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "mp3", // Use MP3 codec for audio
    output,
  ];
};

const getWEBMtoMP4Command = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264", // Use H.264 codec for video
    "-c:a",
    "aac", // Use AAC codec for audio
    "-movflags",
    "faststart", // Helps with streaming the video
    output,
  ];
};


const getAACtoWAVCommand = (input: string, output: string): string[] => {
  return [
    "-i",
    input,
    "-acodec",
    "copy", // Copy the audio stream without re-encoding
    output,
  ];
};