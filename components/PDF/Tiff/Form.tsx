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
  const [numPagesArray, setNumPagesArray] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredPageIndex, setHoveredPageIndex] = useState<number | null>(null);
 

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
    setLoadedPages(prev => prev + numPages);
    setIsProgressVisible(true);
  };

  // const methods = useForm<FormFields>();

  const deletePageFromFile = (fileIndex: number) => {
    // Remove the page from the numPagesArray
    setNumPagesArray(prev => {
      const newNumPagesArray = [...prev];
      newNumPagesArray[fileIndex]--; // Decrement the page count for the specific file
      return newNumPagesArray;
    });
  
  
  };
  




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
    <Card className='w-full lg:w-[944px] h-[450px] shadow-2xl border-none px-4'>
      {!files.length && (
        <div className="flex flex-col justify-center items-center space-y-4 max-lg:px-4 h-full">
          <Button onClick={() => fileInputRef.current?.click()} className='flex gap-2 text-white font-poppin text-[1rem] font-[600] h-14  w-full max-w-[320px] '>
            <FolderUp size={18} strokeWidth={3} />
            Upload from PC or Mobile
          </Button>
          <input
            ref={fileInputRef}
            type="file"
             accept="image/jpeg"
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

      <div className="px-4 py-8 h-full relative flex flex-col">
        {isProgressVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <Progress value={progress} className="w-[60%]" />
            <p className="mt-2 text-lg">
              Loading {loadedPages} pages
            </p>
          </div>
        )}
        {files.length > 0 && (
          <>
            <Card className='border-none rounded-lg p-0'>
              <CardContent className='p-3 border-none shadow-md flex justify-between items-center w-full'>
                <div className='flex  justify-center items-center gap-3 w-full'>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-poppin h-10 border flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
                  >
                    Add Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                     accept="image/jpeg"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        const newFiles = Array.from(e.target.files);
                        setFiles(prevFiles => [...prevFiles, ...newFiles]);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                  <Button>
                    Create Pdf
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
          onMouseEnter={() => { setHoveredPageIndex(index); }} // Set hovered file and page index
          onMouseLeave={() => { setHoveredPageIndex(null);}} // Reset on mouse leave
          className=" flex flex-col ml-2 text-center w-full"
        >
          <Card className="w-full h-max overflow-hidden border relative">
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={180}
            />
          </Card>

          {hoveredPageIndex === index && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-10">
              <div className="flex space-x-4">
                <TooltipButton tooltipContent="Delete">
                  <button onClick={() => deletePageFromFile( index)}>
                    <Download size={20} />
                  </button>
                </TooltipButton>
              </div>
            </div>
          )}

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





