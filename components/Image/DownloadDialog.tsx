"use client";

import { ChevronDown, MonitorSpeaker } from "lucide-react";
import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Drive } from "@/public/icons/Svgs";
import React, { useState } from "react";

interface DownLoadDialogProps {
  onDownload: () => void; // Define the onDownload prop
}

export function DownLoadDialog({ onDownload }: DownLoadDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleDownloadClick = () => {
    onDownload(); // Trigger the download when "Save to device" is clicked
    setOpen(false); // Close dialog/drawer after download
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full max-w-[256px]">
            Download <span className="ml-2"><ChevronDown size={16} /></span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[256px]">
          <div className="flex flex-col space-y-2">
            <div
              className="flex gap-2 items-center border-b pb-1 cursor-pointer"
              onClick={handleDownloadClick} // Attach the download handler here
            >
              <div className="p-3 bg-[#F5FBFA] rounded-full">
                <MonitorSpeaker size={18} color="#1A8FE3" />
              </div>
              <p className="text-[0.9rem] font-poppin font-[400] text-paragraph">Save to device</p>
            </div>
            {/* <div className="flex gap-2 items-center cursor-pointer">
              <div className="p-3 bg-[#F5FBFA] rounded-full">
                <Drive />
              </div>
              <p className="text-[0.9rem] font-poppin font-[400] text-paragraph">Save to cloud</p>
            </div> */}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" className="w-full">
          Download <span className="ml-2"><ChevronDown size={16} /></span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col space-y-2">
          <div
            className="flex gap-2 items-center border-b pb-1 cursor-pointer"
            onClick={handleDownloadClick} // Attach the download handler here
          >
            <div className="p-3 bg-[#F5FBFA] rounded-full">
              <MonitorSpeaker size={18} color="#1A8FE3" />
            </div>
            <p className="text-[0.9rem] font-poppin font-[400] text-paragraph">Save to device</p>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <div className="p-3 bg-[#F5FBFA] rounded-full">
              <Drive />
            </div>
            <p className="text-[0.9rem] font-poppin font-[400] text-paragraph">Save to cloud</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
