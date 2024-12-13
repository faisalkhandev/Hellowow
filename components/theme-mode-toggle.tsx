"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full hover:bg-transparent dark:bg-[#223544] w-12 h-12 lg:h-9 lg:w-9"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Moon color="#86898A"  size={22} className=" dark:hidden  " />
      <Sun color="#B8BDC1" size={22}  className=" hidden dark:block" />

    </Button>
  );
}