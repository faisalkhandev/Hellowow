import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/Video/AddSubtitles/Rating';
import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Add Subtitles to Video – Free Tool | NifaWow",
  description: "Easily add subtitles to your videos with NifaWow’s free tool. Enhance your content by providing accessible and accurate captions effortlessly.",
};
const FormFile = dynamic(() => import('@/components/Video/AddSubtitles/Form'), { ssr: false })



const AddSubtitles = () => {
  
  return (
    
        <div className="w-full py-16  space-y-8 padding-x">
          <div className='max-container'>

      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Add subtitles</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Add subtitles to video</p>
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

export default AddSubtitles
