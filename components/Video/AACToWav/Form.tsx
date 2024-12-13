"use client";

import React, { useEffect, useRef, useState } from 'react';
import CustomDropzone from '../Custom-dropzone';
import { acceptedVideoFiles } from '@/utils/video';
import { CompressedVideoInfo, FileActions, QualityType, VideoFormat, videoSettingsInput } from '@/types/compress';
import VideoDisplay from '../VideoDisplay';
import { Button } from '@/components/ui/button';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { toast } from "sonner";
import { VideoCondenseProgress } from '../VideoCondense';
import { ConvertVideoFile } from '@/utils/convert'; // Import the conversion function

const VideoCompressor = () => {
  const [video, setVideo] = useState<FileActions | undefined>(undefined);
  const [compressedVideoInfo, setCompressedVideoInfo] = useState<CompressedVideoInfo | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{ startTime?: Date; elapsedSeconds?: number; }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<"notStarted" | "converted" | "condensing">("notStarted");
  const [videoSettings] = useState<videoSettingsInput>({
    quality: QualityType.High,
    videoType: VideoFormat.WAV, // Set to MP3 for conversion
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
  });
console.log(videoSettings,"videoSetting");

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

  useEffect(() => {
    loadWithToast();
  }, []);

  const ffmpegRef = useRef(new FFmpeg());
  const disableDuringCompression = status === "condensing";

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

  const condense = async () => {
    if (!video) return;
    try {
      setTime({ ...time, startTime: new Date() });
      setStatus("condensing");
      ffmpegRef.current.on("progress", ({ progress: completion }) => {
        const percentage = completion * 100;
        setProgress(percentage);
      });

      // Use the ConvertVideoFile function to convert the video to MP3
      const { url, output, outputBlob } = await ConvertVideoFile(
        ffmpegRef.current,
        video,
        videoSettings
      );

      // Get the size of the compressed audio
      const sizeInBytes = outputBlob.size; // Size in bytes
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2); // Convert to MB

      // Set compressed audio information
      setCompressedVideoInfo({
        url,
        name: output, // Use the output name from the conversion
        size: sizeInMB,
        type: "audio/mpeg", // Set the type for MP3
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

  const removeVideo = () => {
    setVideo(undefined); // Reset the video state
    setCompressedVideoInfo(null); // Reset compressed video info
    setStatus("notStarted"); // Reset status
    setProgress(0); // Reset progress
  };

  return (
    <>
      {status === "converted" && compressedVideoInfo ? (
        <div className="mt-4">
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
              {status === "condensing" && (
                <VideoCondenseProgress
                  progress={progress}
                  seconds={time.elapsedSeconds!}
                />
              )}
              <VideoDisplay videoUrl={URL.createObjectURL(video.file)} />
              <div className="block mt-4">
                <div className="bg-blue-300 border rounded-md p-3">
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
                        {video.fileName}
                      </p>
                      <p className="font-poppin text-white font-[400] text-sm">
                        {(video.fileSize / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between space-x-2 mt-2">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="hover:text-primary transition-colors h-10 py-1 rounded-lg"
                      onClick={removeVideo} // Call removeVideo when clicked
                    >
                      Remove
                    </Button>
                    <Button
                      disabled={disableDuringCompression}
                      className={`px-4 py-2 rounded-lg h-10 transition-colors`}
                      onClick={condense} // Call condense when clicked
                    >
                      {disableDuringCompression ? "Converting..." : "Convert to WAV"}
                    </Button>
                  </div>
                </div>
              </div>
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