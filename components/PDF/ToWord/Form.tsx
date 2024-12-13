// components/Write/SummarizePdf/Form.tsx
"use client";

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
// import {useForm } from 'react-hook-form';
// import { Document, Page, pdfjs } from 'react-pdf';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card} from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
import TooltipButton from '@/components/common/TooltipButton';
import { FolderUp} from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';
// import { Input } from '@/components/ui/input';
// import { DialogDemo } from '@/components/Write/KeepWritingDialog';
import { WordDialog } from './WordDialog';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const schema = z.object({
//   language: z.string(),
// });

// type FormFields = z.infer<typeof schema>;

const PdfSummarizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  // const [progress, setProgress] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false);
  // const [loadedPages, setLoadedPages] = useState<number>(0);
  // const [numPagesArray, setNumPagesArray] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [zoomLevel, setZoomLevel] = useState<number>(1);
  // const [hoveredPageIndex, setHoveredPageIndex] = useState<number | null>(null);
 
// console.log(numPagesArray,"nummPages")
  // const handleZoomIn = () => {
  //   setZoomLevel((prev) => Math.min(prev + 0.1, 3));
  //    // Set a maximum zoom level
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel((prev) => Math.max(prev - 0.1, 0.5)); // Set a minimum zoom level
  // };
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    // setProgress(0);
    // setLoadedPages(0);
    // setIsProgressVisible(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  // const handleLoadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
  //   const progress = (loaded / total) * 100;
  //   setProgress(progress);
  // };

  // const handleDocumentLoadSuccess = (index: number) => ({ numPages }: { numPages: number }) => {
  //   setNumPagesArray(prev => {
  //     const newNumPagesArray = [...prev];
  //     newNumPagesArray[index] = numPages;
  //     return newNumPagesArray;
  //   });
  //   setLoadedPages(prev => prev + numPages);
  //   setIsProgressVisible(true);
  // };

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
    <Card className='w-full lg:w-[944px] m-auto  h-[450px] shadow-2xl border-none px-4'>
      {!files.length && (
        <div className="flex flex-col justify-center items-center space-y-4 max-lg:px-4 h-full">
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
                setIsDialogOpen(true); 
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

      <div className="px-4 py-8 h-full flex flex-col">
       
        {files.length > 0 && (
          <>
         <WordDialog 
        isOpen={isDialogOpen} 
        setIsOpen={setIsDialogOpen} 
      />
            <div className="flex flex-col justify-center items-center space-y-8 h-full">
              <p className="font-poppin text-paragraph text-[2rem] ">Done!</p>
              <div className="flex gap-2 w-full max-w-md ">
              <Button  className='flex gap-2 text-white  font-poppin text-[1rem] font-[600] h-12   max-w-[320px] '>
            DownLoad
          </Button>
          <Button  className='flex gap-2 text-white font-poppin text-[1rem] font-[600] h-12  w-full max-w-[320px] '>
           Display Text
          </Button>
              </div>
        <p className='underline font-poppin text-paragraph cursor-pointer'>Start Over</p>
          </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default PdfSummarizer;





