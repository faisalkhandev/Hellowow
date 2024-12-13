"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import NextImage from "next/image";
import { resizeImageAction } from "@/actions/image/resize"; // Server action for resizing
import DownloadFile from "../DownloadFile"; // Utility to download the image
import { toast } from "sonner";
import { convertFileToBase64 } from "@/utils/image";

interface ResizeImageProps {
  file: File | null;
}

interface FormFields {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

const ResizeImage: React.FC<ResizeImageProps> = ({ file }) => {
  const [resizedImage, setResizedImage] = useState<string | null>(null); // State for resized image
  const [downloadFileName, setDownloadFileName] = useState<string | null>(null); // State for file name
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 500,
    height: 500,
  }); // State for original dimensions of the image

  const methods = useForm<FormFields>({
    defaultValues: {
      width: originalDimensions.width, // Default width
      height: originalDimensions.height, // Default height
      maintainAspectRatio: true, // Maintain aspect ratio by default
    },
  });

  const { handleSubmit, register, watch, setValue, formState: { isSubmitting } } = methods;

  const maintainAspectRatio = watch("maintainAspectRatio");
  const width = watch("width");
  const height = watch("height");

  // Get the original dimensions of the image when the file is loaded
  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setOriginalDimensions({
          width: img.width,
          height: img.height,
        });
        setValue("width", img.width);
        setValue("height", img.height);
      };
    }
  }, [file, setValue]);

  // Update height dynamically when width changes (maintain aspect ratio)
  useEffect(() => {
    if (maintainAspectRatio && width) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setValue("height", Math.round(width / aspectRatio));
    }
  }, [width, maintainAspectRatio, originalDimensions, setValue]);

  // Update width dynamically when height changes (maintain aspect ratio)
  useEffect(() => {
    if (maintainAspectRatio && height) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setValue("width", Math.round(height * aspectRatio));
    }
  }, [height, maintainAspectRatio, originalDimensions, setValue]);

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    if (!file) return;

    try {
      const width = Number(values.width);
      const height = Number(values.height);

      if (isNaN(width) || isNaN(height)) {
        throw new Error("Width and height must be numbers.");
      }

      const fileName = file.name.split(".")[0]; // Get the file name without the extension
      const base64Image = await convertFileToBase64(file);
      const resizedImageUrl = await resizeImageAction(
        base64Image,
        width,
        height,
        values.maintainAspectRatio
      );
      setResizedImage(resizedImageUrl);
      setDownloadFileName(`${fileName}-resized.png`); // Set the file name for download
    } catch (error) {
      console.error("Error resizing the image:", error);
      toast.error("Image resizing failed.");
    }
  };

  return (
    <>
      {file && !resizedImage && (
        <Card className="w-full max-w-[940px] shadow-2xl mx-auto">
          <CardContent className="py-10 flex flex-col items-center">
            <div className="relative w-[350px] h-[350px] rounded-md overflow-hidden">
              <NextImage
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CardContent>
          <CardFooter className="gap-4 border-t py-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col lg:flex-row justify-center lg:items-end gap-4 w-full"
            >
              <div className="flex gap-2">
                <div className="flex flex-col items-start">
                  <label className="block text-sm font-medium text-heading">
                    Width
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("width")}
                    className="mt-1 block w-full p-2 rounded-md shadow-sm sm:text-sm border"
                  />
                </div>

                <div className="flex flex-col items-start">
                  <label className="block text-sm font-medium text-heading">
                    Height
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("height")}
                    className="mt-1 block w-full sm:text-sm p-2 rounded-md border"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-start justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("maintainAspectRatio")}
                    className="h-5 w-5"
                  />
                  <label className="text-sm font-medium text-heading max-w-[7ch]">
                    Maintain Ratio
                  </label>
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Resizing..." : "Resize"}
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      )}

      {resizedImage && (
        <DownloadFile screenshot={resizedImage} fileName={downloadFileName} />
      )}
    </>
  );
};

export default ResizeImage;
