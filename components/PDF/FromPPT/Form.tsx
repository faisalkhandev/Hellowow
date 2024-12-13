// components/Write/SummarizePdf/Form.tsx
"use client";

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
// import {useForm } from 'react-hook-form';
import { pdfjs } from 'react-pdf';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TooltipButton from '@/components/common/TooltipButton';
import { FolderUp } from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';
import { DownLoadDialog } from '../DownloadDialog';
import QrCode from '../QrCode';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const schema = z.object({
//   language: z.string(),
// });

// type FormFields = z.infer<typeof schema>;

const PdfSummarizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

 

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    setProgress(0);
    setLoadedPages(0);
    setIsProgressVisible(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });


 

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
    <>
      {!files.length && (
    <Card className='w-full lg:w-[944px] h-[450px] shadow-2xl border-none px-4 m-auto'>

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
        </Card>
      )}
        {files.length > 0 && (
          <>
    <Card className='w-full min-h-[450px] h-full shadow-2xl border-none px-4'>

      <div className="px-4 py-8 h-full relative flex flex-col">
        {isProgressVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <Progress value={progress} className="w-[60%]" />
            <p className="mt-2 text-lg">
              Loading {loadedPages} pages
            </p>
          </div>
        )}
      
             <div className="flex flex-col justify-center items-center space-y-4 h-full">
              <div className='text-center'>
             <h1 className="text-[1rem] sm:text-[1.2rem] font-bold  font-poppin text-heading  dark:text-white ">
             Your file is ready</h1>
    <p className='text-paragraph font-poppin  text-[0.9rem]'>85% Smaller ( 1.34 MB to 206 kB)</p>
    </div>
          <DownLoadDialog/>
       <p className='underline cursor-pointer text-paragraph font-poppin'>Start Over</p>
       <QrCode/>
          
        </div>
        
      </div>
    </Card>
    </>
        )}
    </>
  );
};

export default PdfSummarizer;





