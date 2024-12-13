"use client";
import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; // Adjust the import based on your project structure
import { Button } from '@/components/ui/button';

export function ColorPickerComponent( {setBorderColor}:{setBorderColor:(color: string) => void}) {
  const [color, setColor] = useColor('#d8d8d8');
  const [isOpen, setIsOpen] = useState(false); // State to manage dialog visibility
  const [selectedColor, setSelectedColor] = useState(color.hex); // State to store the selected color

  const closeDialog = () => setIsOpen(false);

  const handleOnClick = () => {
    // Set the selected color state
    setSelectedColor(color.hex);
    setBorderColor(color.hex)
    closeDialog(); // Close the dialog after setting the color
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className='border items-center px-3 rounded-md flex gap-2 cursor-pointer h-11'>
            <div className='p-4 rounded-lg' style={{ backgroundColor: selectedColor }}></div>
            <p className='font-poppin text-heading'>{selectedColor}</p>
          </div>
        </DialogTrigger>
        
        <DialogContent className='p-4'>
          <DialogTitle>Select a Color</DialogTitle>
          <ColorPicker color={color} onChange={setColor} />
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleOnClick} className="btn">Ok</Button>
            <Button onClick={closeDialog} className="btn">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}