import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/Video/AudioToText/Rating';
import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Audio to Text Converter – Free Online Tool | NifaWow",
  description: "Easily convert audio files to text with NifaWow’s free online tool. Get accurate transcriptions quickly and efficiently.",
};
const FormFile = dynamic(() => import('@/components/Video/AudioToText/Form'), { ssr: false })



const AudioToText = () => {
  
  return (
    
        <div className="w-full py-16  space-y-8 padding-x">
          <div className='max-container'>
      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Audio to Text</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Upload an Audio and transcribe to text</p>
    </div>
    <div className=' mt-8 w-full  md:px-28'>

      <FormFile />
     </div>
    <p className="py-6 font-poppin text-[0.9rem] text-center  text-primary italic">Uploaded and generated files are deleted 1 hour after upload</p>
   
   <div className='flex justify-center items-center w-full'> 
    <Card className='border-none shadow-xl max-w-md w-full'>
      <CardContent className='flex flex-col gap-2 lg:flex-row justify-between items-center lg:px-3 py-2 md:py-4 '>
        <p className="font-poppin text-[1rem] text-paragraph font-[600]">Help Us Improve</p>
        <div className="flex items-center gap-2 pl-11">
          <Rating />
          <div className='flex text-primary border-l pl-2'>4.8 <span className="text-paragraph">(4708)</span></div>
        </div>
        <div>
        </div>
      </CardContent>
    </Card>
    </div>

  </div>
    </div>
  )
}

export default AudioToText
