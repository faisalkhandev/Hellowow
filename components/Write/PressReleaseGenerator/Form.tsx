"use client"; // Ensure this at the top for Next.js client-side hooks

import TextArea from '@/components/common/TextArea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import { generateContent } from '@/actions/write/action';

const schema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }),
  company_name:z.string().min(5, { message: "Please enter at least 5 characters" }),
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
      const content = await generateContent("press_release_generator",{
        purpose: values.topic,
        company:values.company_name,
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
          <CardContent className="space-y-4 flex flex-col pt-6 h-full">
            <div>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Press Release</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">Generate your text in a second</p>
            </div>
            <InputField name="company_name" Label="Company Name"  length={25}/>

            <div className="flex-1 flex-grow">
              <TextArea
                length={75}
                name="topic"
                Label="Purpose"
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
