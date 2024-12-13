"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AIImageData } from "@/constants/Image/AIImageGenerated";
import { downloadImage } from "@/actions/image/downloadImage";
import ImageCard from "./ImageCard";

interface AIImagesProps {
  imageUrl: string | null; // Ensure imageUrl can be null
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onUsePrompt: (prompt: string) => void; // Callback for reusing prompt
}

const AIImages: React.FC<AIImagesProps> = ({ imageUrl, setLoading, setImageUrl, onUsePrompt }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const shuffledImages = [...AIImageData].sort(() => Math.random() - 0.5);

  const handleGenerateMore = () => {
    setImageUrl(null);
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const res = await downloadImage(imageUrl); // Call the server action
      const blob = await res.blob();

      // Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloaded-image.jpg";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl h-full">
      {/* Image Grid Section */}
      {!imageUrl && (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 w-full h-full py-10">
          {shuffledImages.map((img, index) => (
            <ImageCard
              key={index}
              path={img.path}
              prompt={img.prompt}
              date={img.date}
              onUsePrompt={onUsePrompt}
            />
          ))}
        </section>
      )}

      {/* Render the generated image if available */}
      {imageUrl && (
        <div className="w-full flex flex-col justify-start items-center gap-3 mt-6">
          <div
            className="relative w-[500px] h-[500px] overflow-hidden rounded-xl group"
            onClick={() => setIsDialogOpen(true)}
          >
            <Image
              src={imageUrl}
              alt="Generated Image"
              fill
              className="rounded-xl object-cover h-auto"
              onLoad={() => setLoading(false)}
            />
          </div>
          <Button
            variant="ghost"
            size="lg"
            className="h-14"
            onClick={handleGenerateMore}
          >
            Generate More
          </Button>
        </div>
      )}

      {/* Dialog to display the generated image */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Generated Image</DialogTitle>
          </DialogHeader>
          {imageUrl && (
            <div className="w-full h-auto">
              <Image
                src={imageUrl}
                alt="Generated Image in Dialog"
                width={600}
                height={600}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleDownload}>Download Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIImages;
