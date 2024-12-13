"use client"
import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DownloadFile from '../DownloadFile';
import NextImage from 'next/image';

interface BlurImageUploadProps {
  imageSrc: string;
  file: File | null;
}

const BlurImageUpload: React.FC<BlurImageUploadProps> = ({ imageSrc, file }) => {
  const [blur, setBlur] = useState(0);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (file && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (ctx) {
          // Set canvas dimensions to match the image
          if(!canvasRef.current) return null;
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          
          // Clear the canvas and apply the blur
          ctx.clearRect(0, 0, img.width, img.height);
          ctx.filter = `blur(${blur}px)`;
          ctx.drawImage(img, 0, 0, img.width, img.height);
        }
      };
    }
  }, [file, blur]);

  const handleScreenshot = () => {
    const container = imageContainerRef.current;
    if (container) {
      html2canvas(container, {
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        setScreenshot(canvas.toDataURL('image/png'));
      });
    }
  };

  return (
    <>
    {
      !screenshot && (
        <Card className='w-full max-w-[940px] shadow-2xl border-none mx-auto'>
        <CardContent className='py-10 flex justify-center items-center'  >
          {file && (
            <div className='relative w-[868px]' ref={imageContainerRef}>
              <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <NextImage
                  src={imageSrc}
                  alt="Overlay Image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}
          
        </CardContent>
        <CardFooter className='h-[150px] border-t'>
          <div className="flex gap-3 w-full justify-center items-end">
            <div className='relative w-[300px]'>
              <label className="mr-2 absolute -top-7 left-0 font-poppin">Blur</label>
              <Slider min={0} max={40} onValueChange={(value) => setBlur(value[0])} className='w-full mt-1'/>
              <span className='absolute -top-7 right-0 font-poppin'>{Math.round((blur / 40) * 100)}%</span>
            </div>
            <Button onClick={handleScreenshot} size="lg">Blur</Button>
          </div>
        </CardFooter>
      </Card>
      )
    }
   
    {screenshot && (
      <div className='mt-4'>
    <DownloadFile screenshot={screenshot}/>
      </div>
    )}
    </>
  );
};

export default BlurImageUpload;
