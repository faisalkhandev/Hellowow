
import { Card, CardContent } from '@/components/ui/card'
import Rating from '@/components/Write/SummarizePdf/Rating'
import QrCode  from '../../../components/Write/QrCode'
import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Form = dynamic(() => import('@/components/PDF/Translate/Form'), { ssr: false })

export const metadata: Metadata = {
  title: "PDF Translator - Translate to English, Spanish, and More - NifaWow",
  description: "Upload your PDF, and we’ll translate it into English, Spanish, and many other languages.",
};


const page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
      <div className='max-container'>
      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    PDF Translator</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Upload your PDF and we&apos;ll translate it

</p>
    </div>
    <div className=' mt-8 w-full  md:px-28'>

      <Form />
     </div>
     <div className=' mt-8 w-full  md:px-28'>

     <QrCode />

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
  
  </div>
  </div>

  )
}

export default page