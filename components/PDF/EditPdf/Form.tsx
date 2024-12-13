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
import { FolderUp, Minus, Plus, File, Grid2x2, Trash } from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const schema = z.object({
//   language: z.string(),
// });

// type FormFields = z.infer<typeof schema>;

const EditPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<number>(0);
  const [numPagesArray, setNumPagesArray] = useState<number[]>([]);
  const [showLimitedView, setShowLimitedView] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPageIndex, setHoveredPageIndex] = useState<number | null>(null);
 
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
  


  const deleteFile = (fileIndex: number) => {
    setFiles(prev => prev.filter((_, index) => index !== fileIndex));
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
    <Card className='w-full lg:w-[944px]  h-[450px] shadow-2xl border-none px-4 '>
      {!files.length && (
        <div className="flex flex-col justify-center items-center space-y-4 max-lg:px-4 h-full ">
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
           <Button  variant="outline" onClick={() => fileInputRef.current?.click()} className='flex gap-2   font-poppin text-[1rem] font-[600] h-14  w-full max-w-[320px]  border  border-[#1A8FE3] hover:bg-primary hover:text-white '>
            <Plus size={18} strokeWidth={3} />
           Create New
          </Button>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-poppin h-10 border flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
                    onClick={() => setShowLimitedView(true)} // Toggle view on button click
                  >
                    <File size={14} strokeWidth={3} />
                    Files
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLimitedView(false)} // Toggle view on button click

                    className="font-poppin h-10 border flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
                  >
                    <Grid2x2 size={14} strokeWidth={3} />
                    Pages
                  </Button>
                </div>
                <div className='flex items-center gap-2'>
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
                    accept="application/pdf"
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
                    Merge
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="overflow-y-auto gap-4 flex flex-wrap mt-4">
              {files.map((file, fileIndex) => (
                <div key={fileIndex} className={`flex items-center ${showLimitedView && fileIndex > 2 ? 'hidden' : 'block'} `}>
                  <Document
                    file={file}
                    onLoadSuccess={handleDocumentLoadSuccess(fileIndex)}
                    loading={<Progress value={progress} className="w-[60%]" />}
                    onLoadProgress={handleLoadProgress}
                    className="flex gap-2 items-center"
                  >
                    {showLimitedView ? (
                      // Show only the first page and total pages when in limited view
                      <div  className='flex flex-col '>
                                           <div 
      className="relative" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
                        <Card className="w-full h-max overflow-hidden border">
                          <Page
                            pageNumber={1} // Show only the first page
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={180 * zoomLevel}
                          />
                        </Card>
                        {isHovered && (
                          <>
        <div className="absolute inset-0  w-full h-full  flex items-center justify-center bg-[rgb(0,0,0,0.1)] z-10">
          <div className="flex space-x-4">
                    <TooltipButton tooltipContent="Delete">
                      <button onClick={() => deleteFile(fileIndex)}>
                        <Trash size={20} />
                      </button>
                    </TooltipButton>
          </div>
        </div>
        </>
      )}

                        </div>
           
                        <p className='text-center font-poppin text-paragraph text-[0.8rem] w-full'>
                          Total Pages: {numPagesArray[fileIndex] || 0}
                        </p>
                        </div>
                    ) : (
                      // Show all pages when not in limited view
                      Array.from(new Array(numPagesArray[fileIndex] || 0), (el, index) => (
                        <div
                          key={`page_${fileIndex}_${index + 1}`}
                          onMouseEnter={() => setHoveredPageIndex(index)} // Set the hovered index
                          onMouseLeave={() => setHoveredPageIndex(null)} // Reset on mouse leave
                          className="relative flex flex-col ml-2 text-center w-full"
                        >
                          <Card className="w-full h-max overflow-hidden border">
                            <Page
                              pageNumber={index + 1}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              width={180 * zoomLevel}
                            />
                          </Card>
                          {isHovered && (
                          <>
         {hoveredPageIndex === index && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[rgb(0,0,0,0.1)] z-10">
              <div className="flex space-x-4">
                <TooltipButton tooltipContent="Delete">
                  <button onClick={() => deletePageFromFile(fileIndex)}>
                    <Trash size={20} />
                  </button>
                </TooltipButton>
              </div>
            </div>
          )}
        </>
      )}
                          <p className='text-center font-poppin text-paragraph text-[0.8rem] w-full'>{index + 1}</p>
                        </div>
                      ))
                    )}
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

export default EditPdf;





