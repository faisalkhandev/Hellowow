"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';

const schema = z.object({
  youtube_url: z
    .string()
    .min(1, { message: "URL is required" })
    .refine((url) => {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([\w-]{11})(\S+)?$/;
      return youtubeRegex.test(url);
    }, { message: "Invalid YouTube URL" }),
});



type FormFields = z.infer<typeof schema>;

const Form = () => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit } = methods;
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
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full flex justify-center items-center">
        <Card className="w-full border-none shadow-2xl h-full  max-w-[900px] ">
          <CardContent className="space-y-6 flex justify-center items-center  h-full min-h-[400px] ">
           <div className='flex flex-col items-start gap-4'>
            <div className='w-[250px]'>
            <InputField name="youtube_url" Label="URL" />
            </div>
            <Button type="submit">Find Mobile</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;
