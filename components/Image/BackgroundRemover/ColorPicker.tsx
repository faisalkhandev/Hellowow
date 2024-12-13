"use client";
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; // Adjust the import based on your project structure
import { Button } from '@/components/ui/button';
import { SketchPicker } from 'react-color'; // Import the SketchPicker from react-color

export function ColorPickerComponent({ setselectedColor, selectedColor: initialColor }: { setselectedColor: (color: string) => void, selectedColor: string }) {
    const [isOpen, setIsOpen] = useState(false); 
    const [color, setColor] = useState(initialColor || '#d8d8d8'); 
    const [colorSelected, setColorSelected] = useState(color); 


    // Update color state when initialColor prop changes
    useEffect(() => {
        setColor(initialColor);
    }, [initialColor]);

    const closeDialog = () => setIsOpen(false);

    const handleOnClick = () => {
        setselectedColor(colorSelected); // Set the selected color
        closeDialog(); // Close the dialog after setting the color
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div className='border items-center px-3 rounded-md flex gap-2 cursor-pointer h-11'>
                    <DialogTrigger asChild>
                        <div className='p-4 rounded-lg' style={{ backgroundColor: color || '#F0F0F0' }}></div>
                    </DialogTrigger>
                    <input 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)} 
                        className='border-none ml-3 focus:outline-none' 
                    />
                </div>
                
                <DialogContent className='p-4 max-w-[400px]'>
                    <DialogTitle>Select a Color</DialogTitle>
                    <div className="grid place-content-center">
                        <SketchPicker 
                            color={color} 
                            onChangeComplete={(color) => setColor(color.hex)} 
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={handleOnClick} className="btn">Ok</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}