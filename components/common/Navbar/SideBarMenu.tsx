"use client";

import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CiShare2 } from "react-icons/ci";
import { ThemeModeToggle } from "../../theme-mode-toggle";
import { Sling as Hamburger } from 'hamburger-react';
import { AccordionDemo } from './AccordionData';
import { Input } from '@/components/ui/input';
import { Search } from '@/public/icons/Svgs/index';
import { AuthDialog } from '@/components/auth/modal/AuthDialog';

export const SideBarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen); // Toggle the sheet when hamburger is clicked
  };

  return (
    <>
      <Hamburger toggled={isOpen} toggle={handleToggle} size={18} />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-full  px-4 fixed top-[64px] left-0 z-40 ">
          <div className=" w-full max-w-md relative ">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search"
              className="h-11 bg-[#F6F6F6] dark:bg-input pl-10 text-[0.8rem] text-gray-400 dark:text-white rounded-lg"
            />
          </div>
          <div className="flex flex-col  h-full  w-full">
            <div className="flex-grow h-auto overflow-auto ">
              <AccordionDemo handleToggle={handleToggle}/>
            </div>
            </div>
            <div className="flex-shrink-0 fixed bottom-0 left-0 w-full max-w-sm bg-white dark:bg-[#1A252E] z-50  p-4 space-y-2"> 
              <div className="flex flex-row items-center justify-center gap-4 mb-2">
                <ThemeModeToggle />
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <CiShare2 color="#86898A" size={24} />
                </Button>
              </div>
              <Button variant="outline" className="w-full max-w-md">Support Us</Button>
              <AuthDialog />
            </div>
        </SheetContent>
      </Sheet>
    </>
  );
};