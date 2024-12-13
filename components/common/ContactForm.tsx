"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

// Define Zod schema for form validation
const schema = z.object({
  name: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email address"), 
  comment: z.string().min(2, "Comment must be at least 2 characters"),
});

// Define TypeScript types for the form
type FormFields = z.infer<typeof schema>;


const ContactForm = () => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit,formState:{isSubmitting,errors},register } = methods;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000); 
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full max-w-[650px]">
            <div className=' flex flex-col lg:flex-row gap-4 lg:gap-10'>
    <div className={`space-y-2 w-full  flex flex-col items-start`} >
    <h1 className="text-[#525658] font-poppin font-[500] text-[1rem]">Name</h1>

            <Input
        {...register("name")}
        placeholder="johnDoe"
        className={` border shadow-lg border-[#E3E3E4] h-12 text-[0.95rem] font-[500] text-paragraph   bg-white dark:bg-input  dark:text-white dark:bg-[#223749]
        ${errors.name ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-xl w-full `} 
      />
      {errors.name && <p className="text-red-500 font-[400] text-[0.8rem] mb-2">{errors.name.message}</p>} {/* Convert error to string */}
     </div>
     
     <div className={`space-y-2 w-full  flex flex-col items-start`} >
    <h1 className="text-[#525658] font-poppin font-[500] text-[1rem]">Email</h1>

            <Input
        {...register("email")}
        placeholder="johnDoe"
        className={` border shadow-lg border-[#E3E3E4] h-12 text-[0.95rem] font-[500] text-paragraph bg-white dark:bg-input  dark:text-white dark:bg-[#223749]
        ${errors.email ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-xl w-full `} 
      />
      {errors.email && <p className="text-red-500 font-[400] text-[0.8rem] mb-2">{errors.email.message}</p>} {/* Convert error to string */}
     </div>
      </div>
      <div className="flex-1 flex-grow space-y-2 mt-4">
        <h1 className="text-[#525658] font-poppin text-[1rem]">Comments</h1>
      <Textarea
        {...register("comment")}
        placeholder="Your Thoughts "
        className={`border shadow-lg border-[#E3E3E4] text-[0.95rem] font-poppin font-[400]  bg-white p-3 text-paragraph dark:bg-input dark:text-white dark:bg-[#223749] ${
            errors.comment ? 'focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-[#BFDEFF]'
          } focus:outline-none rounded-xl w-full h-[100%] min-h-[160px]`} 
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p> // Display error message for comment
        )}
        </div>
      <div className="text-right  mt-4 lg:mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
         size="lg"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
        </div>

      </form>
      </FormProvider>
  );
};

export default ContactForm;
