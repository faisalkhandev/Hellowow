"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectDropdown } from "@/components/common/SelectDropdown";
import { useForm, SubmitHandler } from "react-hook-form";
import NextImage from "next/image";
import { upscaleImageAction } from "@/actions/image/imageconversion"; // Server action
import DownloadFile from "../DownloadFile"; // Utility to download the image
import { convertFileToBase64 } from "@/utils/image";


interface UpscaledImageProps {
  file: File | null;
}


interface FormFields {
  scale_factor: string; 
}

const UpscaledImage: React.FC<UpscaledImageProps> = ({ file }) => {
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null); // State for the upscaled image
  const methods = useForm<FormFields>({
    defaultValues: {
      scale_factor: "2", // Default to 2x scaling
    },
  });

  const { handleSubmit, control, formState: { isSubmitting } } = methods;

  // Options for the scale factor dropdown
  const scaleFactorOptions = [
    { label: "Increase 2x", value: "2" },
    { label: "Increase 4x", value: "4" },
  ];

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    if (!file) return;
  
    try {
      const base64Image = await convertFileToBase64(file);
      const upscaledImageUrl = await upscaleImageAction(base64Image, parseInt(values.scale_factor));
      setUpscaledImage(upscaledImageUrl);
    } catch (error) {
      console.error("Error upscaling the image:", error);
    }
  };
  
  
  
  return (
    <>
      {file && !upscaledImage && (
        <Card className="w-full max-w-[940px] shadow-2xl border-none mx-auto">
          <CardContent className="py-10 flex justify-center items-center">
            <div className="relative w-[350px] aspect-square">
              <NextImage
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
               fill
               objectFit="cover"
              />
            </div>
          </CardContent>
          <CardFooter className="h-[150px] border-t">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 w-full justify-center items-end">
              <div className="relative w-[300px]">
                <SelectDropdown
                  name="scale_factor"
                  options={scaleFactorOptions}
                  control={control}
                />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Upscaling..." : "Upscale Image"}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {upscaledImage && (
       
          <DownloadFile screenshot={upscaledImage} />
       
      )}
    </>
  );
};

export default UpscaledImage;
