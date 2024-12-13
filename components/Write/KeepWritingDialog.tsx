"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogDemoProps {
  onSubmit: (location: string, sentence: string) => void;
  isDisabled:boolean
}

export function DialogDemo({ onSubmit,isDisabled }: DialogDemoProps) {
  const [isOpen, setIsOpen] = useState(false); // Add state to control dialog open/close
  const [selectedLocationButton, setLocationButton] = useState("cursorLocation");
  const [selectSentencesButton, setSentencesButton] = useState("A Sentence");
  
  const handleButtonClick = (buttonId: string) => {
    setLocationButton(buttonId);
  };

  const handleSentenceButtonClick = (buttonId: string) => {
    setSentencesButton(buttonId);
  };

  const handleSubmit = () => {
    onSubmit(selectedLocationButton, selectSentencesButton);
    setIsOpen(false); // Close dialog after submitting
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="ql-button hidden" onClick={() => setIsOpen(true)} style={{ width: "auto" }} disabled={isDisabled}>Keep Writing</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] px-4">
        <DialogHeader>
          <DialogTitle className="font-poppin text-[1.5rem] text-heading font-[600] ">Continue Writing</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col py-2">
          <h1 className="font-poppin text-[1.15rem] text-heading font-[500]">Text Location</h1>
          <div className="flex flex-row py-4 gap-2">
            <Button variant={selectedLocationButton === 'cursorLocation' ? 'ghost' : 'link'} onClick={() => handleButtonClick('cursorLocation')} className="w-full max-w-[240px] h-14 font-[400] font-poppin text-[1rem] px-4">Current Cursor Location</Button>
            <Button variant={selectedLocationButton === 'endOfCopy1' ? 'ghost' : 'link'} onClick={() => handleButtonClick('endOfCopy1')} className="w-full max-w-[240px] h-14 font-[400] font-poppin text-[1rem] px-4">End of Copy</Button>
          </div>

          <h1 className="font-poppin text-[1.15rem] text-heading font-[500]">Text Sentences</h1>
          <div className="flex flex-row gap-2 py-4">
            <Button variant={selectSentencesButton === 'A Sentence' ? 'ghost' : 'link'} onClick={() => handleSentenceButtonClick('A Sentence')} className="w-full max-w-[240px] h-14 font-[400] font-poppin text-[1rem] px-4">A Sentence</Button>
            <Button variant={selectSentencesButton === 'A Few Sentences' ? 'ghost' : 'link'} onClick={() => handleSentenceButtonClick('A Few Sentences')} className="w-full max-w-[240px] h-14 font-[400] font-poppin text-[1rem] px-4">A Few Sentences</Button>
            <Button variant={selectSentencesButton === 'A Paragraph' ? 'ghost' : 'link'} onClick={() => handleSentenceButtonClick('A Paragraph')} className="w-full max-w-[240px] h-14 font-[400] font-poppin text-[1rem] px-4">A Paragraph</Button>
          </div>
        </div>

        <DialogFooter>
        <Button onClick={()=>setIsOpen(false)} variant="outline" className="w-full h-14 text-[1rem] font-poppin">Cancel</Button>
          <Button onClick={handleSubmit} className="w-full h-14 text-[1rem] font-poppin">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

