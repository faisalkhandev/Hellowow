'use client';

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import CustomDropzone from "@/components/Video/Custom-dropzone";
import DownloadFile from "../DownloadFile";
import { processImageWithOriginalFormat } from "@/actions/image/colorizeImage"; // Import server action
import { acceptedImageFiles } from "@/utils/video";
import { convertFileToBase64 } from "@/utils/image";

const GrayscaleImageComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (uploadedFile: File) => {
    if (uploadedFile.size > 3 * 1024 * 1024) {
      toast.error("File size should not exceed 3 MB");
      return;
    }
    setFile(uploadedFile);
    setConvertedFileUrl("");
    setLoading(true);
    setProgress(0);

    try {
      // Simulate file conversion progress
      await simulateProgress(30, 1000);

      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Call the server action and get the processed file's Base64 data
      const { fileName: processedFileName, base64Image } = await processImageWithOriginalFormat(formData);



      setConvertedFileUrl(base64Image);
setFileName(processedFileName)

      // Complete progress
      await simulateProgress(100, 1000);
    } catch (err) {
      console.error("Error applying grayscale", err);
      toast.error("Failed to process the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const simulateProgress = async (target: number, duration: number) => {
    return new Promise<void>((resolve) => {
      const start = progress;
      const step = (target - start) / (duration / 50);
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextValue = prev + step;
          if (nextValue >= target) {
            clearInterval(interval);
            resolve();
            return target;
          }
          return nextValue;
        });
      }, 50);
    });
  };

  return (
    <div>
      {!file && (
        <CustomDropzone
          handleUpload={handleUpload}
          acceptedFile={acceptedImageFiles} // Accept any image format
        />
      )}

      {file && (
        <Card className="border-none w-full h-[450px] flex justify-center items-center max-w-[940px] mx-auto shadow-2xl">
          {loading && (
            <CardContent className="w-full flex flex-col justify-center items-center">
              <p>Loading {Math.round(progress)}%</p>
              <Progress value={progress} />
            </CardContent>
          )}
          {convertedFileUrl && !loading && (
            <DownloadFile
              screenshot={convertedFileUrl}
              fileName={fileName} // Keep the original file name
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default GrayscaleImageComponent;