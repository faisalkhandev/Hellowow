'use client';

import CustomDropzone from "@/components/Video/Custom-dropzone";
import React, { useState } from "react";
import { toast } from "sonner";
import { convertFileToBase64 } from "@/utils/image";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { HeicToAVIFConversion } from "@/actions/image/imageconversion";
import DownloadFile from "../DownloadFile";

const HeicToAvifComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (uploadedFile: File) => {
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast.error("File size does not exceed 3 MB");
      return;
    }
    setFile(uploadedFile);
    setConvertedFile("");
    setLoading(true);
    setProgress(0);

    try {
      // Simulate file conversion (30%)
      await simulateProgress(30, 1000);
   const formData= new FormData();
formData.append("file",uploadedFile);
      // Convert HEIC to JPEG
      await simulateProgress(80, 1500);
      const convertedImageUrl = await HeicToAVIFConversion(formData);
      setConvertedFile(convertedImageUrl);

      // Complete progress
      await simulateProgress(100, 1000);
    } catch (err) {
      console.error("Error converting file", err);
      toast.error("Failed to convert file. Please try again.");
    
    } finally {
      setLoading(false);
    }
  };

  const simulateProgress = async (target:number, duration:number) => {
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

  const getFileName = (originalFileName:string) => {
    const nameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");
    return `${nameWithoutExtension}.avif`;
  };

  return (
    <div>
      {!file && (
        <CustomDropzone
          handleUpload={handleUpload}
          acceptedFile={{ 'image/': ['heic'] }}
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
          {convertedFile && !loading && (
            <DownloadFile
              screenshot={convertedFile}
              fileName={getFileName(file.name)}
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default HeicToAvifComponent;