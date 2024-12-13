"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import ImageDetailsDialog from "./ImagePrevieDialog";

interface ImageCardProps {
  path: {
    src: string;
  };
  prompt: string;
  date: string;
  onUsePrompt: (prompt: string) => void; // Callback for reusing prompt

}

const ImageCard: React.FC<ImageCardProps> = ({ path, prompt, date ,onUsePrompt}) => {
  return (
    <div className="relative w-full h-full aspect-square overflow-hidden rounded-xl group">
      {/* Image */}
      <Image
        src={path.src}
        alt={prompt}
        fill
        className="rounded-xl object-cover"
      />

      {/* Hover Overlay */}
      <div className="w-full absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2 sm:p-4">
        {/* Text (Prompt) */}
        <p className="text-white text-sm font-semibold  font-poppin">{prompt}</p>

        {/* Button */}
        <div className="self-end">
        <ImageDetailsDialog path={path} prompt={prompt} date={date} onUsePrompt={onUsePrompt} />

            </div>

      </div>
    </div>
  );
};

export default ImageCard;
