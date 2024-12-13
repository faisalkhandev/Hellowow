"use client";

import React, { useRef, useState, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import shadcn card components
import { Button } from "@/components/ui/button";
import DownloadFile from "../DownloadFile";

const ImageCropper: React.FC = ({file}:{file:File}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // Cropper settings
  const [cropperWidth, setCropperWidth] = useState<number>(1136);
  const [cropperHeight, setCropperHeight] = useState<number>(600);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.on("cropmove", () => {
        const cropBoxData = cropper.getCropBoxData();
        setCropperWidth(Math.round(cropBoxData.width));
        setCropperHeight(Math.round(cropBoxData.height));
      });
    }
    return () => {
      if (cropper) cropper.off("cropmove");
    };
  }, []);

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
    const width = parseInt(e.target.value, 10);
    setCropperWidth(width);
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setCropBoxData({ width, height: width / aspectRatio });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value, 10);
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
    // Trigger the file input click when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-gray-100">
      {/* Card containing inputs */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800">Cropper Settings</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Width</label>
              <input
                type="number"
                value={cropperWidth}
                onChange={handleWidthChange}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Height</label>
              <input
                type="number"
                value={cropperHeight}
                onChange={handleHeightChange}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-600">Aspect Ratio</h4>
            {/* Aspect Ratio Grid */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { label: "1:1", value: 1 },
                { label: "4:3", value: 4 / 3 },
                { label: "3:2", value: 3 / 2 },
                { label: "16:9", value: 16 / 9 },
                { label: "2:1", value: 2 },
                { label: "21:9", value: 21 / 9 },
              ].map((ratio) => (
                <button
                  key={ratio.label}
                  onClick={() => handleAspectRatioChange(ratio.value)}
                  className={`p-2 border rounded-md text-sm ${
                    aspectRatio === ratio.value ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            {/* New Image Button */}
            <Button
              onClick={handleNewImageClick}
            >
              New Image
            </Button>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" // Hide the input
            />
            <Button
            size="lg"
              onClick={onCrop}
            >
              Crop
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Cropper */}
      {selectedImage && (
        <Card className="w-full max-w-4xl">
          <CardContent>
            <Cropper
              ref={cropperRef}
              src={selectedImage || URL.createObjectURL(file)}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={aspectRatio}
              viewMode={1}
              guides={true}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              zoomTo={0.5}
            />
          </CardContent>
        </Card>
      )}

      {/* Cropped Image */}
      {croppedImage && (
        <DownloadFile screenshot={croppedImage} fileName={file.name}/>
      )}
    </div>
  );
};

export default ImageCropper;
