// components/Image/BlurBackground/BlurBackground.tsx
"use client";

import CustomDropzone from '@/components/Video/Custom-dropzone';
import { acceptedImageFiles } from '@/utils/video';
import React, { useState } from 'react';
import BorderImageExample from './ImageBrderComponent';

const BorderComponent = () => {
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
        <BorderImageExample  file={file} />
      )}
    </div>
  );
};

export default BorderComponent;