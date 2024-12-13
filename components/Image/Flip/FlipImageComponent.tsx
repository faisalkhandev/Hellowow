"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import Image from "next/image";
import { Button } from "../../ui/button";
import DownloadFile from "../DownloadFile";

interface ImageFlipDownloadProps {
  imageFile: File | null; // Accept image file as prop
}

export default function ImageFlipDownload({ imageFile }: ImageFlipDownloadProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [flipVertical, setFlipVertical] = useState(false);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // Convert the file to a data URL when the imageFile prop changes
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string); // Set the imageSrc to the file's base64 URL
      };
      reader.readAsDataURL(imageFile); // Convert the file to a data URL
    }
  }, [imageFile]);

  // Flip image on canvas
  const flipImage = (flipVertical: boolean, flipHorizontal: boolean) => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    if (ctx && img) {
      // Set canvas size to image size
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Apply transformations
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      if (flipVertical) ctx.scale(1, -1);
      if (flipHorizontal) ctx.scale(-1, 1);

      // Draw the image after applying the flip transformation
      ctx.drawImage(
        img,
        flipHorizontal ? -img.naturalWidth : 0,
        flipVertical ? -img.naturalHeight : 0
      );
      ctx.restore();
    }
  };

  // Download flipped image
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageURL = canvas.toDataURL("image/png"); // Get the flipped image as PNG
   setScreenshot(imageURL)
  };

  return (
    <>
    {
      !screenshot && (

    
    <Card className="w-full max-w-4xl border-none mx-auto p-4">
      <CardContent>
        <div className="flex justify-center items-center">
          <div className="w-[300px] h-auto relative my-6">
            {/* Image component with ref */}
            {imageSrc && (
              <Image
                ref={imgRef}
                src={imageSrc}
                alt="Uploaded"
                width={0}
                height={0}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            )}
            <canvas
              ref={canvasRef}
              className="w-full h-full absolute top-0 left-0 pointer-events-none"
             
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t">
        <div className="mt-4 flex space-x-4 justify-around w-full ">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={flipVertical}
              onChange={(e) => {
                setFlipVertical(e.target.checked);
                flipImage(e.target.checked, flipHorizontal); // Update the canvas with the current flip state
              }}
                className='w-[20px] h-[20px]'
            />
             Vertical
          </label>
          <br />
          <label className="flex gap-2 items-center ">
            <input
              type="checkbox"
              checked={flipHorizontal}
              onChange={(e) => {
                setFlipHorizontal(e.target.checked);
                flipImage(flipVertical, e.target.checked); // Update the canvas with the current flip state
              }}
                className='w-[20px] h-[20px]'
            />
             Horizontal
          </label>
          <Button size="lg" onClick={downloadImage}>
            Flip
          </Button>
        </div>
      </CardFooter>

    </Card>
      )
    }
    {screenshot && (
      <DownloadFile screenshot={screenshot} />
    )}
    </>
  );
}
