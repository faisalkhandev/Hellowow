/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

// Custom hook for managing file inputs
const useFileInput = (index: number) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
  };

  return { fileInputRef, handleFileSelect, handleFileChange, files, setFiles };
};

interface PhotoLayoutGridProps {
  selectedTemplate: number;
  borderWidth: number; // Define borderWidth prop
  borderColor: string; // Define borderColor prop
}

const PhotoLayoutGrid: React.FC<PhotoLayoutGridProps> = ({ selectedTemplate, borderWidth, borderColor }) => {
  const fileInputs = Array.from({ length: 4 }, (_, index) => useFileInput(index));

  const renderGridItem = (index: number) => (
    <div className="relative flex items-center justify-center p-2 h-full">
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.svg,.tiff,.webp,.heic"
        multiple
        ref={fileInputs[index].fileInputRef}
        onChange={fileInputs[index].handleFileChange}
        className="hidden"
        aria-label={`Select files for item ${index + 1}`}
      />
      <Button
        variant="outline"
        onClick={fileInputs[index].handleFileSelect}
        aria-label={`Select files for item ${index + 1}`}
      >
        +
      </Button>
      {/* Display selected file names or image previews */}
      {fileInputs[index].files && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          {Array.from(fileInputs[index].files).map((file) => {
            const isImage = file.type.startsWith('image/');
            return (
              <div key={file.name} className="flex items-center justify-center">
                {isImage ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    layout="fill" // Use fill to cover the entire div
                    objectFit="cover" // Cover the entire area
                  />
                ) : (
                  <div className="mr-1">📄</div> // Placeholder for non-image files
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Function to reset file inputs
  const handleNewImage = () => {
    fileInputs.forEach(input => {
      input.setFiles(null); // Reset each file input state
      if (input.fileInputRef.current) {
        input.fileInputRef.current.value = ''; // Clear the file input value
      }
    });
  };

  // Function to download the collage
  const handleDownloadCollage = () => {
    const gridElement = document.getElementById('photo-layout-grid'); // Get the grid element
    if (gridElement) {
      html2canvas(gridElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // Convert canvas to image
        link.download = 'collage.png'; // Set the download filename
        link.click(); // Trigger the download
      });
    }
  };

  return (
    <div > {/* Add an ID for the grid element */}
      <Card className='p-0 border-none mt-3'>
        <CardContent className='p-0 border h-[800px]' id="photo-layout-grid">
          {/* Render the selected template layout */}
          {selectedTemplate === 1 && (
            <div className="grid grid-cols-2 h-full">
              {fileInputs.map((_, index) => (
                <div
                  key={index}
                  className="relative bg-gray-200"
                  style={{
                    borderRight: index % 2 === 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
                    borderBottom: (index === 2 || index === 3) ? 'none' : `${borderWidth}px solid ${borderColor}`,
                  }}
                >
                  {renderGridItem(index)}
                </div>
              ))}
            </div>
          )}
          {selectedTemplate === 2 && (
            <div className="grid grid-rows-2 h-full">
              <div
                className="relative bg-gray-200"
                style={{
                  borderBottom: `${borderWidth}px solid ${borderColor}`,
                }}
              >
                {renderGridItem(0)}
              </div>
              <div className="grid grid-cols-2">
                <div
                  className="relative bg-gray-200"
                  style={{
                    borderRight: `${borderWidth}px solid ${borderColor}`,
                  }}
                >
                  {renderGridItem(1)}
                </div>
                <div className="relative bg-gray-200">
                  {renderGridItem(2)}
                </div>
              </div>
            </div>
          )}
          {selectedTemplate === 3 && (
            <div className="grid grid-cols-2 h-full">
              <div
                className="bg-gray-200 col-span-2"
                style={{
                  borderBottom: `${borderWidth}px solid ${borderColor}`,
                }}
              >
                {renderGridItem(0)}
              </div>
              <div
                className="relative bg-gray-200"
                style={{
                  borderRight: `${borderWidth}px solid ${borderColor}`,
                }}
              >
                {renderGridItem(1)}
              </div>
              <div className="relative bg-gray-200">
                {renderGridItem(2)}
              </div>
            </div>
          )}
          {selectedTemplate === 4 && (
            <div className="grid grid-cols-2 h-full">
              <div
                className="relative bg-gray-200"
                style={{
                  borderBottom: `${borderWidth}px solid ${borderColor}`,
                }}
              >
                {renderGridItem(0)}
              </div>
              <div
                className="relative bg-gray-200 row-span-2"
                style={{
                  borderLeft: `${borderWidth}px solid ${borderColor}`,
                }}
              >
                {renderGridItem(1)}
              </div>
              <div
                className="relative bg-gray-200"
                style={{
                  borderTop: `${borderWidth}px solid ${borderColor}`,
                }}
              >
                {renderGridItem(2)}
              </div>
            </div>
          )}
          {selectedTemplate === 5 && (
            <div className="grid grid-rows-2 h-full">
              <div className="grid grid-cols-2">
                <div
                  className="relative bg-gray-200"
                  style={{
                    borderBottom: `${borderWidth}px solid ${borderColor}`,
                    borderRight: `${borderWidth}px solid ${borderColor}`,
                  }}
                >
                  {renderGridItem(0)}
                </div>
                <div
                  className="relative bg-gray-200"
                  style={{
                    borderBottom: `${borderWidth}px solid ${borderColor}`,
                    borderLeft: `${borderWidth}px solid ${borderColor}`,
                  }}
                >
                  {renderGridItem(1)}
                </div>
              </div>
              <div
                className="relative bg-gray-200"
                style={{
                  borderTop: `${borderWidth}px solid ${borderColor}`,
                }}
              >
                {renderGridItem(2)}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className='justify-end p-0 py-3 space-x-3'>
          <Button variant="secondary" size="lg" className='border' onClick={handleNewImage}>New Image</Button>
          <Button onClick={handleDownloadCollage}>Download Collage</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PhotoLayoutGrid;