import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import { file } from 'jszip';
import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image, Transformer, Rect } from 'react-konva';
import useImage from 'use-image';

type ImageType = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const EditableImage = ({
  image,
  onSelect,
  isSelected,
  onChange,
  onDelete,
}: {
  image: ImageType;
  onSelect: () => void;
  isSelected: boolean;
  onChange: (newAttrs: ImageType) => void;
  onDelete: () => void;
}) => {
  const [img] = useImage(image.src);
  const shapeRef = useRef(null);  // Ref for the image node
  const trRef = useRef(null);     // Ref for the transformer
  const [svgDataUrl] = useImage(`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRyYXNoIj48cGF0aCBkPSJNMyA2aDE4Ii8+PHBhdGggZD0iTTE5IDZ2MTRjMCAxLTEgMi0yIDJIN2MtMSAwLTItMS0yLTJWNiIvPjxwYXRoIGQ9Ik04IDZWNGMwLTEgMS0yIDItMmg0YzEgMCAyIDEgMiAydjIiLz48L3N2Zz4=`);
  useEffect(() => {
    if (shapeRef.current && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();  // Redraw the layer to update transformer
    }
  }, [isSelected]);

  return (
    <>
      <Image
        image={img}
        alt=""
        x={image.x}
        y={image.y}
        width={image.width}
        height={image.height}
        draggable
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if(node){
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            node.scaleX(1);
            node.scaleY(1);
  
            onChange({
              ...image,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),   
              height: Math.max(5, node.height() * scaleY),
            });
          }
        
        }}
      />

      {/* Delete Icon positioned at top-right of the image */}
      <Image
        image={svgDataUrl}
        alt="img"
        x={image.x}  // Position the delete icon inside the image (top-right)
        y={image.y - 20}                // Align with the top-right corner
        width={20}                      // Set width of the delete icon
        height={20}                     // Set height of the delete icon
        onClick={onDelete}              // Trigger delete when clicked
      />
      <Transformer
        ref={trRef}
        flipEnabled={false}
        boundBoxFunc={(oldBox, newBox) => {
          if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </>
  );
};

const ImageCropper: React.FC<{ file: File }> = ({ file }) => {
  const [backgroundImage, setBackgroundImage] = useState(URL.createObjectURL(file)||null);
  const [overlayImages, setOverlayImages] = useState<ImageType[]>([]);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [bgImage] = useImage(backgroundImage || '');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleOverlayImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage: ImageType = {
          id: `${overlayImages.length}`,
          src: reader.result as string,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
        };
        setOverlayImages([...overlayImages, newImage]);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const deleteImage = (id: string) => {
    setOverlayImages(overlayImages.filter((image) => image.id !== id));
  };
  const handleBackgroundImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();  // Trigger the file input click event
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="controls">
      <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleOverlayImageChange}
          ref={fileInputRef}  // Attach ref to the file input
          style={{ display: 'none' }}  // Hide the input field
        />
      </div>
      <div ref={imageContainerRef}>

      <Stage width={500} height={500} onMouseDown={() => selectShape(null)}    >
        <Layer>
          {backgroundImage && (
            <Image
              image={bgImage}
              alt=""
              width={500}
              height={500}
              onClick={handleBackgroundImageClick}
            />
          )}
          {overlayImages.map((image, index) => (
            <EditableImage
              key={image.id}
              image={image}
              isSelected={image.id === selectedId}
              onSelect={() => selectShape(image.id)}
              onChange={(newAttrs) => {
                const imgs = overlayImages.slice();
                imgs[overlayImages.findIndex((img) => img.id === image.id)] = newAttrs;
                setOverlayImages(imgs);
              }}
              onDelete={() => deleteImage(image.id)}
            />
          ))}
        </Layer>
      </Stage>
      </div>
      <Button size="lg" onClick={handleDownload}>Download</Button>
    </div>
  );
};

export default ImageCropper;
