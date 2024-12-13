'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'; // Import ShadCN Slider
import NextImage from 'next/image';
import { sharpenImageAction } from '@/actions/image/imageconversion'; // Server action for sharpening
import DownloadFile from '../DownloadFile'; // Utility to download the image
import { convertFileToBase64 } from '@/utils/image';

interface UnblurImageProps {
  file: File | null;
}

const UnblurImage: React.FC<UnblurImageProps> = ({ file }) => {
  const [sharpenValue, setSharpenValue] = useState<number>(1); // Slider value (1% by default)
  const [sharpenedImage, setSharpenedImage] = useState<string | null>(null); // State for the sharpened image
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSliderChange = (value: number[]) => {
    setSharpenValue(value[0]); // Update the sharpen value from the slider
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsSubmitting(true);
    setSharpenedImage(null);

    try {
      const base64Image = await convertFileToBase64(file);
      const sharpenedImageUrl = await sharpenImageAction(base64Image, sharpenValue);
      setSharpenedImage(sharpenedImageUrl);
    } catch (error) {
      console.error('Error sharpening the image:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {file && !sharpenedImage && (
        <Card className="w-full max-w-[940px] shadow-2xl border-none mx-auto">
          <CardContent className="py-10 flex justify-center items-center">
            <div className="relative w-[350px] aspect-square">
              <NextImage
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </CardContent>
          <CardFooter className="h-[150px] border-t flex flex-wrap items-center justify-center gap-4">
            <div className='max-w-[300px]'>
            <div className="w-[300px] flex items-center justify-between">
              <span className="text-sm font-medium">Strength</span>
              <span className="text-sm font-medium">{sharpenValue*10}%</span>
            </div>
            <Slider
              defaultValue={[1]} // Default slider value
              max={10} // Maximum sharpening value
              step={1} // Slider step size
              value={[sharpenValue]}
              onValueChange={handleSliderChange} // Update state on slider change
              className="mt-4 "
            />
            </div>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sharpening...' : 'Sharpen Image'}
            </Button>
          </CardFooter>
        </Card>
      )}

      {sharpenedImage && (
            <DownloadFile screenshot={sharpenedImage} />
        
      )}
    </>
  );
};

export default UnblurImage;
