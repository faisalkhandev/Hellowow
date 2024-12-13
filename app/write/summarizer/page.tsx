
import MainToolCard from '@/components/common/MainToolCard/MainToolCard'
import { Card, CardContent } from '@/components/ui/card'
import Rating from '@/components/Write/SummarizePdf/Rating'
import Form from '@/components/Write/SummarizePdf/Form'
import { aiWritingToolsArray } from '@/constants/Write/WriteTools'
import QrCode  from '../../../components/Write/QrCode'
import React from 'react'
import { Metadata } from 'next'



if (typeof Promise.withResolvers === "undefined") {
  if (typeof window !== 'undefined') {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  } else {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    global.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  }
}

export const metadata: Metadata = {
  title: "Summarize PDF - NifaWow",
  description: "Upload your PDF and let AI summarize the document for you. Free and easy-to-use tool with no sign-up required.",
};


const page = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
      <div className='text-center'>
    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
    Summarize Pdf</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Summarize Pdf Document</p>
    </div>
    <div className='mt-8 w-full'>

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
    <div className='w-full py-8'>
        <div className="max-container">
          <h1 className="text-[1.6rem] sm:text-[40px] font-bold font-poppin text-heading  dark:text-white ">Other AI Writing Tools</h1>
          <p className="text-paragraph font-poppin  text-[1rem]">Check out some other popular content tools</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8  ">
            {aiWritingToolsArray
              .filter(card => card.title !== 'Content Summarizer') 
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