"use client";

import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
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
import { ResetSchema } from '@/schemas';
import { resetPassword } from '@/actions/reset-password';
import FormError from '../../form-error';
import FormSuccess from '../../form-success';
import { Loader2 } from 'lucide-react';

// Define validation schema using Zod


const ForgotPassword = ({ onFormSwitch }: { onFormSwitch?: (form: "signin" | "signup" | "forgotPassword") => void }) => {
  const[error,setError]=useState<string | undefined>("");
  const[success,setSuccess]=useState<string | undefined>("");
  const[loading,setloading]=useState<boolean | undefined>(false);



  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
   
  });

  // Handle form submission
 
  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")
    setloading(true)
    startTransition(async()=>{
     await resetPassword(values).then((data)=>{
 if(data){
   setError(data.error)
   setSuccess(data?.success)
   setloading(false)
 }
     })
   })
   };

  return (
    <Card className='w-full m-auto rounded-lg border-none'>
      <CardHeader className='flex justify-center w-full items-center'>
        <h1 className="font-poppin font-semibold text-3xl ">🔐</h1>
        <h1 className="font-poppin font-semibold text-2xl "> Forgot Password</h1>
      </CardHeader>
      <CardContent className='pb-2 px-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-heading pl-[2px] font-poppin text-[0.8rem] text-[#525658]'>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className={`border h-12 border-[#E3E3E4] text-[0.75rem] font-poppin font-[400] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749] 
                        focus:border-4 focus:outline-none rounded-lg w-full 
                        ${form.formState.errors.email ? 'focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-[#BFDEFF]'}`}
                    />
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
            <Button type="submit" className='w-full h-12'>
            {loading ?  <div className="flex items-center gap-2">
                      Sending....
                      <Loader2 className="animate-spin" />
                    </div>:
              'Send'}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='px-4 flex flex-col'>
        <p className="text-center text-[0.75rem] pt-4 font-poppin text-paragraph">
          Already have an account? 
          <span className="text-primary cursor-pointer font-poppin text-[0.8rem]" onClick={() => onFormSwitch && onFormSwitch("signin")}>
            Sign In
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;