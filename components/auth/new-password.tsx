"use client";

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import React, { startTransition, useCallback, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from '@/schemas';
import { newPassword } from '@/actions/reset-password';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeOff } from 'lucide-react';


// Define validation schema using Zod


const NewPassword = () => {
  const[error,setError]=useState<string | undefined>("");
  const[success,setSuccess]=useState<string | undefined>("");
  const[loading,setloading]=useState<boolean | undefined>(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility
  };



  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
   
  });
  
const searchParams=useSearchParams();
  const token=searchParams.get("token")


  // Handle form submission
  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
   setSuccess("")
   setloading(true)
    if(!token){
      setError("Missing Token");
      setloading(false)
      return;
  };
  startTransition(async()=>{
  await  newPassword(token,values).then((data)=>{
    if(data){
setError(data?.error)
setSuccess(data?.success)
setloading(false)
    }
   }).catch(()=>{
    setError("Something went wrong")
setloading(false)

   })
  })
  }
   
    


  return (
    <div className='py-16'>
    <Card className='w-full m-auto rounded-lg border-none max-w-[500px] shadow-2xl'>
      <CardHeader className='flex justify-center w-full items-center'>
        <h1 className="font-poppin font-semibold text-3xl ">🔐</h1>
        <h1 className="font-poppin font-semibold text-2xl "> Reset Password</h1>
      </CardHeader>
      <CardContent className='pb-2 px-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-heading pl-[4px] font-poppin text-[0.8rem] text-[#525658] dark:text-white '>Password</FormLabel>
                  <FormControl>
                  <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'} // Toggle input type based on state
              placeholder="********"
              {...field}
              className={`border border-[#E3E3E4] h-12 text-[0.75rem] font-poppin font-[400] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749] 
                focus:border-4 focus:outline-none rounded-lg w-full 
                ${form.formState.errors.password ? 'focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-[#BFDEFF]'}`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility} // Toggle visibility on click
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
              )}
            </button>
          </div>
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            {
              !success && (
                <FormError message={error}/>
              )
            }
            <FormSuccess message={success}/>
            <Button type="submit" className='w-full h-12'>Reset</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='px-4 flex flex-col'>
      <Link href="/auth/login">
        <p className="text-center text-[0.75rem] pt-4 font-poppin text-paragraph">
          Back to login
         
        </p>
        </Link>
      </CardFooter>
    </Card>
    </div>
  );
};

export default NewPassword;