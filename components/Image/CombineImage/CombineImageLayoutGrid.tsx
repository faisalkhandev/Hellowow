"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

// Define layout options
const layoutOptions = [
  { id: 1, label: 'Side By Side' },
  { id: 2, label: 'Vertically' },
];

const PhotoLayoutGrid = () => {
  const [selectedLayout, setSelectedLayout] = useState<number>(1); // Default layout: Side By Side
  const [files, setFiles] = useState<(File | null)[]>([null, null]); // Array to store uploaded files

  // Handle file upload
  const handleFileUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    const updatedFiles = [...files];
    updatedFiles[index] = selectedFile; // Replace the file at the given index
    setFiles(updatedFiles);
  };

  // Render a single slot
  const renderSlot = (index: number) => (
    <div
      className="relative border flex items-center justify-center bg-gray-200 w-full aspect-square max-h-[350px] border-black"
      key={index}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(index, e)}
        className="hidden"
        id={`file-input-${index}`}
      />
      {files[index] ? (
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={URL.createObjectURL(files[index]!)}
            alt={`Uploaded ${index}`}
            width={0}
            height={0}
            className="object-cover h-full  w-full"
          />
        </div>
      ) : (
        <label
          htmlFor={`file-input-${index}`}
          className="cursor-pointer text-center text-sm text-gray-500"
        >
          +
        </label>
      )}
    </div>
  );

  // Handle layout selection
  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLayout(Number(e.target.value));
  };

  // Download the collage
  const handleDownloadCollage = () => {
    const gridElement = document.getElementById('photo-layout-grid');
    if (gridElement) {
      html2canvas(gridElement, {
        scrollX: 0,
        scrollY: -window.scrollY, // Fix scroll issue when capturing
        useCORS: true, // Ensure images from external sources are included
        backgroundColor: null, // Transparent background
        allowTaint: true, // Allow cross-origin images
        x: 0,
        y: 0,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'collage.png';
        link.click();
      });
    }
  };

  // Check if both images are uploaded for vertical layout
  const areBothImagesUploaded = files.every((file) => file !== null);

  return (
    <div className="p-4">
      <Card className="p-0 border-none">
        <CardContent className="p-4 space-y-4 ">
          {/* Layout Selection */}
          <div className="flex justify-between items-center shadow-2xl p-4">
          <Button variant="secondary" size="lg" onClick={() => setFiles([null, null])}>
            New Image
          </Button>
            <select
              value={selectedLayout}
              onChange={handleLayoutChange}
              className="border border-gray-300 rounded-lg px-2 py-1"
            >
              {layoutOptions.map((layout) => (
                <option key={layout.id} value={layout.id}>
                  {layout.label}
                </option>
              ))}
            </select>
          </div>

          {/* Collage Grid */}
          <div className="w-full flex justify-center items-center border py-4">
            <div
              id="photo-layout-grid"
              className={`grid ${
                selectedLayout === 1
                  ? 'grid-cols-2  w-full' // Side By Side Layout
                  : `grid-rows-2  ${areBothImagesUploaded ? 'w-[50%]' : 'w-full'}` // Vertically Layout
              } `}
            >
              {files.map((_, index) => renderSlot(index))}
            </div>
          </div>
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="justify-end p-4 items-center space-x-3">
       
          <Button size="lg" onClick={handleDownloadCollage}>
            Download Collage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PhotoLayoutGrid;
