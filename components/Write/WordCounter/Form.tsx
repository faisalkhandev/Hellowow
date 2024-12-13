"use client"; // Ensure this at the top for Next.js client-side hooks

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const Form = () => {
  const [text, setText] = useState("");

  // Update the event type to React.ChangeEvent
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // Count words by trimming text and splitting by space
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <Card className="w-full border-none shadow-2xl h-full ">
       
      <CardHeader className='pb-1' >
      <div className='py-3'>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold tracking-wide">Word Counter</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">Paste your text below</p>
            </div>
        <div className='flex justify-between items-center w-full'>
        <p className='text-[0.9rem] text-paragraph font-poppin font-[500]'>{wordCount} Words</p>
        <p className='text-[0.9rem] text-paragraph font-poppin font-[500]'>{text.length} Characters</p>
        </div>
      
      </CardHeader>
      <CardContent className="space-y-6 flex justify-center items-center   ">
        <Textarea
          className={`border border-[#E3E3E4] text-[0.9rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
          focus:outline-none rounded-lg w-full h-[400px] focus:border-4 focus:border-[#BFDEFF] p-4`}
          value={text}
          onChange={onChangeHandler}
        />
      </CardContent>
    </Card>
  );
};

export default Form;
