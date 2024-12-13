"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIImages from "./AIImages";

interface FormData {
  searchText: string;
}

const Form: React.FC = () => {
  const { register, reset, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState<number>(42);

  // Function to handle prompt submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    
    setLoading(true);
    setImageUrl(null);
    setSeed(Math.floor(Math.random() * 100000)); // Generate a new random seed

    try {
      const params = {
        model: "realistic", // Optional, adjust as needed
        seed,
        width: 600,
        height: 600,
        nologo: true,
        enhance: false,
      };
console.log(data.searchText);

      const response = await axios.get(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(data.searchText)}`,
        { params }
      );

      setImageUrl(response.request.responseURL); // Image URL will be the redirected URL
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  // Function to reuse prompt
  const handleUsePrompt = (prompt: string) => {
    console.log(prompt,"jhhjhjhjhjhjhjhjhjhjhjh");
    
    setValue("searchText", prompt); // Update input value
    onSubmit({ searchText: prompt }); // Submit with the reused prompt
  };

  return (
    <div className="w-full padding-x">
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative shadow-xl rounded-full lg:mt-4">
            <input
              type="text"
              placeholder="E.g. a big asteroid in space"
              {...register("searchText", { required: "Prompt is empty. Please type a prompt." })}
              className="h-11 pl-14 w-full pr-20 py-8 text-[1rem] border-none outline-none rounded-full bg-input"
            />
            <Search
              className="absolute mr-4 left-3 top-1/2 transform -translate-y-1/2"
              size={26}
              color="#1A8FE3"
            />
            <Button
              size="lg"
              className="absolute right-2 top-1/2 transform font-medium -translate-y-1/2 text-white text-sm rounded-full"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin" />
                  <span>{isSubmitting ? "Generating..." : "Generating..."}</span>
                </div>
              ) : (
                "Generate Image"
              )}
            </Button>
          </div>
          {errors.searchText && (
            <p className="text-red-500 mt-2 font-poppin text-center">{errors.searchText.message}</p>
          )}
        </form>
      </div>
      <AIImages setLoading={setLoading} imageUrl={imageUrl} setImageUrl={setImageUrl} onUsePrompt={handleUsePrompt} />
    </div>
  );
};

export default Form;
