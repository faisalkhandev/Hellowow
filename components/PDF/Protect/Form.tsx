// components/Write/SummarizePdf/Form.tsx
"use client";

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TooltipButton from '@/components/common/TooltipButton';
import { Eye, EyeOff, FolderUp, Lock } from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfSummarizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // Password visibility state
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState); // Toggle password visibility
  };

  return (
    <>
      {!files.length && (
        <Card className="w-full lg:w-[944px] h-[450px] shadow-2xl border-none px-4 m-auto">
          <div className="flex flex-col justify-center items-center space-y-4 max-lg:px-4 h-full">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="flex gap-2 text-white font-poppin text-[1rem] font-[600] h-14 w-full max-w-[320px]"
            >
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
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? 'active' : ''}`}
            >
              <input {...getInputProps()} />
              <p className="font-poppin text-[1rem] text-paragraph font-[400]">
                {isDragActive ? 'Drop the PDF here...' : 'or Drag files here'}
              </p>
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
        <Card className="w-full min-h-[450px] h-full shadow-2xl border-none px-4 flex justify-center items-center">
          <div className="px-4 py-8 h-full relative flex flex-col">
            <div className="flex flex-col justify-center items-center space-y-5 h-full">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col">
                  <Label className="font-poppin text-[1rem] font-[600] text-paragraph">
                    Choose Password
                  </Label>
                  <div className="relative rounded-md border">
                    <Input
                      type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
                      className="h-10 text-[1rem] border-none bg-input"
                    />
                    {isPasswordVisible ? (
                      <EyeOff
                        className="absolute mr-4 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        size={18}
                        color="#1A8FE3"
                        onClick={togglePasswordVisibility} // Hide password
                      />
                    ) : (
                      <Eye
                        className="absolute mr-4 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        size={18}
                        color="#1A8FE3"
                        onClick={togglePasswordVisibility} // Show password
                      />
                    )}
                  </div>
                </div>
                <Button>Protect</Button>
                <p className="font-poppin text-[1rem] font-[500] text-paragraph flex items-center gap-2">
                  <span>
                    <Lock size={20} color="green" />
                  </span>
                  128-bit AES Encryption Protected
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default PdfSummarizer;
