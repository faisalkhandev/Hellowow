"use client";

import MainToolCard from "@/components/common/MainToolCard/MainToolCard";
import { Button } from "@/components/ui/button";
import { cardDataAI, TabBarArray } from "@/constants/Home/Home";
import { pdfPageTools } from "@/constants/PDF/PDFTools";
import { videoTools } from "@/constants/Video/Video";
import {imagePageToolArray } from "@/constants/Image/ImageTools";
import { converterTools } from "@/constants/File/File";
import React, { useState, useEffect } from "react"; 
import Link from "next/link";
import { aiWritingToolsArray } from "@/constants/Write/WriteTools";
import { FileText } from "lucide-react";

type ToolType = {
  title: string;
  description: string;
  paragraph?: string; 
  divColor?: string; 
  iconColor: string;
  icon?: React.ElementType; 
  link: string;
};

// Define a type for the tab
type TabType = {
  link: string;
  title: string;
  icon?: React.ElementType; // Assuming icon is a React component
};

const PopularTools = () => {
 
  const [selectedTab, setSelectedTab] = useState(TabBarArray[0].link); 
  const [displayedTools, setDisplayedTools] = useState<ToolType[]>(cardDataAI); 
  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab.link); 
  };


  useEffect(() => {
    console.log(selectedTab);
    
    switch (selectedTab) {
      case "pdfTools":
        setDisplayedTools(pdfPageTools as ToolType[]); 
        break;
      case "videoTools":
        setDisplayedTools(videoTools as ToolType[]); 
        break;
      case "imageTools":
        setDisplayedTools(imagePageToolArray as ToolType[]);
        break;
      case "converterTools":
        setDisplayedTools(converterTools as ToolType[]); 
        break;
        case "aiTools":
          setDisplayedTools(aiWritingToolsArray as ToolType[]);
          break;
      default:
        setDisplayedTools(cardDataAI as ToolType[]); 
    }
  }, [selectedTab]);

  return (
    <section className="max-container">
      <div className="flex flex-col items-center gap-3 w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-poppin font-bold text-heading">
          Our Most Popular Tools
        </h1>
        <p className="text-paragraph font-poppin font-[400] text-[1.3rem] md:text-[0.9rem] md:mt-4 md:mb-4">
          We present the best of the best. All free, no catch
        </p>
        <div className="rounded-full border-none bg-white dark:bg-[#212D36] flex sm:space-x-4 p-2 max-w-full overflow-y-auto scrollbar-hide">
          {TabBarArray.map((tabBar, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(tabBar)} 
              className={`${
                selectedTab === tabBar.link
                  ? "bg-[#329BE6] rounded-full text-white backdrop-blur-md" 
                  : "bg-transparent text-paragraph"
              } p-3 transition-all duration-700 ease-in-out cursor-pointer flex items-center gap-2 text-[#525658] flex-shrink-0`}
            >
              <tabBar.icon size={18} />
              <p className="text-sm font-poppin font-[500]">{tabBar.title}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-[.5fr_1fr_.5fr] w-full gap-4 mt-4 lg:mt-6 md:gap-6">
        {displayedTools.slice(0, 12).map((card, index) => (
          <Link key={index} href={card.link}>
            <MainToolCard
              title={card.title}
              description={card.description}
              paragraph={card.paragraph!}
              divColor={card.divColor!}
              iconColor={card.iconColor}
              icon={card.icon || FileText}
              isdescription={true}
              isnewTabOpen={false}
            />
            </Link>
          ))}
        </div>
        <Link href="/tools">
          <Button
            variant="outline"
            size="lg"
            className="mt-8 font-poppin border border-[#1A8FE3]"
          >
            All Tools
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PopularTools;