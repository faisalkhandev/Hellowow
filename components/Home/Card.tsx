import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

interface CardProps {
  bgColor: string;
  iconBgColor: string;
  footerDivColor: string;
  icon: React.ElementType;
  title: string;
  description: string;
  footerText: string;
  darkDivColor:string;
}

const CustomCard: React.FC<CardProps> = ({ 
    bgColor, 
    iconBgColor, 
    icon: Icon, 
    title, 
    description, 
    footerText ,
    footerDivColor,
    darkDivColor
  }) => {
  return (
    <Card className="w-full min-w-[250px] text-white overflow-hidden rounded-xl cursor-pointer">
        <div style={{backgroundColor:bgColor}} className='w-full h-max' >
      <CardHeader className='p-3'>
        <div className="flex justify-between items-center space-x-4">
          <div className="p-2 rounded-full" style={{ backgroundColor: iconBgColor }}>
            <Icon size={24} />
          </div>
          <div className="rounded-full" style={{ backgroundColor: iconBgColor }}>
            <CardTitle className="px-2 py-1">
               <p className='text-[0.8rem] font-[400]'>30+Tools</p>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-3'>
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className='font-poppin text-md font-bold mb-1'>{title}</h1>
            <CardDescription className="text-white text-[0.65rem] font-poppin font-[600]">{description}</CardDescription>
          </div>
          <div>
            <ArrowRight size={16} />
          </div>
        </div>
      </CardContent>
      </div>
      <CardFooter className=" p-4">
        <div className={`w-full flex justify-between items-center rounded-lg p-2 dark:bg-[${darkDivColor}]`}  style={{ backgroundColor: footerDivColor }}>
          <div className="font-semibold text-[0.6rem] text-[#707375] font-poppin">Featured Tool:</div>
          <div className="text-[0.65rem] font-poppin text-[#007bff]">{footerText}</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;