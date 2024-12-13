import StepperPage from '@/components/PDF/StepperPdf'
import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/PDF/Merge/Rating';
import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Split &amp; Extract PDF Pages Online Free - NifaWow",
  description: "Use this free tool to Split & Extract PDF Pages.",
};
const FormFile = dynamic(() => import('@/components/PDF/Split/Form'), { ssr: false })



const Split = () => {
    const stepsData = [
        {
          title: "Step 1",
          description: "Select a file to upload from your pc, phone, Google Drive, or Dropbox",
        },
        {
          title: "Step 2",
          description: "Select submit and our servers will go to work splitting your PDF file",
        },
        {
          title: "Step 3",
          description: "Download the selected pages as a single or multiple PDFs",
        },
       
      ];
      
      const heading = "How To Split a PDF File";
  return (
    
        <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
          <div className='max-container'>
      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Split PDF File
</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Split into one or multiple PDF files</p>
    </div>
    <div className=' mt-8 w-full  md:px-28'>

      <FormFile />
     </div>
    <p className="py-6 font-poppin text-[0.9rem] text-center  text-primary italic">Uploaded and generated files are deleted 1 hour after upload</p>
    <Card className='border-none shadow-xl max-w-md w-full m-auto '>
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
    <div className='pt-11'>
      <StepperPage heading={heading} stepsData={stepsData} />;
      </div>
    </div>
    </div>
  )
}

export default Split
