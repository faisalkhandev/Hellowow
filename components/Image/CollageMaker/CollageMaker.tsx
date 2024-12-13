"use client"

import React, { useState } from 'react'
import Toolbar from './Toolbar'
import { Card } from '@/components/ui/card'
import PhotoLayoutGrid from './PhotoLayoutGrid'


const CollageMakerClient = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [borderWidth, setBorderWidth] = useState<number>(2); 
  const [borderColor, setBorderColor] = useState<string>("#d8d8d8"); 


  return (
    <Card className='w-full max-w-[1000px] mx-auto border-none p-4 lg:p-8 shadow-2xl'>
      <Toolbar setSelectedTemplate={setSelectedTemplate} setBorderWidth={setBorderWidth} setBorderColor={setBorderColor}/>
      <PhotoLayoutGrid selectedTemplate={selectedTemplate} borderWidth={borderWidth} borderColor={borderColor} />
    </Card>
  )
}

export default CollageMakerClient
