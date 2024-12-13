"use client";

import { SetStateAction, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'; // Import ShadCN Dialog components
import { Button } from '@/components/ui/button'; // Import ShadCN Button component

const PhotoLayoutDialog = ({setSelectedTemplate}:{setSelectedTemplate:(template: number) =>void}) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [selectedTemplate, setselectedTemplate] = useState(1);

  const aspectRatios = ['1:1', '3:2', '3:4', '4:3', '16:9'];
  const templates = [1, 2, 3, 4, 5]; // Represents different template layouts

const handleTemplate=(template: number)=>{
  setselectedTemplate(template);
  setSelectedTemplate(template)
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className='border' size="lg">Template</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg p-4">
        <h2 className="text-lg font-bold font-poppin">Photo Layout</h2>
        <p className="text-[0.94rem]  font-poppin">Choose a grid and aspect ratio for your collage</p>

        {/* Aspect Ratio Buttons */}
        <div className="flex gap-2 mb-4">
          {aspectRatios.map((ratio) => (
            <Button
              key={ratio}
              variant={selectedAspectRatio === ratio ? 'default' : 'outline'}
              onClick={() => setSelectedAspectRatio(ratio)}
              className="px-3 py-1"
            >
              {ratio}
            </Button>
          ))}
        </div>

        {/* Template Layouts */}
        <div className="grid grid-cols-5 gap-2 h-[100px]"> 
          {templates.map((template) => (
            <div
              key={template}
              onClick={() => {handleTemplate(template)}}
              className={`p-2 border rounded cursor-pointer ${
                selectedTemplate === template ? 'border-primary' : 'border-gray-300'
              }`}
            >
           
              {template === 1 && (
                <div className="grid grid-cols-2 gap-1 h-full" >
                  <div className="bg-gray-200"></div>
                  <div className="bg-gray-200"></div>
                  <div className="bg-gray-200"></div>
                  <div className="bg-gray-200"></div>
                </div>
              )}
              {template === 2 && (
                <div className="grid grid-rows-2 gap-1 h-full" >
                  <div className="bg-gray-200" ></div> 
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200" ></div>
                    <div className="bg-gray-200" ></div>
                  </div>
                </div>
              )}
              {template === 3 && (
                <div className="grid grid-cols-2 gap-1 h-full" >
                  <div className="bg-gray-200 col-span-2" ></div>
                  <div className="bg-gray-200"></div>
                  <div className="bg-gray-200" ></div>
                </div>
              )}
              {template === 4 && (
                <div className="grid grid-cols-2 gap-1 h-full" >
                  <div className="bg-gray-200" ></div>
                  <div className="bg-gray-200 row-span-2"></div>
                  <div className="bg-gray-200" ></div>
                </div>
              )}
              {template === 5 && (
                <div className="grid grid-rows-2 gap-1 h-full">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200" ></div>
                    <div className="bg-gray-200" ></div>
                  </div>
                  <div className="bg-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoLayoutDialog;