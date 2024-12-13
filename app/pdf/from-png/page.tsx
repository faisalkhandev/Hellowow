import StepperPage from '@/components/PDF/StepperPdf'
import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/PDF/Merge/Rating';
import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Convert PNG File(s) to PDF Online Free - NifaWow",
  description: "Use this free tool to convert PNG to PDF files.",
};
const FormFile = dynamic(() => import('@/components/PDF/PngToPdf/Form'), { ssr: false })



const PngPage = () => {
    const stepsData = [
        {
          title: "Step 1",
          description: "Select the PNG images you want in a PDF file",
        },
        {
          title: "Step 2",
          description: "Rearrange the order of images",
        },
        {
          title: "Step 3",
          description: "Generate PDF file and download",
        }
       
      ];
      
      const heading = "How To Create a PDF File from PNG Images";
  return (
    
        <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
          <div className='max-container'>
      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    PNG to PDF</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Upload one or more images and download as a PDF</p>
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

export default PngPage
