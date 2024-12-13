import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const BackgroundRemoverImage = ({ file, background }: { file: string, background: string }) => {
  const isImage = background?.startsWith('url(');
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    const container = imageContainerRef.current;
    if (container) {
      html2canvas(container).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'image-with-background.png';
        link.click();
      });
    }
  };

  return (
    <Card className='flex flex-col'>
      <CardContent className='flex-1 flex-grow grid place-content-center'>
        <div
          ref={imageContainerRef}
          className='w-[500px] h-[400px] relative '
          style={isImage ? { backgroundImage: background } : { backgroundColor: background }}
        >
          <Image src={file} fill objectFit='contain' alt="remove-bg-img" priority={true} />
        </div>
      </CardContent>
      <CardFooter className='border-t h-[200px] flex gap-2 justify-end items-start p-3'>
        <Button variant="outline" size="lg">Cancel</Button>
        <Button size="lg" onClick={handleDownload}>Download</Button>
      </CardFooter>
    </Card>
  );
}

export default BackgroundRemoverImage;