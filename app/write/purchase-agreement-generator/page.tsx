
import MainToolCard from '@/components/common/MainToolCard/MainToolCard'
import { Card, CardContent } from '@/components/ui/card'
import Rating from '@/components/Write/SummarizePdf/Rating'
import {Form} from '@/components/Write/PurchaseAgreement/Form'
import { aiWritingToolsArray } from '@/constants/Write/WriteTools'
import React from 'react'
import QrCode from '@/components/Write/QrCode'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Purchase Agreement Generator - NifaWow",
  description: "Generate a comprehensive purchase agreement for your transactions. Enter your information and let AI create the document for you.",
};



const PurchaseAgreement = () => {
  return (
    <>
    
    <div className="w-full flex flex-col justify-center items-center  py-6  space-y-4 padding-x">
    <Card className="p-2 shadow-2xl rounded-lg   ">
        <p className='font-poppin text-[0.9rem] text-heading font-[500] flex gap-2 items-center px-3'>Not legal advice. Always consult a lawyer</p>
      </Card> 
     <div className='py-8 text-center w-full ' >
    <h1 className="text-[1.3rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white  ">
    Purchase Agreement Generator</h1>
    <p className='text-paragraph font-poppin  text-[0.85rem] sm:text-[1rem]'>Generate purchase agreement for your</p>
    <div className=' mt-8 w-full max-w-[980px] mx-auto'>
      <Form />
     </div>
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
              .filter(card => card.title !== 'Purchase Agreement') 
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

export default PurchaseAgreement