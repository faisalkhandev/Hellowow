import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'
import { aiWritingToolsArray } from '@/constants/Write/WriteTools'
import MainToolCard from '@/components/common/MainToolCard/MainToolCard'
import Rating from '@/components/Write/GrammarFixer/Rating'
import QrCode from '@/components/Write/QrCode'
import { Metadata } from 'next'
import GrammarFixerClient from '@/components/Write/GrammarFixer/GrammarFixerClient'


export const metadata: Metadata = {
  title: "AI Grammar Fixer - Correct Your Grammar - NifaWow",
  description: "Easily fix grammar mistakes in your writing with our AI grammar fixer tool. Perfect for students and professionals.",
};


const GrammarFixer = () => {
  return (
    <>
     <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
      <div className='text-center'>
        <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">Grammar Fixer</h1>
        <p className='text-paragraph font-poppin  text-[1rem]'>
        Easily fix the grammar in a block of text</p>
        </div>
        <GrammarFixerClient/>
        {/* <div className='grid grid-cols-1 max-container md:grid-cols-[.47fr_1fr] gap-6 mt-8 w-full min-h-[624px] md:px-24'>
          <Form />
          <Card className="w-full border-none shadow-lg   ">

            <CardContent className='space-y-1  flex flex-col pt-6'>
              <h1 className="text-[1.35rem] font-poppin text-heading font-bold">AI Output</h1>
              <p className="text-paragraph text-[0.85rem] sm:text-[0.9rem] font-poppin mb-2">Use the generated content as you please</p>
              <TextEditor />

            </CardContent>
            <CardFooter className="">
              <DownLoadFile />
            </CardFooter>
          </Card>
        </div> */}
        <QrCode />

        <p className="py-6 font-poppin text-[0.9rem] text-center  text-primary italic">The content is created by AI. Your input and generated text may be stored for evaluation purposes.</p>
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
              .filter(card => card.title !== 'Grammar Fixer') 
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
    </>
  )
}

export default GrammarFixer