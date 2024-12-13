'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import DownloadFile from '../DownloadFile';

const PixelationExample = ({ file }: { file: File }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [pixelSize, setPixelSize] = useState(10);  // Default pixel size for pixelation
  const [screenshot, setScreenshot] = useState<string | null>(null);  // To store the base64 of pixelated image
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        console.log('Image loaded successfully');
        setImage(img);
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            console.log('Image drawn on canvas');
          }
        }
      };
      img.onerror = (err) => {
        console.error('Failed to load image:', err);
      };
    }
  }, [file]);

  const applyPixelation = () => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0);

        // Apply pixelation
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelatedData = ctx.createImageData(canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += pixelSize) {
          for (let x = 0; x < canvas.width; x += pixelSize) {
            // Get the color of the current pixel
            const i = (y * canvas.width + x) * 4;
            const r = imgData.data[i];
            const g = imgData.data[i + 1];
            const b = imgData.data[i + 2];
            const a = imgData.data[i + 3];

            // Set the surrounding pixels to this color (pixelating effect)
            for (let py = 0; py < pixelSize; py++) {
              for (let px = 0; px < pixelSize; px++) {
                const j = ((y + py) * canvas.width + (x + px)) * 4;
                pixelatedData.data[j] = r;
                pixelatedData.data[j + 1] = g;
                pixelatedData.data[j + 2] = b;
                pixelatedData.data[j + 3] = a;
              }
            }
          }
        }

        ctx.putImageData(pixelatedData, 0, 0);
      }
    }
  };
  useEffect(() => {
    if (image) {
      applyPixelation();  // Reapply the pixelation effect when image or pixelSize changes
    }
  }, [image, pixelSize]);
  const handlePixelateClick = async () => {
    if (file && canvasRef.current) {
      applyPixelation();
      const canvas = canvasRef.current;
      const pixelatedImageData = canvas.toDataURL('image/png');
      setScreenshot(pixelatedImageData);
    }
  };

  return (
    <>
      {!screenshot && (
        <Card className="w-full max-w-[940px] shadow-2xl border-none mx-auto">
          <CardContent className="py-10 flex justify-center items-center">
            <canvas ref={canvasRef} className='w-full h-auto' />
          </CardContent>
          <CardFooter className="h-[150px] border-t">
            <div className="flex gap-5 w-full justify-center items-end">
              <div className="relative w-[300px]">
                <label className="mr-2 absolute -top-7 left-0 font-poppin">Pixelate</label>
                <Slider
                  min={1}
                  max={40}
                  onValueChange={(value) => setPixelSize(Number(value[0]))}
                  className="w-full mt-1"
                />
                <span className="absolute -top-7 right-0 font-poppin">{Math.round((pixelSize / 40) * 100)}%</span>
              </div>
              <Button onClick={handlePixelateClick} size="lg">
                Pixelate
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      {screenshot && (
        <div className="mt-4">
          <DownloadFile screenshot={screenshot} />
        </div>
      )}
    </>
  );
};

export default PixelationExample;