"use client";

import React, { useRef, useState, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import shadcn card components
import { Button } from "@/components/ui/button";
import DownloadFile from "../DownloadFile";

const ImageCropper: React.FC<{ file: File }> = ({ file }) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // Cropper settings
  const [cropperWidth, setCropperWidth] = useState<number>(0);
  const [cropperHeight, setCropperHeight] = useState<number>(0);
  const [maxImageWidth, setMaxImageWidth] = useState<number>(0);
  const [maxImageHeight, setMaxImageHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

  useEffect(() => {
    // Set the selected image from the passed file on initial load
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const initializeCropperDimensions = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const imageData = cropper.getImageData();
      setMaxImageWidth(Math.round(imageData.naturalWidth));
      setMaxImageHeight(Math.round(imageData.naturalHeight));

      const cropBoxData = cropper.getCropBoxData();
      setCropperWidth(Math.round(cropBoxData.width));
      setCropperHeight(Math.round(cropBoxData.height));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Math.min(parseInt(e.target.value, 10), maxImageWidth);
    setCropperWidth(width);
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setCropBoxData({ width, height: width / aspectRatio });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Math.min(parseInt(e.target.value, 10), maxImageHeight);
    setCropperHeight(height);
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setCropBoxData({ height, width: height * aspectRatio });
    }
  };

  const handleAspectRatioChange = (ratio: number) => {
    setAspectRatio(ratio);
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setAspectRatio(ratio);
    }
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleNewImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCropMove = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const cropBoxData = cropper.getCropBoxData();
      setCropperWidth(Math.round(cropBoxData.width));
      setCropperHeight(Math.round(cropBoxData.height));
    }
  };

  return (
    <>
      {selectedImage && !croppedImage && (
        <Card className="flex flex-col items-center space-y-6 p-4 border-none">
          {/* Card containing inputs */}
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <h3 className="text-lg font-semibold text-heading">Cropper Settings</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-heading">Width</label>
                  <input
                    type="number"
                    value={cropperWidth}
                    onChange={handleWidthChange}
                    max={maxImageWidth}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-heading">Height</label>
                  <input
                    type="number"
                    value={cropperHeight}
                    onChange={handleHeightChange}
                    max={maxImageHeight}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-heading">Aspect Ratio</h4>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {[
                    { label: "1:1", value: 1 },
                    { label: "4:3", value: 4 / 3 },
                    { label: "3:2", value: 3 / 2 },
                    { label: "16:9", value: 16 / 9 },
                    { label: "2:1", value: 2 },
                    { label: "21:9", value: 21 / 9 },
                  ].map((ratio) => (
                    <Button
                      key={ratio.label}
                      variant="outline"
                      onClick={() => handleAspectRatioChange(ratio.value)}
                      className={`p-2 border rounded-md text-sm ${
                        aspectRatio === ratio.value ? "bg-primary text-white" : "text-heading"
                      }`}
                    >
                      {ratio.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex space-x-4 justify-end">
                <Button onClick={handleNewImageClick}>New Image</Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button onClick={onCrop}>Crop</Button>
              </div>
            </CardContent>
          </Card>

          {/* Image Cropper */}
          <Card className="w-full max-w-4xl border-none">
            <CardContent>
              <Cropper
                ref={cropperRef}
                src={selectedImage}
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={aspectRatio}
                viewMode={2}
                guides={true}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                zoomTo={0.5}
                ready={initializeCropperDimensions} // Initialize dimensions when the cropper is ready
                cropmove={handleCropMove} // Add the cropmove event
              />
          
            </CardContent>

          </Card>
        </Card>
      )}

      {/* Cropped Image */}
      {croppedImage && <DownloadFile screenshot={croppedImage} fileName={file.name} />}
    </>
  );
};

export default ImageCropper;
