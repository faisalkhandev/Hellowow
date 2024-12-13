"use client";

import CustomDropzone from '@/components/Video/Custom-dropzone';
import { acceptedImageFiles } from '@/utils/video';
import React, { useState } from 'react';
import BackgroundSelector from './BackgroundSelector';
import BackgroundRemoverImage from './BackgroundRemoverImage';
import { BeatLoader } from 'react-spinners';
import { removeBackgroundFromImage } from '@/utils/image';




const BackgroundRemover = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [background, setBackground] = useState<string | null>(null);

  const handleUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    await removeBackground(uploadedFile);
  };

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
      {loading && <div className='w-full h-full grid place-content-center'><BeatLoader/></div> }
      {error && <p>{error}</p>}
      {processedImage && !loading && (
        <div className='w-full max-w-[1000px] mx-auto grid grid-cols-[.5fr_1fr] gap-5'>
          <BackgroundSelector setBackground={setBackground} />
          {processedImage ? (
            <BackgroundRemoverImage file={processedImage} background={background!} />
          ) : (
            <p>No processed image available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BackgroundRemover;

