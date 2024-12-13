// components/Home.tsx
"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { detectAIText } from "@/actions/write/detect";
import { useState } from "react";

const schema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }),
});

type FormFields = z.infer<typeof schema>;

export default function Home() {
    const methods = useForm<FormFields>({
        resolver: zodResolver(schema), 
    });
    const { handleSubmit, formState: { isSubmitting }, register } = methods; // Added register
    const [result, setResult] = useState<{
        realProb?: number;
        fakeProb?: number;
        classification?: string;
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormFields> = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            const response = await detectAIText(values.topic);
            if (response.success) {
                setResult(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <>
        <Card className="w-full max-w-[920px] mx-auto ">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <Card className="w-full border-none shadow-2xl h-full ">
                        <CardHeader className='pb-1'>
                            <div className='py-3'>
                                <h1 className="text-[1.3rem] font-poppin text-heading font-bold tracking-wide">Your text</h1>
                                <p className="text-paragraph text-[0.9rem] font-poppin">Decode your text. We analyze first 510 tokens.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 flex justify-center items-center">
                            <Textarea
                                {...register("topic")} // Register the Textarea with the name "topic"
                                className={`border border-[#E3E3E4] text-[0.9rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
                                focus:outline-none rounded-lg w-full h-[400px] focus:border-4 focus:border-[#BFDEFF] p-4`}
                                placeholder="Type your Text"
                            />
                        </CardContent>
                        <CardFooter className='pt-[0.2rem] '>
                            <Button type="submit" variant="outline" className="text-primary border-accent w-full py-1" disabled={isSubmitting}>
                                {isSubmitting ? 'Detecting...' : 'Detect'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </FormProvider>
            </Card>
            {result && (
                <Card className="mt-8 space-y-6 max-w-[920px] mx-auto w-full">
                    <div className="p-6  rounded-lg">
                        <h2 className="text-2xl mb-6">Analysis Results</h2>
                        {/* Confidence Bars */}
                        <div className="space-y-4">
                            {/* Human Probability */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span>Human-Written Probability:</span>
                                    <span className={`font-bold ${result.realProb! > 50 ? "text-green-400" : "text-gray-400"}`}>
                                        {result.realProb?.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-green-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${result.realProb}%` }}></div>
                                </div>
                            </div>

                            {/* AI Probability */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span>AI-Generated Probability:</span>
                                    <span className={`font-bold ${result.fakeProb! > 50 ? "text-red-400" : "text-gray-400"}`}>
                                        {result.fakeProb?.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-red-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${result.fakeProb}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Final Verdict */}
                        <div className="mt-6 p-4 rounded bg-white/5">
                            <h3 className="text-xl mb-2">Verdict</h3>
                            <p className={`text-lg font-medium ${result.classification === "Human-written" ? "text-green-400" : "text-red-400"}`}>
                                {result.classification === "Human-written" ? "👤 This text appears to be human-written" : "🤖 This text appears to be AI-generated"}
                            </p>
                        </div>

                        {/* Reliability Note */}
                        <div className="mt-4 text-sm text-gray-400">
                            <p>Note: For best results, provide text with at least 100 characters. Detection accuracy increases with longer text samples.</p>
                        </div>
                    </div>
                </Card>
            )}
     </>
    );
}