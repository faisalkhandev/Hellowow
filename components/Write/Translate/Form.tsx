"use client"; // Ensure this at the top for Next.js client-side hooks

import TextArea from '@/components/common/TextArea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SimpleDropdown } from '../SimpleDropdown';
import { generateContent } from '@/actions/write/action';

const schema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }),
 language: z.string(),
});
interface EssayFormProps {
  setGeneratedText: React.Dispatch<React.SetStateAction<string | null>>;
  setTopic: React.Dispatch<React.SetStateAction<string | null>>;

}

type FormFields = z.infer<typeof schema>;

const Form : React.FC<EssayFormProps> = ({ setGeneratedText,setTopic }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit, control,formState:{isSubmitting} } = methods;
  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    console.log("Form submitted"); // Check if submission is happening
    console.log("Arabic", values); // Check values here
  
    try {
      const content = await generateContent("translate", {
        topic: values.topic,
        language: values.language,
      });
      console.log("Generated Content:", content); // Check if content is returned
      
      setGeneratedText(content);
      setTopic(values.topic);
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedText("Failed to generate content.");
    }
  };
  const data = [
    { title: "English", value: "english" },
    { title: "Spanish", value: "spanish" },
    { title: "Mandarin", value: "mandarin" },
    { title: "Hindi", value: "hindi" },
    { title: "Arabic", value: "arabic" },
    { title: "French", value: "french" },
    { title: "Russian", value: "russian" },
    { title: "Portuguese", value: "portuguese" },
    { title: "Bengali", value: "bengali" },
    { title: "German", value: "german" },
    { title: "Japanese", value: "japanese" },
    { title: "Korean", value: "korean" },
    { title: "Italian", value: "italian" },
    { title: "Dutch", value: "dutch" },
    { title: "Turkish", value: "turkish" },
    { title: "Urdu", value: "urdu" },
  ];
  


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Card className="w-full border-none shadow-lg h-full">
          <CardContent className="space-y-6 flex flex-col pt-6 h-full">
            <div>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Your Text</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">Input your Text below</p>
            </div>

            <div className="flex-1 flex-grow">
              <TextArea
                length={2000}
                name="topic"
                Label=""
                placeHolder=''
              />
            </div>

            <SimpleDropdown  name="language" control={control} label="Language" data={data} />
            <Button type="submit" disabled={isSubmitting} className="w-full">   {isSubmitting ? 'Generating...' : 'Generate'}</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;
