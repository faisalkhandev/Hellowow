import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import DownloadFile from '../DownloadFile';
import { ColorPickerComponent } from '../BackgroundRemover/ColorPicker';

interface BorderImageExampleProps {
  file: File | null;
}

const BorderImageExample = ({ file }: BorderImageExampleProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [borderWidth, setBorderWidth] = useState(1);  // Default border width
  const [selectedColor, setSelectedColor] = useState('#80A1D4'); // Default color
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [outsideBorder, setOutsideBorder] = useState(false); // State to toggle border inside or outside
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load image from file
  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => setImage(img);
    }
  }, [file]);

  // Apply border when image, color, border width or border type changes
  const applyBorder = () => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let canvasWidth, canvasHeight, imageX, imageY;

        if (outsideBorder) {
          // Increase canvas size for outside border
          canvasWidth = image.width + 2 * borderWidth;
          canvasHeight = image.height + 2 * borderWidth;
          imageX = borderWidth;
          imageY = borderWidth;
        } else {
          // Keep canvas size the same for inside border
          canvasWidth = image.width;
          canvasHeight = image.height;
          imageX = 0;
          imageY = 0;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Fill background for border
        ctx.fillStyle = selectedColor; // Using the selected color
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw the image
        ctx.drawImage(image, imageX, imageY);

        if (!outsideBorder) {
          // Redraw border inside over the image
          ctx.fillStyle = selectedColor;
          ctx.fillRect(0, 0, canvasWidth, borderWidth); // Top border
          ctx.fillRect(0, canvasHeight - borderWidth, canvasWidth, borderWidth); // Bottom border
          ctx.fillRect(0, 0, borderWidth, canvasHeight); // Left border
          ctx.fillRect(canvasWidth - borderWidth, 0, borderWidth, canvasHeight); // Right border
        }

      }
    }
  };

  const handleclick = async () => {
    if (file && canvasRef.current) {
      applyBorder();
      const canvas = canvasRef.current;
      setScreenshot(canvas.toDataURL('image/png'));

    }
  };

  // Reapply border when image, selected color, border width or border type changes
  useEffect(() => {
    if (image) {
      applyBorder();  // Reapply border when image or related properties change
    }
  }, [image, selectedColor, borderWidth, outsideBorder]);  // Trigger reapply when these values change

  return (
    <>
      {image &&  (
        <Card className="w-full max-w-[940px] shadow-2xl border-none mx-auto">
          <CardContent className="py-10 flex justify-center items-center">
            <canvas ref={canvasRef} style={{ border: '1px solid #ddd', width: '450px', height: 'auto' }} />
          </CardContent>
          <CardFooter className="h-[150px] border-t">
            <div className="flex flex-col md:flex-row gap-3 w-full justify-center ">
              <div className='flex gap-2'>
            <input
                type="number"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                className="border max-w-[100px] p-2 text-center"
                min="1"
                max="50"
              />
              <ColorPickerComponent setselectedColor={setSelectedColor} selectedColor={selectedColor} />
              </div>
              <div className='flex gap-2 items-end'>
              <label className='flex items-start gap-2'>
                <input
                  type="checkbox"
                  checked={outsideBorder}
                  onChange={(e) => setOutsideBorder(e.target.checked)}
                  className='w-[20px] h-[20px]'
                />
                Outside Border
              </label>
              <Button onClick={handleclick}>
                Apply Border
              </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
      {screenshot && (
        <DownloadFile screenshot={screenshot} />
      )}
    </>
  );
};

export default BorderImageExample;
