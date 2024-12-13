// components/FileUploader.tsx
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface FileUploaderProps {
  selectedFile: File | null; // File object or null if no file is selected
  isConverting: boolean;
  type:string; // Indicates if the conversion is in progress
  handleConversion: () => void; // Function to handle file conversion
  resetState: () => void; // Function to reset the state
}

const FileUploader: React.FC<FileUploaderProps> = ({
  selectedFile,
  isConverting,
  handleConversion,
  resetState,
  type
}) => {
  return (
    <>
      {selectedFile && (
        <Card className=" h-full shadow-2xl">
          <div className="flex flex-col  items-center justify-center h-full  rounded-lg space-y-4">
            <div className="flex flex-col items-center ">
              <svg
                className="w-16 h-16  text-primary"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className='text-center'>
                <p className="font-poppin text-paragraph text-[1.2rem] font-[400] text-wrap">
                  {selectedFile.name}
                  {" "}
                 ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
                
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
              variant="ghost"
              size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  resetState();
                }}
                className='h-12'
                
              >
                Remove
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleConversion();
                }}
                disabled={isConverting}
                className='h-12'
              
              >
                {isConverting ? "Converting..." : `Convert to ${type}`}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FileUploader;