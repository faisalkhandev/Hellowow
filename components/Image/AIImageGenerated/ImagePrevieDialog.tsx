"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageCardProps {
  path: {
    src: string;
  };
  prompt: string;
  date: string;
  onUsePrompt: (prompt: string) => void; // Callback for reusing prompt
}

const ImageDetailsDialog: React.FC<ImageCardProps> = ({ path, prompt, date, onUsePrompt }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog open state

  // Handle "Use Prompt" action and close dialog
  const handleUsePrompt = () => {
    onUsePrompt(prompt);
    setIsDialogOpen(false); // Close dialog
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = path.src; // The image URL
    link.download = "image.jpg"; // Specify the file name
    link.click();
    setIsDialogOpen(false); // Close dialog
  };
  
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="w-full bg-white text-black hover:bg-white hover:text-black font-poppin transform transition-all duration-300 ease-in-out hover:sm:scale-110"
          >
            More Info
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-4">
            {/* Left: Image */}
            <div className="w-full h-[400px] relative">
              <Image
                src={path.src}
                alt="Generated Art"
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {/* Right: Details */}
            <div className="w-full flex flex-col justify-between">
              <DialogDescription>
                <p className="text-lg">
                  <strong>Prompt:</strong> {prompt}
                </p>
                <p className="mt-4 text-lg">
                  <strong>Created:</strong> {date}
                </p>
              </DialogDescription>
              <div className="flex pt-6 justify-end gap-4">
                {/* Download Button */}
                <Button variant="outline" size="lg" onClick={handleDownload}>
                  Download
                </Button>

                {/* Use Prompt Button */}
                <Button size="lg" onClick={handleUsePrompt}>
                  Use Prompt
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageDetailsDialog;
