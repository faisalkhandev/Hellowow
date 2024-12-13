"use client"

import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react'
import { DownLoadDialog } from '../DownloadDialog';

  
const DownLoadFile = () => {
    const [thumbsUpHovered, setThumbsUpHovered] = useState(false);
    const [thumbsDownHovered, setThumbsDownHovered] = useState(false);
    const [mainText, setMainText] = useState('Rate your result');
  
    const handleThumbsUpClick = () => {
      setMainText('Support us :)');
      setThumbsDownHovered(false); 
    };
  
    const handleThumbsDownClick = () => {
      setMainText('We will review soon!');
      setThumbsUpHovered(false); 
    };
  return (
    <>
    <div className="w-full flex flex-col lg:flex-row items-center gap-3 ">
<DownLoadDialog/>
<div className='w-full flex gap-2 items-start'>
    <div className={`border 
        flex items-center justify-between w-full h-11 py-2 px-2 rounded-lg 
        ${thumbsUpHovered ? 'bg-[#E3F4E9]' : thumbsDownHovered ? 'bg-[#FBE8E9]' : ''}  
        ${mainText === 'Support us :)' ? 'bg-[#E3F4E9] border-[#1CAB48] text-[green] justify-center' : 
          mainText === 'We will review soon!' ? 'bg-[#FBE8E9] text-[#E2464C] border-[#E2464C] justify-center' : 
          'bg-[#EFEFEF]'} 
        text-[#A7A9AA] cursor-pointer`}>
      
            <h1 className='font-poppin text-[0.9rem] font-[500] '>{mainText}</h1>
            <div className={`flex items-center gap-1  ${mainText === 'Support us :)' ||  mainText === 'We will review soon!'?'hidden':'static'}`}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onMouseEnter={() => {
                        setThumbsUpHovered(true);
                        setThumbsDownHovered(false); // Reset thumbs down hover state
                      }}
                      onMouseLeave={() => setThumbsUpHovered(false)}
                      onClick={handleThumbsUpClick}
                      className={`flex items-center  rounded`}
                    >
                      <ThumbsUp size={16} color={thumbsUpHovered ? 'green' : 'currentColor'} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className='bg-[#464A4D] text-white'>
                    <p>I Like it 😍</p>
      
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onMouseEnter={() => {
                        setThumbsDownHovered(true);
                        setThumbsUpHovered(false); // Reset thumbs up hover state
                      }}
                      onMouseLeave={() => setThumbsDownHovered(false)}
                      onClick={handleThumbsDownClick}
                      className={`flex items-center  rounded`}
                    >
                      <ThumbsDown size={16} color={thumbsDownHovered ? '#E45056' : 'currentColor'} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className='bg-[#464A4D] text-white '>
                    <p>Need Improvement! 💪</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className='h-11 px-3 flex justify-center items-center flex-grow-0 flex-shrink-0 rounded-lg  bg-[#EFEFEF] text-[#A7A9AA] cursor-pointer'>
          <Copy size={18} />
          </div>
          </div>
          </div>
          </>
  )
}

export default DownLoadFile