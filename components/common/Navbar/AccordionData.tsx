import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { featuredPdfTools,pdfTools } from "@/constants/PDF/PDFTools"
import ToolCard from "./ToolCard"
import ImageDialog from "./NavBarMenu/ImageDialog"
import Link from "next/link"
import { featuredWriteTools, writeArray } from "@/constants/Write/WriteTools"
import { featuredVideoTools } from "@/constants/Video/Video"
import { videoArray } from "../../../constants/Video/Video"
import { featuredFileArray } from "@/constants/File/File"
import { chat, IslamicTools } from "@/constants/Intellihub/intelihubTools"
interface AccordionDemoProps {
  handleToggle: () => void; // Function that returns void
}

export function AccordionDemo({ handleToggle }: AccordionDemoProps) {
    return (
      <Accordion type="single" collapsible className="w-full flex flex-col h-[100%]  ">
        <AccordionItem value="item-1 ">
          <AccordionTrigger className="font-bold">PDF</AccordionTrigger>
          <AccordionContent className="px-4 ">
          <ul className="grid gap-2  w-[100]  pb-[100px] ">
              <div className=" border-b pb-4">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className="flex flex-col justify-between space-y-1">
                  {featuredPdfTools.map((tool) => (
                    <Link key={tool.id} href={tool.link} onClick={()=>handleToggle()}>
                    <ToolCard
                      bgColor={tool.bgColor}
                      iconColor={tool.iconColor}
                      Icon={tool.icon}
                      title={tool.name}
                      description={tool.description}
                      isdescription={true}
                    />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2 px-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Other PDF Tools
                </h1>
                <div className="columns-2 space-y-2 ">
                  {pdfTools.map((tool) => (
                     <Link   key={tool.id} href={tool.link} onClick={()=>handleToggle()}>
                    <h2
                      className={`text-[0.8rem] font-[500] font-poppin mb-2 dark:text-white ${tool.name === "All PDF Tools" ? " dark:text-primary text-primary" : "text-[#181D20]"}`}
                    >
                      {tool.name}
                    </h2>
                    </Link>
                  ))}
                </div>
              </div>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2 h-full ">
          <AccordionTrigger className="font-bold">Image</AccordionTrigger>
          <AccordionContent className="h-full" >
          <ImageDialog handleToggle={handleToggle}/>
          </AccordionContent>
        </AccordionItem>
       
        <AccordionItem value="item-3 ">
          <AccordionTrigger className="font-bold">Write</AccordionTrigger>
          <AccordionContent className="px-4 ">
          <ul className="grid gap-2  w-[100]   pb-[200px]">
              <div className=" border-b">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className="flex flex-col justify-between space-y-1">
                  {featuredWriteTools.map((tool,index) => (
                    <Link key={index} href={tool.link} onClick={()=>handleToggle()}>
                    <ToolCard
                      key={index}
                      bgColor={tool.divColor}
                      iconColor={tool.iconColor}
                      Icon={tool.icon}
                      title={tool.title}
                      description={tool.description}
                      isdescription={true}
                    />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2 px-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Other Write Tools
                </h1>
                <div className="columns-2 space-y-2 ">
                  {writeArray.map((tool) => (
                      <Link   key={tool.id} href={tool.link} onClick={()=>handleToggle()}>
                      <h2
                        className={`text-[0.8rem] font-[500] font-poppin mb-2 dark:text-white ${tool.name === "All AI Write" ? " dark:text-primary text-primary" : "text-[#181D20]"}`}
                      >
                        {tool.name}
                      </h2>
                      </Link>
                  ))}
                </div>
              </div>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4 ">
          <AccordionTrigger className="font-bold">Video</AccordionTrigger>
          <AccordionContent className="px-4  pb-[240px]">
          <ul className="grid gap-2  w-[100] ">
              <div className=" border-b pb-4">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className="flex flex-col justify-between space-y-1">
                  {featuredVideoTools.map((tool,index) => (
                    <Link key={index} href={tool.link} onClick={()=>handleToggle()}>
                    <ToolCard
                      bgColor={tool.divColor}
                      iconColor={tool.iconColor}
                      Icon={tool.icon}
                      title={tool.title}
                      description={tool.description}
                      isdescription={true}
                    />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2 px-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Other Video Tools
                </h1>
                <div className="columns-2 space-y-2 ">
                  {videoArray.map((tool) => (
                    <Link   key={tool.id} href={tool.link} onClick={()=>handleToggle()}>
                    <h2
                      className={`text-[0.8rem] font-[500] font-poppin mb-2 dark:text-white ${tool.name === "All Video Tools" ? " dark:text-primary text-primary"  : "text-[#181D20]"}`}
                    >
                      {tool.name}
                    </h2>
                    </Link>
                  ))}
                </div>
              </div>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5 ">
          <AccordionTrigger className="font-bold">File</AccordionTrigger>
          <AccordionContent className="px-4 ">
          <ul className="grid gap-2  w-[100]  pb-[240px]">
              <div className=" border-b pb-4">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className="flex flex-col justify-between space-y-1">
                  {featuredFileArray.map((tool,index) => (
                    <Link key={index} href={tool.link} onClick={()=>handleToggle()}>
                    <ToolCard
                      bgColor={tool.divColor}
                      iconColor={tool.iconColor}
                      Icon={tool.icon}
                      title={tool.title}
                      description={tool.description}
                      isdescription={true}
                    />
                    </Link>
                  ))}
                </div>
              </div>

             
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6 ">
          <AccordionTrigger className="font-bold">Intellihub</AccordionTrigger>
          <AccordionContent className="px-4 ">
          <ul className="grid gap-2  w-[100]  pb-[240px] ">
              <div className="space-y-2  py-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                 Chat
                </h1>
                <div className=" grid grid-cols-1">
                  <div className="flex flex-col justify-between space-y-4">
                    {chat.map((tool, index) => (
                      <Link key={index} href={tool.link}>
                        <ToolCard
                          bgColor={tool.divColor}
                          iconColor={tool.iconColor}
                          Icon={tool.icon}
                          title={tool.title}
                          description={tool.description}
                          isdescription={true}
                        />
                      </Link>
                    ))}
                  </div>
                  <div className="py-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                 Islamic Tools
                </h1>
                  <div className="border-b w-full h-4 dark:border-white"/>
                  <div className="flex flex-row max-lg:flex-col max-lg:items-start py-2 justify-between items-center space-y-4">
                    {IslamicTools.map((tool, index) => (
                      <Link key={index} href={tool.link}>
                        <ToolCard
                          bgColor={tool.divColor}
                          iconColor={tool.iconColor}
                          Icon={tool.icon}
                          title={tool.title}
                          description={tool.description}
                          isdescription={true}
                        />
                      </Link>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
            </ul>
             

             
            
           
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  