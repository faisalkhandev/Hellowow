import StepperPage from '@/components/common/Stepper'
import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/Video/ToGif/Rating';
import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Convert MP4 to Animated GIF – Free Online Tool | NifaWow",
  description: "Easily convert MP4 videos to animated GIFs with NifaWow’s free tool. Create high-quality GIFs from video files in just a few clicks.",
};
const FormFile = dynamic(() => import('@/components/Video/ToGif/Form'), { ssr: false })



const ToGif = () => {
    const stepsData = [
        {
          title: "Step 1",
          description: "Select an MP4 to convert to animated gif",
        },
        {
          title: "Step 2",
          description: "Upload the video and let our servers begin the conversion",
        },
        {
          title: "Step 3",
          description: "Download the animated GIF",
        }
       
      ];
      
      const heading = "How To Convert a Video to Animated GIF";
  return (
    
        <div className="w-full py-16  space-y-8 padding-x">
          <div className='max-container'>

      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Convert MP4 to Animated GIF</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Upload an MP4 and convert to animated GIF</p>
    </div>
    <div className=' mt-8 w-full  md:px-28'>

      <FormFile />
     </div>
    <p className="py-6 font-poppin text-[0.9rem] text-center  text-primary italic">Uploaded and generated files are deleted 1 hour after upload</p>
   
   <div className='flex justify-center items-center w-full'> 
    <Card className='border-none shadow-xl max-w-md '>
      <CardContent className='flex flex-col gap-2 lg:flex-row justify-between items-center lg:px-3 py-2 lg:py-4 '>
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

    <div className='pt-11'>
      <StepperPage heading={heading} stepsData={stepsData} />;
      </div>
    </div>
    </div>
  )
}

export default ToGif
