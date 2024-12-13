"use client"; // Ensure this at the top for Next.js client-side hooks

import React, { useState } from 'react';
import CustomDropzone from '../Custom-dropzone';
import { acceptedVideoFiles } from '@/utils/video';
import { FileActions } from '@/types/compress';
import VideoDisplay from '../VideoDisplay';
import { Button } from '@/components/ui/button';
import { DownLoadDialog } from '../DownloadDialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const VideoCompressor = () => {
  const [video, setVideo] = useState<FileActions | undefined>(undefined);
  const [transcription, setTranscription] = useState<string>(""); // State for transcription
  const [error, setError] = useState<string>(""); // State for error messages
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading

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

  const handleTranscribed = async () => {
    if (!video) {
      return;
    }
    setIsLoading(true); // Set loading state to true
    try {
      // Create a URL for the video file
      const videoUrl = URL.createObjectURL(video.file);
      const response = await fetch(`https://video-to-text-video-transcription-and-summarization.p.rapidapi.com/transcribe`, {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': '036ea8eb96msh7c69f7f39f09fc2p1c7cdajsn5cd1c09f522b', // Replace with your actual API key
          'X-RapidAPI-Host': 'video-to-text-video-transcription-and-summarization.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }), // Pass the video URL to the API
      });

      const result = await response.json();
      console.log(result); // Log the result for debugging

      if (response.ok) {
        if (result.body) {
          setTranscription(result.body); // Assuming the API returns the transcript in 'body'
        } else if (result.error) {
          setError(result.error || "Failed to generate summary");
        }
      } else {
        setError(`Error: ${result.message || 'Failed to fetch transcription'}`);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const removeVideo = () => {
    setVideo(undefined); // Reset the video state
    setTranscription(""); // Reset transcription
    setError(""); // Reset error
  };

  return (
    <>
      {transcription && (
        <Card className='w-full max-w-[920px] shadow-2xl border-none m-auto p-6 mt-6'>
          <h1 className='text-2xl font-semibold font-poppin mb-4'>Transcription</h1>
          <CardContent className='h-[400px] bg-[#F6F6F6] overflow-auto text-paragraph font-poppin text-[0.89rem] p-6 rounded-md'>
            {transcription}
          </CardContent>
          <CardFooter className='w-full flex justify-center items-center flex-col pt-2'>
            <DownLoadDialog generatedText={transcription} fileName="video-transcription" />
          </CardFooter>
        </Card>
      )}

      {video ? (
        <>
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
                  className={`px-4 py-2 rounded-lg h-10 transition-colors`}
                  onClick={handleTranscribed} // Call handleTranscribed when clicked
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? "Converting..." : "Convert to Text"} {/* Change button text based on loading state */}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CustomDropzone handleUpload={handleUpload} acceptedFile={acceptedVideoFiles} />
      )}
    </>
  );
};

export default VideoCompressor;