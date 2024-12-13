"use client"; // Ensure this at the top for Next.js client-side hooks

import TextArea from '@/components/common/TextArea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateContent } from '@/actions/write/action';

const schema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }),
  from: z.string().email({ message: "Invalid email address" }) // Ensure 'from' is a string and validate as an email
});


type FormFields = z.infer<typeof schema>;
interface EssayFormProps {
  setGeneratedText: React.Dispatch<React.SetStateAction<string | null>>;
  setTopic: React.Dispatch<React.SetStateAction<string | null>>;

}

const Form: React.FC<EssayFormProps> = ({ setGeneratedText,setTopic }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit,formState:{isSubmitting} } = methods;
  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const content = await generateContent("cold_email_writer",{
        topic: values.topic,
        from:values.from,
      });

      setGeneratedText(content); 
      setTopic(values.topic)
      
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedText("Failed to generate content."); // Handle error case
    }
  };

 
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Card className="w-full border-none shadow-lg h-full">
          <CardContent className="space-y-6 flex flex-col pt-6 h-full">
            <div>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Email Topic</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">What&apos;s your email about?</p>
            </div>

            <div className="flex-1 flex-grow">
              <TextArea
                length={60}
                name="topic"
                Label="Topic"
                placeHolder=''
              />
            </div>
            <div className="flex-1 flex-grow">
              <TextArea
                length={30}
                name="from"
                Label="From(Optional)"
                placeHolder=''
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">   {isSubmitting ? 'Generating...' : 'Generate'}</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;
