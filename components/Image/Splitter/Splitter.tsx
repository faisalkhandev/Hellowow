
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';

const ImageCropper: React.FC<{ file: File }> = ({ file }) => {
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleNewImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSplitAndDownload = async () => {
    if (!canvasRef.current || !imgRef.current || !imageSrc) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = imgRef.current;

    if (context && image) {
      const sectionWidth = imgWidth / columns;
      const sectionHeight = imgHeight / rows;

      canvas.width = imgWidth;
      canvas.height = imgHeight;
      context.drawImage(image, 0, 0);

      const zip = new JSZip();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const sectionCanvas = document.createElement('canvas');
          const sectionContext = sectionCanvas.getContext('2d');
          sectionCanvas.width = sectionWidth;
          sectionCanvas.height = sectionHeight;
          sectionContext!.drawImage(
            canvas,
            x * sectionWidth,
            y * sectionHeight,
            sectionWidth,
            sectionHeight,
            0,
            0,
            sectionWidth,
            sectionHeight
          );
          const dataUrl = sectionCanvas.toDataURL();
          const base64Data = dataUrl.split(',')[1];
          zip.file(`image_${y}_${x}.png`, base64Data, { base64: true });
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "split_files.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      const imgElement = imgRef.current;
      const onLoad = () => {
        setImgWidth(imgElement.naturalWidth);
        setImgHeight(imgElement.naturalHeight);
      };
      imgElement.onload = onLoad;

      return () => {
        if (imgElement) {
          imgElement.onload = null;
        }
      };
    }
  }, [imageSrc]);

  useEffect(() => {
    if (canvasRef.current && imgRef.current && imageSrc) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = imgRef.current;

      if (context && image) {
        const sectionWidth = imgWidth / columns;
        const sectionHeight = imgHeight / rows;

        canvas.width = imgWidth;
        canvas.height = imgHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set the dashed pattern for the lines
        context.setLineDash([5, 5]);  // Dash length 5, space length 5

        for (let i = 1; i < columns; i++) {
          context.beginPath();
          context.moveTo(i * sectionWidth, 0);
          context.lineTo(i * sectionWidth, imgHeight);
          context.strokeStyle = '#126DAF';
          context.lineWidth = 2;
          context.stroke();
        }

        for (let i = 1; i < rows; i++) {
          context.beginPath();
          context.moveTo(0, i * sectionHeight);
          context.lineTo(imgWidth, i * sectionHeight);
          context.strokeStyle = '#126DAF';
          context.lineWidth = 2;
          context.stroke();
        }

        // Reset to solid line for other purposes, if needed
        context.setLineDash([]);  // Reset to solid line
      }
    }
  }, [columns, rows, imageSrc, imgWidth, imgHeight]);

  return (
    <>
      <Card className="w-full max-w-4xl border-none mx-auto p-4">
        <CardContent className='shadow-2xl py-4'>
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <h3 className="text-lg font-semibold text-heading flex-1">Splitter Settings</h3>

            <div className="flex items-center flex-1 space-x-2 shrink-0">
              <label className="text-sm font-medium text-heading">Columns</label>
              <Button variant="outline" onClick={() => setColumns(Math.max(1, columns - 1))} className='rounded-none'>-</Button>
              <Input
                className='border-grey flex-1 py-2 text-center rounded-none max-w-[100px]'
                value={columns}
                type='number'
                onChange={(e) => setColumns(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <Button variant="outline" onClick={() => setColumns(columns + 1)} className='rounded-none'>+</Button>
            </div>
            <div className="flex items-center flex-1 space-x-2">
              <label className="text-sm font-medium text-heading">Rows</label>
              <Button variant="outline" onClick={() => setRows(Math.max(1, rows - 1))} className='rounded-none'>-</Button>
              <Input
                className='border-grey flex-1 py-2 text-center rounded-none max-w-[100px]'
                value={rows}
                type='number'
                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <Button variant="outline" onClick={() => setRows(rows + 1)} className='rounded-none'>+</Button>
            </div>
          </div>
        </CardContent>

        <CardContent>
          <div className='flex justify-center items-center'>
            <div className='w-[300px] h-auto relative my-6'>
              <Image
                ref={imgRef}
                src={imageSrc || ''}
                alt="Uploaded"
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              <canvas
                ref={canvasRef}
                className='w-full h-full absolute top-0 left-0 pointer-events-none'
                style={{
                  border: '2px dashed #126DAF' // Adds the dashed border with the specified color
                }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="mt-4 flex space-x-4 justify-end  w-full">
            <Button onClick={handleNewImageClick}>New Image</Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Button size="lg" onClick={handleSplitAndDownload}>Split & Download</Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ImageCropper;
