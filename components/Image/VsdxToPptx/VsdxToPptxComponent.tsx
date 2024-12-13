




// app/page.js
'use client';

import { useState } from 'react';
import { convertVSDToPPTX } from './actions/convert-vsd-to-pptx'; // Import the Server Action
import DownloadFile from '../DownloadFile';
import CustomDropzone from '@/components/Video/Custom-dropzone';

export default function VsdxToPptxComponent() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);

    try {
      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append('file', file);

      // Directly call the Server Action and pass the FormData
      const result = await convertVSDToPPTX(formData);

      // Set the download URL returned by the Server Action
      setDownloadUrl(result);
    } catch (error) {
      console.error('Error during conversion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
       
    {!file && (
      <CustomDropzone 
        handleUpload={handleUpload} 
        acceptedFile={{ 'image/': ['heic'] }}
      />
    )}
    {
      file && (
          <DownloadFile screenshot={downloadUrl}/>
      )
    }
    
  </div>
  );
}

