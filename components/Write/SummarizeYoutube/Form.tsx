"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React, { useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import { getTranscript } from "@/actions/video/action";
import { DownLoadDialog } from '../DownloadDialog';
import FormError from '@/components/form-error';
import { Loader2 } from 'lucide-react';

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

export default function Form() {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema), 
  });
  const { handleSubmit, control,formState:{isSubmitting} } = methods;
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string>("");



  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const result = await getTranscript(values.youtube_url);
      if (result.success   && result.summary) {
        setSummary(result.summary);

       
      } if(result.error) {
        
        setError(result.error || "Failed to generate summary");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    } 
  };

  return (
    <>
    <Card className="max-w-[920px] mx-auto w-full border-none">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full flex justify-center items-center">
          <Card className="w-full border-none shadow-2xl h-full max-w-[900px]">
            <CardContent className="space-y-6 grid place-content-center h-full min-h-[380px] w-full">
              <div className='flex flex-col items-start gap-[8px] w-[350px] '>
                <div className='w-full'>
                  <InputField name="youtube_url" Label="URL" />
                  {/* {
                    error(
                      <FormError message={error}/>
                      
                    )
                  } */}
                </div>
                <Button type="submit"  disabled={isSubmitting}>
                                {isSubmitting ? <div className="flex items-center gap-2">
                      Generating....
                      <Loader2 className="animate-spin" />
                    </div> :'Generate Summary'}
                            </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
      </Card>

      {summary ? (
         <Card className='w-full max-w-[920px] shadow-2xl border-none m-auto    p-6'>
          <h1 className='text-2xl font-semibold font-poppin mb-4'>Summary</h1>
         <CardContent className=' h-[400px] bg-[#F6F6F6] overflow-auto text-paragraph font-poppin text-[0.89rem] p-6 rounded-md'> {summary}</CardContent> 
         <CardFooter className='w-full flex justify-center items-center flex-col pt-2'>
             <DownLoadDialog generatedText={summary} fileName="video-summarizer"/>
         </CardFooter> 
       </Card>
         
      ):
      (
        <Card className='w-full max-w-[920px] shadow-2xl border-none m-auto    p-6'>
         <h1 className='text-2xl font-semibold font-poppin mb-4'>Summary</h1>
        <CardContent className=' h-[400px] bg-[#F6F6F6] overflow-auto text-paragraph font-poppin text-[0.89rem] p-6 rounded-md'> This Video has no caption</CardContent> 
        <CardFooter className='w-full flex justify-center items-center flex-col pt-2'>
            {/* <DownLoadDialog generatedText={summary} fileName="video-summarizer"/> */}
        </CardFooter> 
      </Card>
        
     )
      
      
      
      }
      </>
  );
}