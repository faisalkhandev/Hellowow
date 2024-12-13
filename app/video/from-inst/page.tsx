import { Card, CardContent } from '@/components/ui/card'
import Rating from '@/components/Write/SummarizeYoutube/Rating'
import Form from '@/components/Video/FromInsta/Form'
import React from 'react'
import QrCode from '@/components/Video/QrCode'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Free Instagram Video Downloader - NifaWow ",
  description: "Download Instagram videos instantly with NifaWow’s free and easy-to-use tool. Save your favorite videos in high quality without any hassle.",
};



const page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">

      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Instagram Video Downloader</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Enter an Instagram video URL & download

</p>
    </div>
    <div className='w-full flex justify-center items-center py-8 '>

      <Form />
     </div>
    <QrCode />

    <p className="py-6 font-poppin text-[0.9rem] text-center  text-primary italic">Uploaded and generated files are deleted 1 hour after upload</p>
    <Card className='border-none shadow-xl '>
      <CardContent className='flex flex-col gap-2 lg:flex-row justify-between items-center lg:px-3 py-6 lg:py-4 '>
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

  )
}

export default page