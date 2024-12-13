"use client"

import { Button } from "@/components/ui/button";
import { CarouselApi } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "@/public/icons/Svgs/index";
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Slider component with SSR disabled
const Slider = dynamic(() => import("@/components/Home/Slider"), { ssr: false });


const FreeTools = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  const handlePrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section className="py-16  sm:py-28 max-lg:px-6">
      <div className="max-container ">
        <div className="flex justify-between items-center ">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-poppin font-bold  text-heading max-w-[20ch]">
              {" "}
              Free Tools You&apos;d Usually Pay For{" "}
            </h1>
            <p className="text-paragraph font-poppin font-[400] text-[0.9rem] leading-[30px]">
              No Limits, No Sign-Up
              <br />
              Here&apos;s our featured tools
            </p>
          </div>
          <div className="flex space-x-3 items-center mt-2 max-lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full  "
              onClick={handlePrevious}
            >
              <ArrowLeft color="#D5D6D6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-[#1A8FE3]  shadow-lg "
              onClick={handleNext}
            >
              <ArrowRight color="white" />
            </Button>
          </div>
        </div>
        <div className="mt-10 bg-[#F5F7F8] dark:bg-[#1E2933] lg:pb-6 dark:shadow-custom-left-top">
          <Slider api={api} setApi={setApi} />
        </div>
      </div>
    </section>
  );
};

export default FreeTools;
