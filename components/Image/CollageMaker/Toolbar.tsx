"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from "@/components/ui/slider";
import React from 'react';
import { ColorPickerComponent } from './ColorPicker';
import PhotoLayoutDialog from './PhotoLayoutDialog';

interface ToolbarProps {
  setSelectedTemplate: (template: number) => void;
  setBorderWidth: (width: number) => void; // Correctly define the type for setBorderWidth
  setBorderColor: (color: string) => void; // Correctly define the type for setBorderWidth

}

const Toolbar: React.FC<ToolbarProps> = ({ setSelectedTemplate, setBorderWidth,setBorderColor}) => {
  const handleSliderChange = (value: number[]) => {
    console.log(value);
    
    setBorderWidth(value[0]); // Update border width based on slider value
  };

  return (
    <Card className='border-none shadow-2xl flex flex-col gap-4 p-3 lg:p-4 md:flex-row'>
      <div className='flex flex-col lg:flex-row gap-6 lg:items-center w-full'>
        {/* <Button className='max-w-[150px]' size="lg">Add Photos</Button> */}
        <div className='relative flex flex-col h-11 gap-4 lg:items-center lg:flex-row flex-1 before:content-[""] before:w-[1.5px] before:h-7 before:bg-[#E3E3E4] before:absolute before:top-2 before:-left-2 before:mr-2 before:hidden md:before:hidden'>
          <p className='text-heading font-poppin font-[500] text-nowrap'>Border Width</p>
          <div className='flex h-full gap-4'>
            <div className='border w-[200px] p-4 rounded-md'>
              <Slider defaultValue={[1]} max={20} step={1} onValueChange={handleSliderChange} />
            </div>
            <ColorPickerComponent setBorderColor={setBorderColor} />
          </div>
        </div>
      </div>
      <PhotoLayoutDialog setSelectedTemplate={setSelectedTemplate} />
    </Card>
  );
};

export default Toolbar;