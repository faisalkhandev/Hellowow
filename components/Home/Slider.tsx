import * as React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { sliderArray } from "@/constants/Home/Home"; // Adjust the import path as needed
import Link from "next/link";

interface SliderProps {
  api: CarouselApi | null;
  setApi: (api: CarouselApi) => void;
}

export default function Slider({ setApi }: SliderProps) {
  return (
    <Carousel 
      setApi={setApi} 
      className="w-full max-w-[100vw]" 
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {sliderArray.map((item, index) => (
          <CarouselItem key={index} className=" basis-[290px] sm:basis-[360px] flex-grow-0 flex-shrink-0">
          <Link key={index} href={item.link}>
           
           <Card className="rounded-xl cursor-pointer">
              <CardContent className="p-2 sm:p-3 overflow-hidden">
                <div className=" max-lg:h-[10rem] overflow-hidden pt-6 pl-6 rounded-xl" style={{ backgroundColor: item.divColor }}>
                  <Image src={item.image} alt={item.title}  className="rounded-xl object-contain"/>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start mt-1">
                <h2 className="font-poppin font-[600] text-[1rem] text-heading">{item.title}</h2>
                <p className="text-[#707375] font-poppin font-[400] text-[0.7rem] sm:text-[0.9rem]">{item.description}</p>
                <Link href={item.link} className="text-[#4EA8E9] font-poppin flex items-center font-[500] gap-2text-[0.65rem] sm:text-[0.8rem] mt-1 cursor-pointer hover:text-[#1A8FE3]">
                  Learn more <ArrowRight size={16}/>
                </Link>
              </CardFooter>
            </Card>
          </Link>

          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}