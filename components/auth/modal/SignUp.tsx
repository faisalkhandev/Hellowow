"use client";

import React, { startTransition, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { register } from '@/actions/register';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from '../../ui/checkbox';
import FormSuccess from '../../form-success';
import { RegisterSchema } from '@/schemas';
import FormError from '../../form-error';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';




const SignUp = ({ onFormSwitch }: { onFormSwitch: (form: "signin" | "signup" | "forgotPassword") => void }) => {
  const[errorState,setErrorState]=useState<string | undefined>("");
  const[successState,setsuccessState]=useState<string | undefined>("");
  const [loading, setloading] = useState<boolean | undefined>(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility
  };
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "", // Set default value for password
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setErrorState("")
    setsuccessState("")
    setloading(true)
    startTransition( ()=>{
    register(values).then((data)=>{
        if (data.error) {
          setErrorState(data.error);
          setloading(false)
          form.reset();

        }
        else {
          setsuccessState(data.success);
          setloading(false)
          form.reset();

        }
        
       
       })
    
    })


  }
  return (
    <Card className='w-full m-auto rounded-lg border-none'>
      <CardHeader className='flex justify-center w-full items-center'>
      <h1 className="font-poppin font-semibold text-3xl  ">🔐 Auth</h1>
      <p className="text-paragraph text-[0.9rem] pt-2 ">Create an account</p>

      </CardHeader>
      <CardContent className='pb-2 px-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-heading pl-[4px] font-poppin text-[0.8rem] text-[#525658] dark:text-white'>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className={`border h-12 border-[#E3E3E4] text-[0.75rem] font-poppin font-[400] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749] 
                        focus:border-4 focus:outline-none rounded-lg w-full 
                        ${form.formState.errors.name ? 'focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-[#BFDEFF]'}`}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-heading pl-[4px] font-poppin text-[0.8rem] text-[#525658] dark:text-white'>Email</FormLabel>
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
            <div className='w-full flex justify-between items-center text-[0.86rem] pl-[2px] pt-2 pb-4'>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-[0.8rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Subscribe to Newsletter. No Spam
                </label>
              </div>
            </div>
            <FormError message={errorState}/>
            <FormSuccess message={successState}/>

            <Button type="submit" className='w-full h-12' disabled={form.formState.isSubmitting}>
  {loading ?  <div className="flex items-center gap-2">
                      Signing....
                      <Loader2 className="animate-spin" />
                    </div> : 'Sign Up'}
</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='px-4 flex flex-col'>
       <p className="text-center text-[0.75rem] pt-4 font-poppin text-paragraph">
        Already have an account?<span className="text-primary cursor-pointer font-poppin text-[0.8rem]" onClick={() => onFormSwitch("signin")}>Sign In</span>
       </p>

      </CardFooter>
    </Card>
  );
};

export default SignUp;
