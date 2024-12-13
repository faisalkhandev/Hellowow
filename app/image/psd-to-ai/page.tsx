import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/PDF/EditPdf/Rating';
import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Convert PSD to AI - NifaWow",
    description: "Use NifaWow's free Image editing tools to easily edit, annotate, and modify your Images. No sign-up required, fast and secure!",
};
const FormFile = dynamic(() => import('@/components/PDF/EditPdf/Form'), { ssr: false })


const PsdToAi = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center py-16 space-y-8 padding-x">
            <div className='text-center'>
                <h1 className="text-[1.6rem] sm:text-[40px] font-bold font-poppin text-heading dark:text-white">Convert PSD to AI</h1>
                <p className='text-paragraph font-poppin text-[1rem]'>Convert PSD to AI with our free online tool</p>
            </div>
            <div className='mt-8 w-full md:px-28'>
                <FormFile />
            </div>
            <p className="py-6 font-poppin text-[0.9rem] text-center text-primary italic">Uploaded and generated files are deleted 1 hour after upload</p>
            <Card className='border-none shadow-xl '>
                <CardContent className='flex flex-col gap-2 lg:flex-row justify-between items-center lg:px-3 py-6 lg:py-4 '>
                    <p className="font-poppin text-[1rem] text-paragraph font-[600]">Help Us Improve</p>
                    <div className="flex items-center gap-2 pl-11">
                        <Rating />
                        <div className='flex text-primary border-l pl-2'>4.8 <span className="text-paragraph">(4708)</span></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PsdToAi
