"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import TextEditorForm from '@/components/Write/TextEditorForm'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateContent } from '@/actions/write/action';

const schema = z.object({
  content: z.string().min(5, { message: "Topic must be at least 5 characters" }),

});


type FormFields = z.infer<typeof schema>;
interface EssayFormProps {
  setGeneratedText: React.Dispatch<React.SetStateAction<string | null>>;
  setTopic: React.Dispatch<React.SetStateAction<string | null>>;

}

const Form : React.FC<EssayFormProps> = ({ setGeneratedText,setTopic }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit,control,formState:{isSubmitting} } = methods;
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    
    
    try {
      // Call server action with content data from TextEditorForm
      const response = await generateContent("rephraser", { topic: data.content });
      setGeneratedText(response);
      setTopic(data.content)
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Card className="w-full border-none shadow-lg h-full">
          <CardContent className="space-y-1 flex flex-col pt-6 h-full">
            <div>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Article</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">Rewrite your article in a second</p>
            </div>

            <div className="flex-1 flex-grow">
             <TextEditorForm name="content" control={control} Label="Paste Your Article "/>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">   {isSubmitting ? 'Generating...' : 'Generate'}</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;
