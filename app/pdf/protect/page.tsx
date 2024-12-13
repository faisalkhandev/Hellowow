import StepperPage from '@/components/PDF/StepperPdf'
import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/PDF/Protect/Rating';
import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Password Protect a PDF Online Free - NifaWow",
  description: "Use our free online tool to easily password-protect your PDF files.",
};
const FormFile = dynamic(() => import('@/components/PDF/Protect/Form'), { ssr: false })



const MergePage = () => {
    const stepsData = [
        {
          title: "Step 1",
          description: "Select a PDF file to add password encryption to",
        },
        {
          title: "Step 2",
          description: "Upload your PDF file from a PC or smart phone",
        },
        {
          title: "Step 3",
          description: "Download the password protected PDF",
        },
      
      ];
      
      const heading = "How To Add a Password to a PDF File";
  return (
    
        <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
          <div className='max-container'>
      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Password Protect a PDF File</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Add a password to a PDF file</p>
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

export default MergePage
