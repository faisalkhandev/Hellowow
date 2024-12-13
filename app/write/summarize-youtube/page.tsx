
import MainToolCard from '@/components/common/MainToolCard/MainToolCard'
import { Card, CardContent } from '@/components/ui/card'
import Rating from '@/components/Write/SummarizeYoutube/Rating'
import Form from '@/components/Write/SummarizeYoutube/Form'
import { aiWritingToolsArray } from '@/constants/Write/WriteTools'
import React from 'react'
import QrCode from '@/components/Write/QrCode'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Summarize YouTube Video - NifaWow",
  description: "Easily summarize YouTube videos by entering the URL. Get a concise summary of the video's content in just a few clicks.",
};



const page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Summarize Youtube</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Summarize YouTube Video</p>
    </div>

      <Form />
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
    <div className='w-full py-8'>
        <div className="max-container">
          <h1 className="text-[1.6rem] sm:text-[40px] font-bold font-poppin text-heading  dark:text-white ">Other AI Writing Tools</h1>
          <p className="text-paragraph font-poppin  text-[1rem]">Check out some other popular content tools</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8  ">
            {aiWritingToolsArray
              .filter(card => card.title !== 'Summarize YouTube') 
              .slice(0, 8) 
              .map((card, index) => (
                <MainToolCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  paragraph={card.paragraph!}
                  divColor={card.divColor!}
                  iconColor={card.iconColor}
                  icon={card.icon}
                  isdescription={false}
                  isnewTabOpen={true}
                  linkUrl={card.link}

                />
              ))}
          </div>
        </div>
      </div>
  </div>

  )
}

export default page