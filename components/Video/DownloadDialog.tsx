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
import React, { useState, useEffect } from 'react';

interface DownLoadDialogProps {
    generatedText?: string | null;
    fileUrl?: string | null; // New prop for the file URL
    fileName?: string | null; // Define the prop type
}

export function DownLoadDialog({ generatedText, fileUrl, fileName }: DownLoadDialogProps) {
    const [open, setOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(generatedText === null && !fileUrl);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        setIsDisabled(generatedText === null && !fileUrl);
    }, [generatedText, fileUrl]);

    const handleDownload = () => {
        if (generatedText) {
            // Create a temporary element to convert HTML to plain text
            const tempElement = document.createElement('div');
            tempElement.innerHTML = generatedText; // Set the HTML content
            const plainText = tempElement.innerText; // Extract plain text

            const blob = new Blob([plainText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName || 'download'}.txt`; // Use provided fileName or default to 'download.txt'
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else if (fileUrl) {
            // If generatedText is not available, download the file from the provided URL
            const a = document.createElement('a');
            a.href = fileUrl; // Use the provided file URL
            a.download = fileName || 'download'; // Use provided fileName or default to 'download'
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            console.error("No content to download.");
        }
    };

    if (isDesktop) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg" className="w-full" disabled={isDisabled}>
                        Download <span className="ml-2"><ChevronDown size={16} /></span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[256px]">
                    <div className="flex flex-col space-y-2">
                        <div className="flex gap-2 items-center border-b pb-1 cursor-pointer" onClick={isDisabled ? undefined : handleDownload}>
                            <div className="p-3 bg-[#F5FBFA] rounded-full">
                                <MonitorSpeaker size={18} color="#1A8FE3" />
                            </div>
                            <p className={`text-[0.9rem] font-poppin font-[400] text-paragraph ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                Save to device
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button size="lg" className="w-full" disabled={isDisabled}>
                    Download <span className="ml-2"><ChevronDown size={16} /></span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="flex flex-col space-y-2">
                    <div className="flex gap-2 items-center border-b pb-1 cursor-pointer" onClick={isDisabled ? undefined : handleDownload}>
                        <div className="p-3 bg-[#F5FBFA] rounded-full">
                            <MonitorSpeaker size={18} color="#1A8FE3" />
                        </div>
                        <p className={`text-[0.9rem] font-poppin font-[400] text-paragraph ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Save to device
                        </p>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}