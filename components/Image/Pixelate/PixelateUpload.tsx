// components/Image/BlurBackground/BlurBackground.tsx
"use client";

import CustomDropzone from '@/components/Video/Custom-dropzone';
import { acceptedImageFiles } from '@/utils/video';
import React, { useState } from 'react';
import PixelationExample from './pixelateComponent';

const PixelateComponent = () => {
  const [file, setFile] = useState<File | null>(null);


  const handleUpload = async (uploadedFile: File) => {
    
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
      {file && (
        <PixelationExample  file={file} />
      )}
    </div>
  );
};

export default PixelateComponent;