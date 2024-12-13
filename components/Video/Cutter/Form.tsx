"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { ConvertVideoFile, TrimVideoFile } from '@/utils/convert';
import CustomDropzone from '../Custom-dropzone';
import { acceptedVideoFiles } from '@/utils/video';
import { Card } from '@/components/ui/card';
import { toBlobURL } from '@ffmpeg/util';
import { toast } from 'sonner';
import { FileActions, QualityType, VideoFormat, videoSettingsInput } from '@/types/compress';
import { Button } from '@/components/ui/button';
import { DownLoadDialog } from '../DownloadDialog';

const VideoTrimmerWithSlider = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  const [frames, setFrames] = useState<string[]>([]); // Array to hold frame URLs
  const [video, setVideo] = useState<FileActions | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{ startTime?: Date; elapsedSeconds?: number; }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<"notStarted" | "converted" | "condensing">("notStarted");
  const [videoSettings] = useState<videoSettingsInput>({
    quality: QualityType.High,
    videoType: VideoFormat.MP4, // Set to MP4 for trimming
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
  });

  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('log', ({ message }) => {
        console.log(message);
      });
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      toast.success("FFmpeg loaded successfully!");
    };

    loadFFmpeg().catch(err => {
      console.error("Error loading FFmpeg:", err);
      toast.error("Error loading FFmpeg packages");
    });
  }, []);

  const handleUpload = (file: File) => {
    setVideoFile(file);
    setVideo({
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      fileType: file.type,
      file,
      isError: false,
    });

    setTrimmedVideoUrl(null); // Reset trimmed video URL on new upload
    setFrames([]); // Reset frames on new upload
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);
      setEndTime(videoDuration); // Set end time to video duration by default
      setSelectionEnd(videoDuration); // Set selection end to video duration
      generateFrames(videoDuration); // Generate frames for the timeline
    }
  };

  const generateFrames = (duration: number) => {
    const frameCount = Math.max(4, Math.floor(duration / 2)); // Show at least 4 frames, or one frame every 2 seconds
    const frameUrls = [];
    for (let i = 0; i < frameCount; i++) {
      const time = (i / (frameCount - 1)) * duration; // Calculate time for each frame
      frameUrls.push(`${URL.createObjectURL(videoFile!)}#t=${time}`); // Create frame URLs
    }
    setFrames(frameUrls);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    const rect = timelineRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = event.clientX - rect.left;
      const percentage = offsetX / rect.width;
      const newStartTime = Math.max(0, Math.min(duration, percentage * duration));
      setSelectionStart(newStartTime);
      setStartTime(newStartTime);
      setEndTime(selectionEnd);
      videoRef.current!.currentTime = newStartTime; // Sync video playback
      videoRef.current!.play(); // Start playing the video from the new start time
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percentage = offsetX / rect.width;
      const newEndTime = Math.max(selectionStart, Math.min(duration, percentage * duration));
      setSelectionEnd(newEndTime);
      setEndTime(newEndTime);
      videoRef.current!.currentTime = newEndTime; // Sync video playback
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTrim = async () => {
    if (!video) return;
    try {
      setTime({ ...time, startTime: new Date() });
      setStatus("condensing");
      ffmpegRef.current.on("progress", ({ progress: completion }) => {
        const percentage = completion * 100;
        setProgress(percentage);
      });

      // Use the TrimVideoFile function to trim the video
      const { url, output } = await TrimVideoFile(
        ffmpegRef.current,
        startTime,
        endTime,
        video,
        videoSettings
      );

      // Set trimmed video information
      setTrimmedVideoUrl(url); // Set the trimmed video URL

      // Reset states after trimming
      setVideoFile(null); // Clear the video file
      setTime((oldTime) => ({ ...oldTime, startTime: undefined })); // Reset time
      setStatus("converted"); // Update status to indicate completion
      setProgress(0); // Reset progress
    } catch (err) {
      console.log(err);
      setStatus("notStarted"); // Reset status on error
      setProgress(0); // Reset progress
      setTime({ elapsedSeconds: 0, startTime: undefined }); // Reset time
      toast.error("Error trimming video"); // Show error message
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  // Event listener to stop video playback when it reaches the end time
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleTimeUpdate = () => {
        if (videoElement.currentTime >= endTime) {
          videoElement.pause();
        }
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [endTime]);

  // Function to handle starting over
  const handleStartOver = () => {
    setVideoFile(null);
    setTrimmedVideoUrl(null);
    setDuration(0);
    setStartTime(0);
    setEndTime(0);
    setSelectionStart(0);
    setSelectionEnd(0);
    setFrames([]); // Clear frames
    setVideo(undefined); // Clear video object
    setProgress(0); // Reset progress
    setStatus("notStarted"); // Reset status
  };

  // Calculate the width of the timeline based on the number of frames
  const timelineWidth = frames.length > 0 ? `${frames.length * 60}px` : '600px'; // 60px per frame

  return (
    <div>
      <Card className="max-w-[940px] mx-auto shadow-2xl">
        {
          !videoFile && !trimmedVideoUrl && (
            <CustomDropzone handleUpload={handleUpload} acceptedFile={acceptedVideoFiles} />
          )
        }
        {videoFile && (
          <div>
            <video
              ref={videoRef}
              controls
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              ref={timelineRef}
              style={{
                position: 'relative',
                width: timelineWidth, // Set width based on frame count
                height: '30px',
                backgroundColor: '#eee',
                marginTop: '10px',
                cursor: 'pointer',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDragging(false)}
            >
              <div
                style={{
                  position: 'absolute',
                  left: `${(selectionStart / duration) * 100}%`,
                  width: `${((selectionEnd - selectionStart) / duration) * 100}%`,
                  height: '100%',
                  backgroundColor: 'rgba(0, 128, 0, 0.5)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `${(selectionStart / duration) * 100}%`,
                  width: '5px',
                  height: '100%',
                  backgroundColor: 'blue',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `${(selectionEnd / duration) * 100}%`,
                  width: '5px',
                  height: '100%',
                  backgroundColor: 'blue',
                }}
              />
              {/* Display video frames */}
              <div className='flex w-full max-w-[400px] '>
                {frames.map((frame, index) => (
                  <video
                    key={index}
                    width="60"
                    height="34"
                    src={frame}
                    preload="metadata"
                    style={{ margin: '0 2px' }}
                  />
                ))}
              </div>
            </div>
            <div className='w-full flex justify-between items-center p-2'>
              <div>
                <p>Start Time: {startTime.toFixed(2)}s</p>
                <p>End Time: {endTime.toFixed(2)}s</p>
              </div>
              <Button onClick={handleTrim} disabled={loading} size="lg">
                {loading ? 'Trimming...' : 'Trim Video'}
              </Button>
            </div>
          </div>
        )}
             {trimmedVideoUrl && (
          <div className='w-full flex justify-center items-center h-[300px]'>
            <div className="flex flex-col justify-center items-center space-y-4 h-full">
              <div className='text-center'>
                <h1 className="text-[1rem] sm:text-[1.2rem] font-bold font-poppin text-heading dark:text-white ">
                  Your file is ready
                </h1>
              </div>
              <DownLoadDialog fileUrl={trimmedVideoUrl} fileName="trimmed_video.mp4" />
              <p className='underline cursor-pointer text-paragraph font-poppin' onClick={handleStartOver}>
                Start Over
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VideoTrimmerWithSlider;