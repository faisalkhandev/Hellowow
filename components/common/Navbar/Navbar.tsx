

import Image from "next/image";
import React from "react";
import { NavBarMenu } from "./NavBarMenu/NavBarMenu";
import { ThemeModeToggle } from "../../theme-mode-toggle";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { CiShare2 } from "@/public/icons";
import { Search } from "@/public/icons/Svgs"
import { SideBarMenu } from "./SideBarMenu"
import LightNifaWow from "@/public/icons/Svgs/LightNifaWow.svg"
import DarkNifaWow from "@/public/icons/Svgs/DarkNifaWow.svg"
import { auth } from '@/auth';
import Link from "next/link";
import { AuthDialog } from "@/components/auth/modal/AuthDialog";
import { ProfileMenu } from "@/components/profileDropdown";

 const Navbar = async () => {
  const session = await auth();

  return (
    <>
      <div className="bg-white dark:bg-[#1A252E] padding-x shadow-2xl sticky top-0 left-0 w-full z-50">
        <div className="max-container">
          <div className="flex flex-row justify-between items-center h-[70px]">
            <div className="flex justify-between items-center max-lg:w-full">
              <Link href="/">
                <div>
                  <Image
                    src={LightNifaWow}
                    alt="Logo"
                    priority
                    width={120}
                    height={120}
                    className="object-contain hidden dark:block"
                  />
                  <Image
                    src={DarkNifaWow}
                    alt="Logo"
                    priority
                    width={120}
                    height={120}
                    className="object-contain dark:hidden"
                  />
                </div>
              </Link>
              <div className="flex gap-2 items-center lg:hidden h-auto">
                <Search size={16} color="#707375" />
                <SideBarMenu />
              </div>
            </div>
            <div className="max-lg:hidden">
              <NavBarMenu />
            </div>
            <div className="max-lg:hidden flex gap-3">
              <div className="flex items-center gap-2 border-r pr-4">
                <ThemeModeToggle />
                <Button variant="outline" size="icon" className="rounded-full h-9 w-9 dark:bg-[#223544]">
                  <CiShare2 color="#86898A" size={22} strokeWidth={0.5} className="dark:text-[#B8BDC1]" />
                </Button>
              </div>
              <div className="flex gap-2 max-lg:hidden">
                <div className="relative w-full max-w-sm">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="h-11 bg-[#F6F6F6] dark:bg-input pl-10 text-[0.8rem] text-gray-400 dark:text-white border
                    focus:border-4 focus:border-[#BFDEFF] focus:outline-none rounded-lg"
                  />
                </div>
                {session && <ProfileMenu />}
                {!session && <AuthDialog />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;