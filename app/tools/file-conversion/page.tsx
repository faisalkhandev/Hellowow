import HeroSection from '@/components/common/HeroSection'
import MainToolCard from '@/components/common/MainToolCard/MainToolCard'
import { converterTools } from '@/constants/File/File'
import Link from 'next/link'
import React from 'react'

const FileToolsPage = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const searchQuery = searchParams.search || "";
  const filteredTools = converterTools.filter((tool) => {
    return (
      (tool.title && tool.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tool.description && tool.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tool.paragraph && tool.paragraph.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  return (
    <div>
    <div className="padding-x py-2 lg:py-4 ">
           <HeroSection paragraph="Free Online File & Conversion Tools"  title="File Tools"/>
         </div>
         <section className=" padding-x  bg-[#FEFFFF] dark:bg-[#1F2A33] py-14 lg:mt-8">
         <div className='max-container'>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  ">
             {filteredTools.map((card,index) => (
             < Link    key={index} href={card.link}>
               <MainToolCard
                 key={index}
                 title={card.title}
                 description={card.description}
                 paragraph={card.paragraph!}
                 divColor={card.divColor!}
                 iconColor={card.iconColor}
                 icon={card.icon} 
                 isdescription={true}
                  isnewTabOpen={false}               />
                  </Link>
             ))}
           </div>
           </div>
         </section>
     </div>
  )
}

export default FileToolsPage