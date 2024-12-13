"use client";

import CustomDropzone from "@/components/Video/Custom-dropzone";
import { acceptedImageFiles } from "@/utils/video";
import React, { useState } from "react";
import { toast } from "sonner";
import { convertFileToBase64 } from "@/utils/image";
import { extractTextFromImage } from "@/actions/image/textExtraction";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ImageToTextComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress
  const [wordFileUrl, setWordFileUrl] = useState(""); // URL for Word file download
  const [textFileUrl, setTextFileUrl] = useState(""); // URL for text file download

  const handleUpload = async (uploadedFile: File) => {
    if (uploadedFile.size > 3 * 1024 * 1024) {
      toast.error("File size does not exceed 1 MB");
      return;
    }
    setFile(uploadedFile);
    setExtractedText("");
    setLoading(true);
    setProgress(0); // Reset progress
  
    try {
      const mimeType = uploadedFile.type;
  
      // Simulate file conversion (30%)
      await simulateProgress(30, 1000); // Duration in ms
      const base64String = await convertFileToBase64(uploadedFile);
  
      // Simulate text extraction (50%)
      await simulateProgress(80, 1500); // Cumulative progress = 80%
      const text = await extractTextFromImage(base64String, mimeType);
  
      setExtractedText(text);
  
      // Simulate document generation (20%)
      await simulateProgress(100, 1000); // Final progress = 100%
      const wordBlob = await generateWordDocument(text);
  
      // Generate URLs for downloads
      const wordUrl = URL.createObjectURL(wordBlob);
      setWordFileUrl(wordUrl);
  
      const textBlob = new Blob([text], { type: "text/plain" });
      const textUrl = URL.createObjectURL(textBlob);
      setTextFileUrl(textUrl);
    } catch (err) {
      console.error("Error extracting text:", err);
      toast.error("Failed to extract text. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const generateWordDocument = async (text: string) => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(text)],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    return blob;
  };

  const simulateProgress = async (target: number, duration: number) => {
    return new Promise<void>((resolve) => {
      const start = progress;
      const step = (target - start) / (duration / 50); // Divide progress increment over duration
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
      }, 50); // Update progress every 50ms for smooth animation
    });
  };
  
  const DownLoadFile=(type:string)=>{
  const link = document.createElement('a');
if(type=== "word_document"){
      link.href = wordFileUrl;
      link.download="extracted-text.docx"
    }
      if(type=== "text_document"){
        link.href = textFileUrl;
        link.download="extracted-text.txt"
      
      }
      link.click();

  }

  return (
    <div>
      {!file && (
        <CustomDropzone
          handleUpload={handleUpload}
          acceptedFile={acceptedImageFiles}
        />
      )}
      
      {file &&  (
        <Card className="border-none w-full h-[450px] flex justify-center items-center max-w-[940px] mx-auto shadow-2xl">
          {
            loading && (
              <CardContent className="w-full flex flex-col justify-center items-center">
              <p>Loading {Math.round(progress)}%</p>
              <Progress value={progress} />
            </CardContent>

            )
          }
           {
            extractedText && !loading && (
              <CardContent className="flex flex-col items-center space-y-4">
                  <div className='text-center'>
          <h1 className="text-[1rem] sm:text-[1.2rem] font-bold font-poppin text-heading dark:text-white">
            Your file is ready
          </h1>
        </div>
        <Button onClick={()=>DownLoadFile("word_document")} size="lg" className="w-full max-w-[300px]">Download  Document</Button>
        <Button onClick={()=>DownLoadFile("text_document")} size="lg" className="w-full max-w-[300px]">Download Text</Button>

        <p className='underline cursor-pointer text-paragraph font-poppin' onClick={() => window.location.reload()}>
          Start Over
        </p>
              </CardContent>

            )
          }
        </Card>
     
      )}


   
    </div>
  );
};

export default ImageToTextComponent;
