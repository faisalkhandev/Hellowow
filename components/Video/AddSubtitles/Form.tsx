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
import { FolderUp, Minus, Plus, File } from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';
import { Input } from '@/components/ui/input';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const schema = z.object({
//   language: z.string(),
// });

// type FormFields = z.infer<typeof schema>;

const PdfSummarizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  // const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false);
  // const [loadedPages, setLoadedPages] = useState<number>(0);
  const [numPagesArray, setNumPagesArray] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  // const [hoveredPageIndex, setHoveredPageIndex] = useState<number | null>(null);
 
console.log(numPagesArray,"nummPages")
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 3));
     // Set a maximum zoom level
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5)); // Set a minimum zoom level
  };
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    setProgress(0);
    // setLoadedPages(0);
    // setIsProgressVisible(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleLoadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    const progress = (loaded / total) * 100;
    setProgress(progress);
  };

  const handleDocumentLoadSuccess = (index: number) => ({ numPages }: { numPages: number }) => {
    setNumPagesArray(prev => {
      const newNumPagesArray = [...prev];
      newNumPagesArray[index] = numPages;
      return newNumPagesArray;
    });
    // setLoadedPages(prev => prev + numPages);
    // setIsProgressVisible(true);
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
  


  // const deleteFile = (fileIndex: number) => {
  //   setFiles(prev => prev.filter((_, index) => index !== fileIndex));
  // };

  // const { handleSubmit, control, formState: { isSubmitting } } = methods;

  // const onSubmit: SubmitHandler<FormFields> = (data) => {
  //   console.log(data);
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(data);
  //     }, 2000);
  //   });
  // };

  return (
    <Card className='w-full h-[450px] shadow-2xl border-none px-4 max-container'>
      {!files.length && (
        <div className="flex flex-col justify-center items-center space-y-4 h-full">
          <Button onClick={() => fileInputRef.current?.click()} className='flex gap-2 text-white font-poppin text-[1rem] font-[600] h-14  w-full max-w-[320px] '>
            <FolderUp size={18} strokeWidth={3} />
            Upload from PC or Mobile
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                setFiles(prevFiles => [...prevFiles, ...newFiles]);
              }
            }}
            style={{ display: 'none' }}
          />
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <p className='font-poppin text-[1rem] text-paragraph font-[400]'>{isDragActive ? 'Drop the PDF here...' : 'or Drag files here'}</p>
          </div>
          <TooltipButton tooltipContent="Google Drive">
            <div className="p-2 rounded-full bg-[#F9FCFE] cursor-pointer">
              <Drive />
            </div>
          </TooltipButton>
        </div>
      )}

      <div className="px-4 py-8  flex flex-col">
       
        {files.length > 0 && (
          <>
            <Card className='border-none rounded-lg p-0'>
              <CardContent className='p-3 border-none shadow-md flex justify-between items-center w-full'>
                <div className='flex items-center gap-2 w-full'>
                <Button
                    variant="outline"
                    className='bg-transparent text-paragraph hover:text-paragraph'
                  >
                    <div className='p-3' onClick={handleZoomIn} >
                      <Plus size={18} />
                    </div>
                    <div className='p-3'>
                    {Math.round(zoomLevel * 100)}%
                    </div>
                    <div className='p-3'>
                      <Minus size={18} onClick={handleZoomOut} /> {/* Decrease zoom on click */}
                    </div>
                  </Button>
                 <Input placeholder='Example1-2' className=' w-[200px] border border-gray-400 focus:border-4 focus:outline-none focus:border-[#BFDEFF] '/>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-poppin h-10 border flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
                  >
                  Extract all Pages
                  </Button>
                 
                  <Button>
                    Split
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="overflow-y-auto gap-4 flex flex-wrap mt-4">
            {files.map((file, fileIndex) => (
  <div key={fileIndex} className="flex items-center">
    <Document
      file={file}
      onLoadSuccess={handleDocumentLoadSuccess(fileIndex)}
      loading={<Progress value={progress} className="w-[60%]" />}
      onLoadProgress={handleLoadProgress}
      className="flex gap-2 items-center"
    >
      {Array.from(new Array(numPagesArray[fileIndex] || 0), (el, index) => (
        <div
          key={`page_${fileIndex}_${index + 1}`}
        // Reset on mouse leave
          className=" flex flex-col ml-2 text-center w-full"
        >
          <Card className="w-full h-max overflow-hidden border ">
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={180}
            />
          </Card>

        

          <p className="text-center font-poppin text-paragraph text-[0.8rem] w-full">{index + 1}</p>
        </div>
      ))}
                  </Document>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default PdfSummarizer;





