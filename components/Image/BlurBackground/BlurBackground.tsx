// components/Image/BlurBackground/BlurBackground.tsx
"use client";

import CustomDropzone from '@/components/Video/Custom-dropzone';
import { acceptedImageFiles } from '@/utils/video';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { removeBackgroundFromImage } from '@/utils/image';
import BlurImageUpload from './BluredImage';

const BlurBackground = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (uploadedFile: File) => {
    
    setFile(uploadedFile);

    await removeBackground(uploadedFile);
  };
  console.log(file);

  const removeBackground = async (uploadedFile: File) => {
    setLoading(true);
    setError(null);

    try {
      const resultUrl = await removeBackgroundFromImage(uploadedFile);
      setProcessedImage(resultUrl);
    } catch (err) {
      setError('Error removing background');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!file && (
        <CustomDropzone 
          handleUpload={handleUpload} 
          acceptedFile={acceptedImageFiles}
        />
      )}
      {loading && <div className='w-full h-full flex justify-center items-center'><BeatLoader color='#1D8DE0'/></div> }
      {error && <p>{error}</p>}
      {processedImage && !loading && (
        <BlurImageUpload imageSrc={processedImage} file={file} />
      )}
    </div>
  );
};

export default BlurBackground;