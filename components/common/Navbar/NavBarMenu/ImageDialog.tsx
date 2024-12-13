"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  featuredImageTools,
  ImageCardTools,
  imageToolsArray,
} from "@/constants/Image/ImageTools";
import { ArrowRight, ImageIcon } from "@/public/icons/Svgs";
import Image from "next/image";
import Link from "next/link";
import ToolCard from "../ToolCard";

interface AccordionDemoProps {
  handleToggle?: () => void; // Function that returns void
}

const ImageDialog = ({ handleToggle }: AccordionDemoProps) => {
  // Function to handle link clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (handleToggle) {
      handleToggle();
       
    }
  
  };

  return (
    <div className="max-container">
      <ul className="grid gap-2 px-4 lg:grid-cols-[.3fr_1fr] max-lg:pb-[240px] max-lg:overflow-auto max-lg:static fixed mt-1 left-0 z-50 bg-white max-lg:dark:bg-background dark:bg-[#000000] w-full h-full border rounded-lg">
        <div className="space-y-2 md:border-r py-4">
          <h1 className="text-[#929496] text-[0.8rem] font-poppin font-[600] uppercase">
            All Tools
          </h1>
          <div className="flex flex-col justify-between space-y-4 py-4">
            <div className="border-b rounded-md">
              <Link href="/image/remove-bg" onClick={(e) => handleLinkClick(e, "/image/remove-bg")}>
                <ToolCard
                  bgColor="#FBE6E5"
                  iconColor="#E24841"
                  Icon={ImageIcon}
                  title="Background Remover"
                  description="Easily Remove the Background from an Image"
                  isdescription={true}
                />
              </Link>
            </div>
            {featuredImageTools.map((tool, index) => (
              <Link key={index} href={tool.link} onClick={(e) => handleLinkClick(e, tool.link)}>
                <ToolCard
                  bgColor={tool.bgColor}
                  iconColor={tool.iconColor}
                  Icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  isdescription={false}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6 pl-2 py-2">
          <h1 className="text-[#929496] text-[0.8rem] font-poppin font-[600] uppercase">
            Other Image Tools
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b py-4">
            {ImageCardTools.map((card, index) => (
              <Link key={index} href={card.link} onClick={(e) => handleLinkClick(e, card.link)}>
                <Card className="rounded-xl border-none shadow-none">
                  <CardContent className="space-y-4 h-[200px] max-w-content relative rounded-lg overflow-hidden pl-5" style={{ backgroundColor: card.bgColor }}>
                    <Image src={card.img} alt="Resize_Image" fill className="origin-top-right -rotate-6 rounded-lg" />
                  </CardContent>
                  <CardFooter className="px-2 mt-4">
                    <div className={`w-full flex justify-between items-center`}>
                      <div className="space-y-2">
                        <div className="font-semibold text-[0.8rem] md:text-[0.9rem] text-heading font-poppin">{card.title}</div>
                        <div className="text-[0.8rem] md:text-[0.9rem] font-poppin text-heading font-[500]">{card.description}</div>
                      </div>
                      <ArrowRight size={24} color={card.iconColor} />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="columns-2 md:columns-3">
            {imageToolsArray.map((tool) => (
              <Link key={tool.id} href={tool.link} onClick={(e) => handleLinkClick(e, tool.link)}>
                <h2
                  className={`max-lg:text-[0.8rem] mb-4 text-[1.1rem] font-[500] font-poppin dark:text-white md:mb-5 ${tool.name === "All Image Tools" ? "dark:text-primary text-primary" : "text-[#181D20]"}`}
                >
                  {tool.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default ImageDialog;
