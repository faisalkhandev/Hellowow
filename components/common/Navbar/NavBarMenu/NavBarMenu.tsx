"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ToolCard from "../ToolCard";
import { featuredPdfTools, pdfTools } from "@/constants/PDF/PDFTools";
import ImageDialog from "./ImageDialog";
import { featuredVideoTools, videoArray } from "@/constants/Video/Video";
import { featuredArray, featuredFileArray } from "@/constants/File/File";
import Link from "next/link";
import { writeArray, featuredWriteTools } from "@/constants/Write/WriteTools";
import { usePathname } from "next/navigation";
import { chat, IntelliHubTools, IslamicTools } from "@/constants/Intellihub/intelihubTools";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card } from "@/components/ui/card";

export function NavBarMenu() {
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setImageDialogOpen(false);
  }, [pathname]);

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col  sm:flex-row ">
        <NavigationMenuItem className="w-full">
          <Link href="/tools/pdf">
            <NavigationMenuTrigger>PDF</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent className="">
            <ul className="grid gap-2 px-4  md:w-[400px] lg:w-[700px] lg:grid-cols-[.65fr_1fr] ">
              <div className="space-y-2 border-r pr-4 py-4">
                <h1 className="text-[#929496] dark:text-white text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className="flex flex-col justify-between space-y-4">
                  {featuredPdfTools.map((tool) => (
                    <Link key={tool.id} href={tool.link}>
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
              <div className="space-y-6 pl-2 py-4">
                <h1 className="text-[#929496] dark:text-white text-[0.7rem] font-poppin font-[600] uppercase">
                  Other PDF Tools
                </h1>
                <div className="columns-1 md:columns-2  ">
                  {pdfTools.map((tool) => (
                    <Link key={tool.id} href={tool.link}>
                      <h2
                        className={`text-[1.1rem] font-[500] font-poppin mb-4 dark:text-white ${
                          tool.name === "All PDF Tools"
                            ? " dark:text-primary text-primary"
                            : "text-[#181D20]"
                        }`}
                      >
                        {tool.name}
                      </h2>
                    </Link>
                  ))}
                </div>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem
          onMouseEnter={() => setImageDialogOpen(true)}
          onMouseLeave={() => setImageDialogOpen(false)}
        >
          <Link href="/tools/image">
            <NavigationMenuTrigger>Image</NavigationMenuTrigger>
          </Link>
          {isImageDialogOpen ? (
            <div
              onMouseEnter={() => setImageDialogOpen(true)}
              onMouseLeave={() => setImageDialogOpen(false)}
            >
              <ImageDialog />
            </div>
          ) : null}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/write">
            <NavigationMenuTrigger>Write</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid gap-2 px-4  md:w-[400px] lg:w-[944px] lg:grid-cols-[.65fr_1fr] ">
              <div className="space-y-2 border-r pr-4 py-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className="flex flex-col justify-between space-y-4">
                  {featuredWriteTools.map((tool, index) => (
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
              <div className="space-y-6 pl-2 py-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Other Write Tools
                </h1>
                <div className="columns-1 md:columns-2  ">
                  {writeArray.map((tool) => (
                    <Link key={tool.id} href={tool.link}>
                      <h2
                        className={`text-[1.1rem] font-[500] font-poppin mb-4  dark:text-white ${
                          tool.name === "All AI Write"
                            ? " dark:text-primary text-primary"
                            : "text-[#181D20]"
                        }`}
                      >
                        {tool.name}
                      </h2>
                    </Link>
                  ))}
                </div>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/tools/video">
            <NavigationMenuTrigger>Video</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid gap-2 px-4  md:w-[400px] lg:w-[700px] lg:grid-cols-[.65fr_1fr] ">
              <div className="space-y-2 border-r pr-4 py-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className="flex flex-col justify-between space-y-4">
                  {featuredVideoTools.map((tool, index) => (
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
              <div className="space-y-6 pl-2 py-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Other Video Tools
                </h1>
                <div className="columns-1 md:columns-2  ">
                  {videoArray.map((tool) => (
                    <Link key={tool.id} href={tool.link}>
                      <h2
                        className={`text-[1.1rem] font-[500] font-poppin mb-4 max-w-[15ch] dark:text-white ${
                          tool.name === "All Video Tools"
                            ? " dark:text-primary text-primary"
                            : "text-[#181D20]"
                        }`}
                      >
                        {tool.name}
                      </h2>
                    </Link>
                  ))}
                </div>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/tools/file-conversion">
            <NavigationMenuTrigger>File</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid gap-2 px-4  md:w-[400px] lg:w-[700px] ">
              <div className="space-y-2  py-2">
                <h1 className="text-[#929496] text-[0.7rem] font-poppin font-[600] uppercase">
                  Featured Tools
                </h1>
                <div className=" grid grid-cols-2">
                  <div className="flex flex-col justify-between space-y-4">
                    {featuredFileArray.map((tool, index) => (
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
                  <div className="flex flex-col justify-between space-y-4">
                    {featuredArray.map((tool, index) => (
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
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/tools/intellihub">
            <NavigationMenuTrigger>Intellihub</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid gap-2 px-4  md:w-[400px] lg:w-[700px] ">
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
                  <div className="flex flex-row justify-between items-center space-y-4">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none flex-grow space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
