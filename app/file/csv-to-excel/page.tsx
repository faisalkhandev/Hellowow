import StepperPage from '@/components/PDF/StepperPdf'
import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/PDF/Merge/Rating';
import Editor from "@/components/File/CsvToExcel/Editor"
import React from 'react'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Convert a CSV to Excel Online Free - NifaWow",
  description: "Use our free online tool to easily convert CSV files to Excel format."}



const CsvToExcel = () => {
    const stepsData = [
        {
          title: "Step 1",
          description: "Select a CSV and convert to XLS Excel",
        },
        {
          title: "Step 2",
          description: "Upload the CSV file to our server",
        },
        {
          title: "Step 3",
          description: "Download the converted excel file",
        }
      ];
      
      const heading = "How to Convert a CSV to Excel";
  return (
    
        <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
          <div className="max-container">

      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    CSV to Excel</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Convert CSV to Excel</p>
    </div>
    <div className=' mt-8 w-full  md:px-28'>

    <Editor/>
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
    <div className='pt-11 '>
      <StepperPage heading={heading} stepsData={stepsData} />;
      </div>
    </div>
    </div>

  )
}

export default CsvToExcel
