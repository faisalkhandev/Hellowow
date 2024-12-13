import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { aiWritingToolsArray } from '@/constants/Write/WriteTools'
import MainToolCard from '@/components/common/MainToolCard/MainToolCard'
import Form from '@/components/Write/AIDetector/Form'
import Rating from '@/components/Write/AIDetector/Rating'

const EssayWriterPage = () => {
  return (
    <>
     <div className="w-full flex flex-col justify-center items-center py-16  space-y-4 padding-x">
      <div className='text-center'>
        <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">AI Content Detector</h1>
        <p className='text-paragraph font-poppin  text-[1rem]'>
        AI Content Detector</p>
        </div>
        <div className='grid grid-cols-1  gap-6 pt-8 w-full  md:px-24 max-container '>
          <Form />
          </div>
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
              .filter(card => card.title !== 'AI Detector') 
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

export default EssayWriterPage