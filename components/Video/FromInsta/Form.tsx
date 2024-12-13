"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import Image from 'next/image';

const schema = z.object({
  instagram_url: z
    .string()
    .min(1, { message: "URL is required" })
    .url({ message: "Invalid URL format" }) // Ensure it's a valid URL
    .refine((url) => url.includes("instagram.com"), {
      message: "URL must be an Instagram URL",
    }), // Custom validation for Instagram URL
});

type FormFields = z.infer<typeof schema>;

const Form = () => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit } = methods;
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setError(null); // Reset error state
    setVideoUrl(null); // Reset video URL state
    setThumbnail(null); // Reset thumbnail state
    setTitle(null); // Reset title state
    setLoading(true); // Set loading state to true
  
    try {
      // Call the RapidAPI endpoint to fetch the video
      const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': 'fce376576amsh0f01210003b90d8p194ba0jsndcbebf2a06b1', // Use the defined RapidAPI key
          'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: data.instagram_url }), // Pass the URL to the API
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch video.");
      }
  
      // Assuming the API returns the necessary fields
      setThumbnail(result.thumbnail); // Set the thumbnail from the response
      setTitle(result.title); // Set the title from the response
      setVideoUrl(result.medias[0].url); // Set the video URL from the response

    } catch (err) {
      setError("An error occurred while downloading the video.");
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) return;

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = title || 'video'; // Use title or default name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
      setVideoUrl(null)
    } catch (error) {
      console.error("Download failed:", error);
      setVideoUrl(null)

    }
  };

  return (
    <FormProvider {...methods}>
      {thumbnail && title && videoUrl ? (
        <Card className="w-full border-none shadow-2xl h-full max-w-[900px]">
          <CardContent className="flex flex-col justify-center items-center h-full min-h-[450px]">
            <h2 className="text-lg font-bold ">{title}</h2>
            <Image src={thumbnail} alt={title} width={300} height={300} className="w-full max-w-[400px] mb-2" />
            <Button onClick={handleDownload} className="mt-2">
              Download Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full flex justify-center items-center">
          <Card className="w-full border-none shadow-2xl h-full max-w-[900px]">
            <CardContent className="space-y-6 flex justify-center items-center h-full min-h-[400px]">
              <div className='flex flex-col items-start gap-2'>
                <div className='w-[250px]'>
                  <InputField name="instagram_url" Label="Instagram URL" />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Fetching Video..." : "Find Video"}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </FormProvider>
  );
};

export default Form;