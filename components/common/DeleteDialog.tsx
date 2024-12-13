"use client"; 

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "@/actions/login";

export function DeleteDialog() {
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = async () => {
    await LogOut(); 
    window.location.href = "/auth/login";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          <span>Log out</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[150px]">
        <DialogHeader>
          <DialogTitle className="text-heading text-[1.2rem] font-poppin">
            Do you want to Logout?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex gap-2 items-center ">
          <Button size="lg" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button size="lg" onClick={handleLogout}>
            Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}