// components/Write/SummarizePdf/Form.tsx
"use client";

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Document, Page, pdfjs } from 'react-pdf';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SimpleDropdown } from '../../PDF/SimpleDropdown';
import TooltipButton from '@/components/common/TooltipButton';
import { FolderUp } from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const schema = z.object({
  input_language: z.string(),
  language: z.string(),

});

type FormFields = z.infer<typeof schema>;

const PdfSummarizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handling the file drop or selection
  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setProgress(0); 
      setLoadedPages(0); // Reset loaded pages
      setIsProgressVisible(true); // Show progress bar when file is dropped
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true, 
  });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setProgress(0); // Reset progress for page loading
    setIsProgressVisible(true); // Show progress bar while loading pages
  };

  const handleLoadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    const progress = (loaded / total) * 100;
    setProgress(progress);
  };

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { isSubmitting } } = methods;

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  };

  const data = [
    { title: "English", value: "english" },
    { title: "Spanish", value: "spanish" },
    // Add more languages here...
  ];
  const InputLanguage = [
    { title: "Auto-detect", value: "auto-detect" },
    { title: "Africans", value: "africans" },
  ];
  return (
    <Card className='w-full shadow-2xl border-none '>
      {!file && (
        <div className="flex flex-col justify-center items-center space-y-4 max-lg:px-4 h-[450px]  overflow-auto ">
          <Button onClick={() => fileInputRef.current?.click()} className='flex gap-2 text-white font-poppin text-[1rem] font-[600] h-14 px-8'>
            <FolderUp size={18} strokeWidth={3} />
            Upload from PC or Mobile
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
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
              Loading {loadedPages} of {numPages} pages
            </p>
          </div>
        )}
        { file && (
          <div className="overflow-y-auto flex-grow">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
           
              loading={ <Progress value={progress} className="w-[60%]" />}
              onLoadProgress={handleLoadProgress}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="flex flex-col text-center w-[180px]">
                  <Card className="w-full h-max overflow-hidden border">
                    <Page
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={180} 
                      onLoadSuccess={() => {
                        const currentLoadedPages = loadedPages + 1; // Increment loaded pages
                        setLoadedPages(currentLoadedPages); 
                        const totalPages = numPages || 1; // Total pages
                        const loadProgress = (currentLoadedPages / totalPages) * 100; 
                        setProgress(loadProgress); // Update progress
                        if (currentLoadedPages === totalPages) {
                          setTimeout(() => {
                            setIsProgressVisible(false); 
                          }, 300); 
                        }
                      }}
                    />
                  </Card>
                  <p className='text-center font-poppin text-paragraph text-[0.8rem] w-full'>{index + 1}</p>
                </div>
              ))}
            </Document>
          </div>
        )}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-0 left-0 right-0 max-lg:hidden">
            <Card className="gap-2 flex justify-center items-center w-full">
              <CardContent className="flex justify-center gap-2 w-full items-end pt-4">
                <div className="w-full max-w-sm">
                  <SimpleDropdown name="input_language" control={control} label=" Input Language" data={InputLanguage} />
                </div>
                <div className="w-full max-w-sm">
                  <SimpleDropdown name="language" control={control} label="Output Language" data={data} />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Translating...' : 'Translate'}
                </Button>
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    </Card>
  );
};

export default PdfSummarizer;