"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

// import { Drive } from "@/public/icons/Svgs";
import React, { useState } from 'react';
import { DialogTitle } from "@radix-ui/react-dialog";
import { CardFooter } from "../ui/card";

interface BlogDialogProps {
    generatedText: string | null;

}

export function BlogDialog({ generatedText }: BlogDialogProps) {


   

    return (
        <Dialog>
        <DialogTrigger asChild>
        <h1 className='flex-shrink-0 font-poppin text-[0.9rem] text-primary font-[600] cursor-pointer'>View Blog</h1>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] px-4 py-2">
            <DialogTitle className="font-poppin text-[1.5rem] text-heading font-[600] ">Blog Content</DialogTitle>
          <div className="h-[500px] overflow-auto text-paragraph invisible-scrollbar">
      <div className="max-w-2xl mx-auto  rounded-lg shadow-lg ">
        <div dangerouslySetInnerHTML={{ __html: generatedText! }} />
      </div>
    </div>
  <CardFooter className="flex justify-end"><Button size="lg">Copy</Button></CardFooter>
        </DialogContent>
      </Dialog>
    );
}