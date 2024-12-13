"use client";

import CustomDropzone from "@/components/Video/Custom-dropzone";
import React, { useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { convertImageToJpeg } from "@/actions/image/imageconversion";
import DownloadFile from "../DownloadFile";

const PngToTiffComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = async (uploadedFile: File) => {
    if (uploadedFile.size > 3 * 1024 * 1024) {
      toast.error("File size does not exceed 3 MB");
      return;
    }
    setFile(uploadedFile);
    setConvertedFile("");
    setLoading(true);
    setProgress(0);

    try {
      await simulateProgress(30, 1000);
      const formData = new FormData();
      formData.append("file", uploadedFile);
      await simulateProgress(80, 1500);
      const { fileName: processedFileName, base64Image } =
        await convertImageToJpeg(formData);

      setConvertedFile(base64Image);
      setFileName(processedFileName);

      await simulateProgress(100, 1000);
    } catch (err) {
      console.error("Error converting file", err);
      toast.error("Failed to convert file. Please try again.");
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
          acceptedFile={{ "image/": ["png", "PNG"] }}
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
            <DownloadFile screenshot={convertedFile} fileName={fileName} />
          )}
        </Card>
      )}
    </div>
  );
};

export default PngToTiffComponent;
