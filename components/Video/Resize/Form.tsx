"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomDropzone from '../Custom-dropzone';
import { acceptedVideoFiles } from '@/utils/video';
import { CompressedVideoInfo, FileActions, QualityType, VideoFormat, videoSettingsInput } from '@/types/compress';
import { Button } from '@/components/ui/button';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { toast } from "sonner";
import { VideoCondenseProgress } from '../VideoCondense';
import { ResizeVideo } from '@/utils/convert'; // Import the conversion function
import { Card } from '@/components/ui/card';

// Define the Zod schema for form validation
const schema = z.object({
  resolution: z.string()
    .regex(/^\d{1,4}:\d{1,4}$/, { message: "Resolution must be in the format 'width:height' (e.g., '1280:720')" })
    .nonempty("Resolution is required")
    .refine((val) => {
      // Ensure that the resolution only contains numbers and a single colon
      const parts = val.split(':');
      return parts.length === 2 && parts.every(part => /^\d+$/.test(part));
    }, { message: "Resolution must only contain numbers and a single colon." }),
});

type FieldValues = z.infer<typeof schema>; // Infer the type from the schema

const VideoCompressor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(schema), // Use Zod resolver for validation
  });
  const [video, setVideo] = useState<FileActions | undefined>(undefined);
  const [compressedVideoInfo, setCompressedVideoInfo] = useState<CompressedVideoInfo | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{ startTime?: Date; elapsedSeconds?: number; }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<"notStarted" | "converted" | "condensing">("notStarted");
  const [videoSettings] = useState<videoSettingsInput>({
    quality: QualityType.High,
    videoType: VideoFormat.MP4,
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (time?.startTime) {
      timer = setInterval(() => {
        const endTime = new Date();
        const timeDifference = endTime.getTime() - time.startTime!.getTime();
        setTime({ ...time, elapsedSeconds: timeDifference });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time]);



  const ffmpegRef = useRef(new FFmpeg());
  const disableDuringCompression = status === "condensing";

  useEffect(() => {
    loadWithToast();
  }, []);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
  };

  const loadWithToast = async () => {
    toast.promise(load, {
      error: "Error loading FFmpeg packages",
    });
  };

  // Correctly define the condense function
  const condense: SubmitHandler<FieldValues> = async (values) => {
    if (!video || !values.resolution) return; // Ensure resolution is provided
    try {
      setTime({ ...time, startTime: new Date() });
      setStatus("condensing");
      ffmpegRef.current.on("progress", ({ progress: completion }) => {
        const percentage = completion * 100;
        setProgress(percentage);
      });

      // Use the ResizeVideo function to convert the video with the specified resolution
      const { url, output, outputBlob } = await ResizeVideo(
        ffmpegRef.current,
        video,
        videoSettings, 
        values.resolution // Access resolution from values
      );

      // Get the size of the compressed audio
      const sizeInBytes = outputBlob.size; // Size in bytes
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2); // Convert to MB

      // Set compressed audio information
      setCompressedVideoInfo({
        url,
        name: output, // Use the output name from the conversion
        size: sizeInMB,
        type: "video/mp4", // Set the type for MP4
      });

      setVideo(undefined);
      setTime((oldTime) => ({ ...oldTime, startTime: undefined }));
      setStatus("converted");
      setProgress(0);
    } catch (err) {
      console.log(err);
      setStatus("notStarted");
      setProgress(0);
      setTime({ elapsedSeconds: 0, startTime: undefined });
      toast.error("Error condensing video");
    }
  };

  const handleUpload = (file: File) => {
    setVideo({
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      fileType: file.type,
      file,
      isError: false,
    });
  };

  const removeVideo = () => {
    setVideo(undefined); // Reset the video state
    setCompressedVideoInfo(null); // Reset compressed video info
    setStatus("notStarted"); // Reset status
    setProgress(0); // Reset progress
  };

  return (
    <>
      {status === "converted" && compressedVideoInfo ? (
        <div className="mt-4 w-full max-w-[940px] shadow-2xl border-none mx-auto">
          <div className="bg-blue-300 border rounded-md p-3 mt-2">
            <div className="flex items-center space-x-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p className="font-poppin text-white text-[0.89rem] font-[400]">
                  {compressedVideoInfo.name}
                </p>
                <p className="font-poppin text-white font-[400] text-sm">
                  {compressedVideoInfo.size} MB
                </p>
              </div>
            </div>
            <div className="flex justify-between space-x-2 mt-2">
              <Button
                variant="ghost"
                size="lg"
                className="hover:text-primary transition-colors h-10 py-1 rounded-lg"
                onClick={removeVideo} // Call removeVideo when clicked
              >
                Remove
              </Button>
              <Button className={`px-4 py-2 rounded-lg h-10 transition-colors font-poppin`}>
                <a
                  href={compressedVideoInfo.url}
                  download={compressedVideoInfo.name}
                  className="text-white underline"
                >
                  Download 
                </a>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {video ? (
            <>
               <Card className='w-full max-w-[940px] shadow-2xl border-none m-auto'>
               <div className="flex flex-col justify-center items-center h-[450px]">
              {status === "condensing" ? (
                <VideoCondenseProgress
                  progress={progress}
                  seconds={time.elapsedSeconds!}
                />
              ):(
<>
<form onSubmit={handleSubmit(condense)} className="flex justify-between space-x-2 mt-2">
                    <input
                      type="text" // Change to text to accept resolution in "width:height" format
                      placeholder="Enter resolution (e.g., 1280:720)"
                      {...register("resolution")}
                      className={`border rounded-md p-2 w-full ${errors.resolution ? 'border-red-500' : ''}`}
                    />
                    <Button
                      disabled={disableDuringCompression}
                      className={`px-4 py-2 rounded-lg h-10 transition-colors`}
                      type="submit" // Use submit type for the button
                    >
                      {disableDuringCompression ? "Converting..." : "Resize Video"}
                    </Button>
                  </form>
                  {errors.resolution && (
                    <p className="text-red-500 text-sm">{errors.resolution.message as string}</p> // Cast to string
                  )}


</>
              )}
           
                 
                </div>
              </Card>
            </>
          ) : (
            <CustomDropzone handleUpload={handleUpload} acceptedFile={acceptedVideoFiles} disabled={disableDuringCompression} />
          )}
        </>
      )}
    </>
  );
};

export default VideoCompressor;