"use client"; // Ensure this at the top for Next.js client-side hooks

import TextArea from '@/components/common/TextArea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import { SelectDropdown } from '@/components/common/SelectDropdown';
import { generateContent } from '@/actions/write/action';

const schema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }),
  input_url:z.string(),
  length:z.string()
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
  
  const { handleSubmit,control,formState:{isSubmitting} } = methods;
  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const content = await generateContent("content_shortener",{
        topic: values.topic,
      });

      setGeneratedText(content); 
      setTopic(values.topic)
      
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedText("Failed to generate content."); // Handle error case
    }
  };

  const Length = [
    { label: "Sentences", value: "sentences" },
    { label: "a Paragraph", value: "a_paragraph" },
    { label: "a few Paragraph", value: "a_few_paragraph" },
  ];
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Card className="w-full border-none shadow-lg h-full">
          <CardContent className="space-y-6 flex flex-col pt-6 h-full">
            <div>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Your Text</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">
              Paste your text here OR</p>
            </div>

            <div className="flex-1 flex-grow">
              <TextArea
                length={3000}
                name="topic"
                Label=""
                placeHolder=''
              />
            </div>
            <InputField name="input_url" Label="Input URL:" />
            <SelectDropdown
              label=" Length"
              name="length"
              options={Length}
              control={control} 
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">   {isSubmitting ? 'Generating...' : 'Generate'}</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;
