// components/Write/SummarizePdf/Form.tsx
"use client";

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
// import {useForm } from 'react-hook-form';
import { Document, Page, pdfjs } from 'react-pdf';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TooltipButton from '@/components/common/TooltipButton';
import { Download, FolderUp } from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';
import CustomDropzone from '@/components/Video/Custom-dropzone';
import { acceptedPdfFiles } from '@/utils/pdf';
import FileUploader from '@/components/common/FileUploader';
import { VideoCondenseProgress } from '@/components/Video/VideoCondense';
import FormError from '@/components/form-error';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const PdfSummarizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<number>(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredPageIndex, setHoveredPageIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false); 




  
  // Handle file upload from CustomDropzone
  const handleUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };
  const handleLoadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    const loadProgress = (loaded / total) * 100; // Calculate the percentage of the loaded document
    setProgress(loadProgress); // Update the progress state
  };

  const handleLoadError = (error: Error) => {
    const errorMessage = error.message || "Failed to load the document. Please check the file and try again.";
    setError(errorMessage);
  };
 

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setProgress(0); // Reset progress for page loading
    setLoadedPages(0); // Reset loaded pages count
  };
  // const methods = useForm<FormFields>();

  // const deletePageFromFile = (fileIndex: number) => {
  //   // Remove the page from the numPagesArray
  //   setNumPagesArray(prev => {
  //     const newNumPagesArray = [...prev];
  //     newNumPagesArray[fileIndex]--; // Decrement the page count for the specific file
  //     return newNumPagesArray;
  //   });
  
  
  // };
  const handleConversion=()=>{

  }
  const resetState=()=>{
    setFile(null)
  }


  return (
    <Card className='w-full max-w-[940px] m-auto  h-[450px] border-none '>
    {
        !file && (
        <CustomDropzone 
        handleUpload={handleUpload} 
        acceptedFile={acceptedPdfFiles} // Accept only PDF files
      />
        )}
      {
        file && (
          <FileUploader selectedFile={file} isConverting={isConverting} handleConversion={handleConversion} resetState={resetState} type="JPG"/>
        )
      }

      <div className="px-4 py-8 h-full relative flex flex-col">
        {isProgressVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <Progress value={progress} className="w-[60%]" />
            <p className="mt-2 text-lg">
              Loading {loadedPages} pages
            </p>
          </div>
        )}
        {/* {file && (
          <>
            <Card className='border-none rounded-lg p-0'>
              <CardContent className='p-3 border-none shadow-md flex justify-between items-center w-full'>
                <div className='flex  justify-center items-center gap-3 w-full'>
                <Button
                    variant="outline"
                    size="lg"
                    className='bg-transparent text-paragraph hover:text-paragraph'
                    onClick={()=>setFile(null)}
                  >
                    Start Over
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-poppin h-10 border flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
                  >
                    DownLoad .zip
                  </Button>
                </div>
                
              </CardContent>
            </Card>
            <div className="overflow-y-auto gap-4 flex flex-wrap mt-4">
            {file && (
              <div className="overflow-y-auto flex-grow h-[450px]">
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[300px]">
                      <VideoCondenseProgress progress={progress}/>
                    </div>
                  }
                  error={
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[300px]">
                  <FormError message={error ||""}/>
                  </div>
                  }
                  onLoadProgress={handleLoadProgress}
                  onLoadError={handleLoadError} // Add this line to handle load errors
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="flex flex-col text-center w-[220px]">
                      <Card className="w-full h-max overflow-hidden border">
                        <Page
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          width={220} 
                          loading={
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[300px]">
                              <VideoCondenseProgress progress={progress}/>
                            </div>
                          }
                        />
                      </Card>
                      <p className='text-center font-poppin text-paragraph text-[0.8rem] w-full'>{index + 1}</p>
                    </div>
                  ))} 
                </Document>
              </div>
            )}


            </div>
          </>
        )} */}
      </div>
    </Card>
  );
};

export default PdfSummarizer;





