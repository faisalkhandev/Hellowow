"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectDropdown } from "@/components/common/SelectDropdown";
import { useForm, SubmitHandler } from "react-hook-form";
import { compressImageAction } from "@/actions/image/imageCompression"; // Server action using Sharp
import DownloadFile from "../DownloadFile"; // Utility to download the compressed image
import { Slider } from "@/components/ui/slider"; // ShadCN Slider
import Image from "next/image";
import { toast } from "sonner";
import { decode, decodeFrames, encode } from "modern-gif"; // For GIF compression
import { convertFileToBase64 } from "@/utils/image";

interface CompressedImageProps {
  file: File | null;
}

interface FormFields {
  quality: number;
  lossless: boolean;
  format: string;
}

const CompressedImage: React.FC<CompressedImageProps> = ({ file }) => {
  const [compressedImage, setCompressedImage] = useState<string | null >(null);
  const [defaultFormat, setDefaultFormat] = useState<string>("jpeg"); // Default format based on file extension
  const [downloadFileName, setDownloadFileName] = useState<string | null>(null); // File name for download
  const [isGif, setIsGif] = useState<boolean>(false); // Check if file is a GIF
  const [isAnimatedGif, setIsAnimatedGif] = useState<boolean>(false); // Check if GIF is animated
  const methods = useForm<FormFields>({
    defaultValues: {
      quality: 80, // Default quality
      lossless: false,
      format: "jpeg", // Default format
    },
  });

  const { handleSubmit, control, watch, setValue, formState: { isSubmitting } } = methods;

  const formatOptions = [
    { label: "Original", value: "original" },
    { label: ".JPG", value: "jpeg" },
    { label: ".WEBP", value: "webp" },
    { label: ".AVIF", value: "avif" },
    { label: ".PNG", value: "png" },
  ];

  // Set default format based on the uploaded file
  useEffect(() => {
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      setIsGif(fileExtension === "gif"); // Check if the file is a GIF
      if (["jpeg", "jpg", "png", "webp", "avif"].includes(fileExtension || "")) {
        setDefaultFormat(fileExtension || "jpeg");
        setValue("format", fileExtension || "jpeg"); // Update dropdown to reflect the file's format
      } else if (fileExtension === "gif") {
        setDefaultFormat("gif"); // Handle GIFs
        setValue("format", "original"); // Default to original for GIFs
        checkIfAnimatedGif(file); // Check if GIF is animated
      }
    }
  }, [file, setValue]);

  // Check if a GIF is animated
  const checkIfAnimatedGif = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const gifData = decode(buffer);
    setIsAnimatedGif(gifData.frames.length > 1); // Check if more than one frame
  };

  // Handle animated GIF compression on the client
  const compressGifOnClient = async (file: File, quality: number): Promise<string | null> => {
    try {
      // Read the GIF file as an ArrayBuffer
      const buffer = await file.arrayBuffer();
  
      // Decode the GIF into frames using modern-gif
      const gifData = decode(buffer);
      const frames = await decodeFrames(buffer);
  
      // Calculate maxColors based on the quality percentage
      const maxColors = Math.max(2, Math.min(255, Math.ceil((quality / 100) * 255)));
  
      // Re-encode the GIF with reduced colors
      const output = await encode({
        width: gifData.width,
        height: gifData.height,
        frames,
        workerUrl: undefined, // Worker URL is optional
        maxColors, // Apply lossy compression
      });
  console.log(output);
  
      // Create a Blob URL for the compressed GIF
      const blob = new Blob([output], { type: "image/gif" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error compressing animated GIF:", error);
      toast.error("Animated GIF compression failed.");
      return null;
    }
  };
  

  // Handle form submission
  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    if (!file) return;

    try {
      let compressedUrl: string | null = null;
      const fileName = file.name.split(".")[0]; // Get the file name without the extension
      const format = values.format === "original" ? defaultFormat : values.format;

      if (isGif && isAnimatedGif) {
        // Handle animated GIFs on the client
        compressedUrl = await compressGifOnClient(file, values.quality);
      } else {
        // Handle static images and static GIFs on the server
        const base64Image = await convertFileToBase64(file);
        compressedUrl = await compressImageAction(base64Image, values.quality, values.lossless, format);
      }

      setCompressedImage(compressedUrl);
      setDownloadFileName(`${fileName}.${format}`); // Set the file name with the correct format
    } catch (error) {
      console.error("Error compressing the image:", error);
      toast.error("Compression failed.");
    }
  };

  const isLossless = watch("lossless");

  return (
    <>
      {file && !compressedImage && (
        <Card className="w-full max-w-[940px] shadow-2xl border-none mx-auto">
          <CardContent className="py-10 flex justify-center items-center min-h-[450px]">
            <div className="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
                width={0} // Dynamically adjust based on the image
                height={0} // Dynamically adjust based on the image
                style={{ width: "100%", height: "auto" }} // Responsive adjustment
              />
            </div>
          </CardContent>
          <CardFooter className="min-h-[150px] border-t py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col lg:flex-row gap-4 w-full justify-center items-start"
            >
              <div className="flex-1 space-y-2">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    Quality: {watch("quality")}% ({isAnimatedGif ? "Animated GIF" : "Static Image"})
                  </label>
                  <Slider
                    value={[watch("quality")]}
                    onValueChange={(value) => methods.setValue("quality", value[0])}
                    min={10}
                    max={100}
                    step={1}
                    className="w-full max-w-[300px]"
                    disabled={isLossless || isAnimatedGif} // Disable slider for animated GIFs
                  />
                </div>
                <div className="flex items-end gap-2">
                  <input
                    type="checkbox"
                    id="lossless"
                    {...methods.register("lossless")}
                    className="h-5 w-8"
                    disabled={isAnimatedGif} // Disable lossless for animated GIFs
                  />
                  <label htmlFor="lossless" className="text-[0.85rem] font-medium">
                    Max Lossless
                  </label>
                </div>
              </div>

              <div className="flex items-end gap-3 flex-1">
                <div className="w-full max-w-[300px]">
                  <SelectDropdown
                    name="format"
                    options={formatOptions}
                    control={control}
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Compressing..." : "Compress Image"}
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      )}

      {compressedImage && <DownloadFile screenshot={compressedImage} fileName={downloadFileName} />}
    </>
  );
};

export default CompressedImage;
