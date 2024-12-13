// components/CustomDropzone.tsx
import React, { useRef, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TooltipButton from '@/components/common/TooltipButton';
import { FolderUp } from 'lucide-react';
import { Drive } from '@/public/icons/Svgs';

type CustomDropzoneProps = {
  handleUpload: (file: File) => void;
  acceptedFile: { [key: string]: string[] };
  disabled?: boolean;
};

const CustomDropzone: React.FC<CustomDropzoneProps> = ({ handleUpload, acceptedFile, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  

  const acceptString = Object.entries(acceptedFile)
    .map(([key, extensions]) => `${key},${extensions.map(ext => `.${ext}`).join(',')}`)
    .join(',');

  const isFileAccepted = (file: File) => {
    const fileExtension = file.name.split('.').pop(); // Get the file extension
    const isAcceptedByType = Object.keys(acceptedFile).some((key) =>
      acceptedFile[key].includes(file.type)
    );

    // Check if fileExtension is defined before using it
    const isAcceptedByExtension = fileExtension ? Object.keys(acceptedFile).some((key) =>
      acceptedFile[key].includes(fileExtension)
    ) : false;

    return isAcceptedByType || isAcceptedByExtension; // Accept if either check passes
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setError(null); // Clear any previous error
      handleUpload(acceptedFiles[0]); // Call the upload handler with the first accepted file
    }
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    setError(`Unsupported file type. Please upload a valid file.`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: acceptedFile,
    disabled,
    multiple: false, // Set to false to allow only single file uploads
  });

  return (
    <Card className='w-full max-w-[940px] shadow-2xl border-none m-auto'>
      <div className="flex flex-col justify-center items-center h-[450px] space-y-4 ">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className='flex gap-2 text-white font-poppin text-[1rem] font-[600] h-14 px-4 sm:px-8'
        >
          <FolderUp size={18} strokeWidth={3} />
          Upload from PC or Mobile
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptString} // Use the generated string for accept
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              if (file) {
                if (isFileAccepted(file)) {
                  setError(null); // Clear any previous error
                  handleUpload(file); // Call the upload handler with the selected file
                } else {
                  setError(`Unsupported file type. Please upload a valid file.`);
                }
              }
            }
          }}
          style={{ display: 'none' }}
        />
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <p className='font-poppin text-[1rem] text-paragraph font-[400]'>
            {isDragActive ? 'Drop the file here...' : 'or Drag files here'}
          </p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
        <TooltipButton tooltipContent="Google Drive">
          <div className="p-2 rounded-full bg-[#F9FCFE] cursor-pointer">
            <Drive />
          </div>
        </TooltipButton>
      </div>
    </Card>
  );
};

export default CustomDropzone;