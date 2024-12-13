


import Image from 'next/image';
import Stepper from '@/public/images/PDF/StepperImage.png';
import * as React from "react"


interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  heading: string;
  stepsData: Step[];
}

const StepperComponent = ({ heading, stepsData }: StepperProps) => {

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[0.67fr_1.2fr] max-container    ">
    <div className="flex flex-col items-start justify-center h-full"> 
      <p className="text-[1rem] font-poppin font-[600] text-primary leading-[37px]">STEP BY STEP</p>
      <h1 className="text-[2.6rem] font-poppin text-heading font-bold whitespace-pre-wrap leading-[54px]">
        {heading}
      </h1>
      <p className="text-paragraph font-poppin font-[400] text-[0.89rem] py-4">
        Follow along with the steps below
      </p>
      <div className="pt-4 pl-2">
        {stepsData.map((step, index) => (
          <div
            key={index}
            className={`relative pl-10  ${index > 0 ? 'mt-6' : ''} ${
              index < stepsData.length - 1
                ? 'before:absolute before:content-[""] before:w-2 before:h-[calc(100%+30px)] before:top-1 before:left-0 before:border-l-2 before:border-[#71BAEE] before:border-dashed'
                : ''
            } after:absolute after:content-[''] after:h-5 after:w-5 after:-left-2 after:top-1 after:rounded-full after:bg-blue-500 after:border-2 after:border-white after:ring-2 after:ring-blue-500`}
          >
            <h1 className="text-heading text-[1.1rem] font-poppin font-[600]">{step.title}</h1>
            <p className="text-paragraph font-poppin font-[400] text-[0.95rem]">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-end">
      <Image src={Stepper} alt="stepper" />
    </div>
  </div>

  );
};

export default StepperComponent;
      

