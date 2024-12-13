"use client"; // Ensure this at the top for Next.js client-side hooks

import TextArea from '@/components/common/TextArea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectDropdown } from '../../common/SelectDropdown';
import { SimpleDropdown } from '../SimpleDropdown';
import { generateContent } from '@/actions/write/action';

const schema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }),
  length: z.string(),
  tone_of_voice: z.string()
});


type FormFields = z.infer<typeof schema>;
interface EssayFormProps {
  setGeneratedText: React.Dispatch<React.SetStateAction<string | null>>;
  setTopic: React.Dispatch<React.SetStateAction<string | null>>;

}
const EssayForm :  React.FC<EssayFormProps> = ({ setGeneratedText,setTopic }) => {
  const methods = useForm<FormFields>({
    defaultValues: {
      length: 'Short', 
    },
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit, control,formState:{isSubmitting} } = methods;
    const onSubmit: SubmitHandler<FormFields> = async (values) => {
      try {
        const content = await generateContent("youtube_script_writer",{
          topic: values.topic,
          length:values.length,
          tone: values.tone_of_voice, 
        });
  
        setGeneratedText(content); 
        setTopic(values.topic)
        
      } catch (error) {
        console.error("Error generating content:", error);
        setGeneratedText("Failed to generate content."); // Handle error case
      }
    };

  const educationOptions = [
    { label: "Short", value: "short" },
    { label: "Medium", value: "medium" },
    { label: "Long", value: "long" },
  ];
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Card className="w-full border-none shadow-lg h-full">
          <CardContent className="space-y-6 flex flex-col pt-6 h-full">
            <div>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Topic</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">Generate your script in a second</p>
            </div>

            <div className="flex-1 flex-grow">
              <TextArea
                length={75}
                name="topic"
                Label=""
                placeHolder=''
              />
            </div>
            <SimpleDropdown  name="tone_of_voice" control={control} label="Tone of Voice"/>

           
            <SelectDropdown
              label="Length"
              name="length"
              options={educationOptions}
              control={control} 
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">   {isSubmitting ? 'Generating...' : 'Generate'}</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default EssayForm;
