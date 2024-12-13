
import MainToolCard from '@/components/common/MainToolCard/MainToolCard'
import { Card, CardContent } from '@/components/ui/card'
import {Form} from '@/components/Write/BlogPostGenerator/Form'
import Rating from '@/components/Write/BlogPostGenerator/Rating'
import QrCode from '@/components/Write/QrCode'
import { aiWritingToolsArray } from '@/constants/Write/WriteTools'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: "AI Blog Post Generator - Free Without Sign-Up - NifaWow",
  description: "Generate SEO-optimized blog posts with AI. Enter your article title and let us create a complete blog post instantly. No sign-up required.",
};



const PostGenerator = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center lg:py-16 space-y-2  padding-x">
     
      <div className="p-2 bg-[#E3F1FB] rounded-lg w-full max-w-[565px] ">
        <p className='font-poppin text-[0.9rem] text-heading font-[400]'>👋 Need content at scale? Try the NifaWow <Link href="/write/article-writer_idea" className="underline text-primary font-poppin font-[400] text-[0.95rem] cursor-pointer">
        Content Machine
            </Link></p>
      </div>
  <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading   dark:text-white ">
  AI Blog Post Generator</h1>
    <p className='text-paragraph font-poppin  text-[1rem]'>Let AI Generate an SEO Optimized Blog Post</p>
   
    <Form/>
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
    <div className='w-full py-8 max-container'>
      <h1 className="text-[1.6rem] sm:text-[40px] font-bold font-poppin text-heading  dark:text-white ">Other AI Writing Tools</h1>
      <p className="text-paragraph font-poppin  text-[1rem]">Check out some other popular content tools</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8  ">
        {aiWritingToolsArray
          .filter(card => card.title !== 'content Improver') 
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
            />
          ))}
      </div>
    </div>
  </div>
  

  )
}

export default PostGenerator