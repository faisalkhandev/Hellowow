"use client"

import CustomDropzone from '@/components/Video/Custom-dropzone'
import { acceptedImageFiles } from '@/utils/video';
import React, { useState } from 'react'
import { toast } from 'sonner';
import RoundedImageCropper from './Splitter';

const SplitterComponent = () => {
  const [file, setFile] = useState<File | null>(null);

    const handleUpload = async (uploadedFile: File) => {
        if (uploadedFile.size > 3 * 1024 * 1024) {
            toast.error('File size does not exceed 1 MB');
            return;
          }
        setFile(uploadedFile);
      };
  return (
    <div>
       
      {!file && (
        <CustomDropzone 
          handleUpload={handleUpload} 
          acceptedFile={acceptedImageFiles}
        />
      )}
      {
        file && (
            <RoundedImageCropper file={file}/>
        )
      }
      
    </div>
  )
}

export default SplitterComponent
