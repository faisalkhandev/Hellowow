import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import React, { useState } from 'react';
import { ColorPickerComponent } from './ColorPicker';
import { images, solidColors } from '@/constants/Image/RemoveBackground';
import Image from 'next/image';

const BackgroundSelector = ({ setBackground }: { setBackground: (value: string) => void }) => {
    const [eraserSize, setEraserSize] = useState(20);
    const [selectedColor, setSelectedColor] = useState('#80A1D4');

    return (
        <Card className="p-4">
            <CardTitle className="text-lg font-semibold font-poppin text-heading">Solid Colors</CardTitle>
            <CardContent className='p-0'>
                <div className="grid grid-cols-6 gap-1 my-4">
                    {solidColors.map((color: string) => (
                        <div
                            key={color}
                            className={`w-10 h-10 rounded-lg cursor-pointer transition-transform transform hover:scale-110`}
                            style={{ backgroundColor: color }}
                            onClick={() => { setSelectedColor(color); setBackground(color) }}
                        />
                    ))}
                </div>
                <ColorPickerComponent setselectedColor={setSelectedColor} selectedColor={selectedColor} />
                <span className="mr-2">Eraser Size:</span>

                <div className="flex items-center mb-4">
                    <Slider
                        value={[eraserSize]} // Pass the value as an array
                        onValueChange={(value) => setEraserSize(value[0])} // Update state with the first value
                        min={1}
                        max={100}
                        step={1}
                    />
                    <span className="ml-2">{eraserSize}px</span>
                </div>
                <div className="flex items-center gap-3">
                    <Button >Eraser</Button>
                    <Button >Undo</Button>
                </div>
            </CardContent>
            <CardTitle className="mt-4 text-lg font-semibold font-poppin">Background</CardTitle>
            <CardContent className='p-0'>
                <div className="grid grid-cols-5 gap-2 my-4">
                    {images.map((img, index) => (
                        <div
                            onClick={() => setBackground(`url(${img.path.src})`)}
                            key={index}
                            className="w-full h-12 relative rounded-md overflow-hidden cursor-pointer hover:scale-110 hover:border-2 border-primary"
                        >
                            <Image src={img.path.src} alt="img" fill priority quality={100} />
                        </div>
                    ))}
                </div>
                <Button className='w-full max-w-[300px]'>Upload</Button>
            </CardContent>
        </Card>
    );
};

export default BackgroundSelector;