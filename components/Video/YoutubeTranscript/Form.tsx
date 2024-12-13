"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React, { useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
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
  const { handleSubmit, formState: { isSubmitting } } = methods;
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    // Extract video ID from the YouTube URL
    const videoId = extractVideoId(values.youtube_url);
    if (!videoId) {
      setError("Could not extract video ID from the URL.");
      return;
    }

    try {
      const response = await fetch(`https://youtube-transcript-subtitles-captions.p.rapidapi.com/transcript?videoId=${videoId}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'fce376576amsh0f01210003b90d8p194ba0jsndcbebf2a06b1', // Use the environment variable for the API key
          'X-RapidAPI-Host': 'youtube-transcript-subtitles-captions.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      });
    
      const result = await response.json();
      console.log(result.body); // Log the result for debugging

      if (response.ok) {
        if (result.body) {
          setSummary(result.body); // Assuming the API returns the transcript in 'transcript'
        } else if (result.error) {
          setError(result.error || "Failed to generate summary");
        }
      } else {
        setError(`Error: ${result.message || 'Failed to fetch transcription'}`);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    } 
  };

  // Function to extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null; // Return the video ID or null if not found
  };

  return (
    <>
      <div className="max-w-[920px] mx-auto w-full">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full flex justify-center items-center">
            <Card className="w-full border-none shadow-2xl h-full max-w-[900px]">
              <CardContent className="space-y-6 grid place-content-center h-full min-h-[380px] w-full">
                <div className='flex flex-col items-start gap-[8px] w-[350px] '>
                  <div className='w-full'>
                    <InputField name="youtube_url" Label="YouTube URL" />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        Generating....
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : 'Generate Text'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </FormProvider>

        {summary && (
          <Card className='w-full max-w-[920px] shadow-2xl border-none m-auto p-6 mt-6'>
            <h1 className='text-2xl font-semibold font-poppin mb-4'>Transcription</h1>
            <CardContent className='h-[400px] bg-[#F6F6F6] overflow-auto text-paragraph font-poppin text-[0.89rem] p-6 rounded-md'>
              {summary}
            </CardContent>
            <CardFooter className='w-full flex justify-center items-center flex-col pt-2'>
              <DownLoadDialog generatedText={summary} fileName="video-transcription" />
            </CardFooter>
          </Card>
        )}

        {error && (
          <FormError message={error} />
        )}
      </div> 
    </>
  );
}