'use client';

import CustomDropzone from "@/components/Video/Custom-dropzone";
import React, { useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import DownloadFile from "../DownloadFile";
import {convertVsdToPptx} from "@/actions/image/vsdToPptx"

const VsdToPptxComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (uploadedFile: File) => {
    // Check the file extension and MIME type
    const validExtensions = ['vsd'];
    const validMimeTypes = ['application/vnd.ms-visio'];
  
    const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase();
    const mimeType = uploadedFile.type;
  
    if (!validExtensions.includes(fileExtension!)) {
      toast.error('Invalid file extension. Please upload a .vsd file.');
      return;
    }
  
    if (!validMimeTypes.includes(mimeType)) {
      toast.error('Invalid MIME type. Please upload a valid Visio file.');
      return;
    }
  
    if (uploadedFile.size > 3 * 1024 * 1024) {
      toast.error('File size must not exceed 3 MB');
      return;
    }
  
    setFile(uploadedFile);
    setConvertedFile(undefined);
    setLoading(true);
    setProgress(0);
  
    const formData = new FormData();
    formData.append('file', uploadedFile);
  
    try {
      const jobResponse = await convertVsdToPptx(formData);
      console.log(jobResponse, 'hsghgdhdhg');
  
      // Simulate progress for upload
      await simulateProgress(30, 1000);
  
      // Step 2: Wait for the job to complete
      const downloadUrl = jobResponse.downloadUrl;
  
      // Simulate progress for completion
      await simulateProgress(100, 1000);
  
      setConvertedFile(downloadUrl);
      toast.success('File converted successfully!');
      setFile(null)
    } catch (err) {
      console.error('Error converting file', err);
      toast.error('Failed to convert file. Please try again.');
      setFile(null);
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

  const getPptxFileName = (originalFileName: string) => {
    const nameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");
    return `${nameWithoutExtension}.pptx`;
  };

  return (
    <div>
      {!file && (
        <CustomDropzone
          handleUpload={handleUpload}
          acceptedFile={{ 'application/vnd.ms-visio': ['vsd'] }}
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
              fileName={getPptxFileName(file.name)}
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default VsdToPptxComponent;