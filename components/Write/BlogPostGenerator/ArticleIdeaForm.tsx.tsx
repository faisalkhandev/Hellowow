"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const schema = z.object({
  blog_post: z.string().min(1, "Article title is required"),
});

type FormFields = z.infer<typeof schema>;

const EssayForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full shadow-xl border-none mt-6 space-y-6  flex-col text-center justify-center items-center max-lg:px-4 min-h-[332px] py-8">
        <div>
          <h1 className="text-[1rem] sm:text-[24px] font-[500] font-poppin text-heading dark:text-white  pl:6">
          Article Idea Generator
          </h1>
          <p className="font-poppin text-paragraph text-[0.85rem] font-[400]">
            Let us brainstorm topics for you
          </p>
        </div>
        <CardContent className="w-full text-center flex flex-col justify-center space-y-4 items-center">
          <Input
            {...register("blog_post")}
            placeholder="Enter a high-level topic i.e. finance, Instagram, etc."
            className={`border border-[#E3E3E4] text-[0.9rem] max-w-xl h-12 font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
            ${errors.blog_post ? 'focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-[#BFDEFF]'} focus:outline-none rounded-lg w-full`}
          />
          {errors.blog_post && (
            <p className="text-red-600 text-sm">
              {errors.blog_post.message}
            </p>
          )}
          <Button
            type="submit"
            disabled={true}
            className="w-full max-w-xl h-12"
          >
            {isSubmitting ? 'Generating...' : 'Generate Ideas'}
          </Button>

         
        </CardContent>
      </Card>
    </form>
  );
};

export default EssayForm;
