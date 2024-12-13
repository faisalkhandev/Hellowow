
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "./login";
import SignUp from "./SignUp";
import ForgotPassword from "./Forgotpassword";


export function AuthDialog() {
    const [currentForm, setCurrentForm] = useState<"signin" | "signup" | "forgotPassword">("signin");

    const handleFormSwitch = (form: "signin" | "signup" | "forgotPassword") => {
      setCurrentForm(form);
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button type="submit" size="lg" className="font-[600] rounded-lg  font-poppin max-lg:w-full max-w-md">
                    Sign In
                  </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      {currentForm == "signin" && <Login onFormSwitch={handleFormSwitch}/>}
          {currentForm === "signup" && <SignUp onFormSwitch={handleFormSwitch} />}
          {currentForm === "forgotPassword" && <ForgotPassword onFormSwitch={handleFormSwitch} />}
       
      </DialogContent>
    </Dialog>
  );
}