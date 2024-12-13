"use client"

import React, { useState } from 'react'
import Form from '@/components/Write/ContentParaphraser/Form'
import TextEditor from '@/components/Write/TextEditor'
import DownLoadFile from '@/components/Write/ContentParaphraser/DownLoadFile'
import { Card,CardContent,CardFooter } from '@/components/ui/card'




const ContentPharaphraseClient = () => {
    const [generatedText, setGeneratedText] = useState<string | null>("");
    const [topic, setTopic] = useState<string | null>("");

  
  return (
    <div className='grid  grid-cols-1 lg:grid-cols-[.89fr_1fr] gap-6 mt-8 w-full min-h-[624px] md:px-24'>
    <Form  setGeneratedText={setGeneratedText} setTopic={setTopic}/>
    <Card className="border-none shadow-lg   ">

      <CardContent className='space-y-1  flex flex-col pt-6'>
        <h1 className="text-[1.35rem] font-poppin text-heading font-bold">AI Output</h1>
        <p className="text-paragraph text-[0.85rem] sm:text-[0.9rem] font-poppin mb-2">Use the generated content as you please</p>
        <TextEditor  generatedText={generatedText} />

      </CardContent>
      <CardFooter className="">
        <DownLoadFile generatedText={generatedText} topic={topic} />
      </CardFooter>
    </Card>
  </div>
  )
}

export default ContentPharaphraseClient
