"use client"; // Ensure this at the top for Next.js client-side hooks

import TextArea from '@/components/common/TextArea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectDropdown } from '../../common/SelectDropdown';
import { generateContent } from '@/actions/write/action';

const schema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }),
  no_of_paragraph: z.string(),
  education_level: z.string()
});


type FormFields = z.infer<typeof schema>;

interface EssayFormProps {
  setGeneratedText: React.Dispatch<React.SetStateAction<string | null>>;
  setTopic: React.Dispatch<React.SetStateAction<string | null>>;

}

const EssayForm: React.FC<EssayFormProps> = ({ setGeneratedText,setTopic }) => {
  const methods = useForm<FormFields>({
    defaultValues: {
      no_of_paragraph: '3', 
      education_level: '', 
    },
    resolver: zodResolver(schema), 
  });
  
  const { handleSubmit, control,formState:{isSubmitting} } = methods;
    const onSubmit: SubmitHandler<FormFields> = async (values) => {
      try {
        const content = await generateContent("essay",{
          topic: values.topic,
          education_level:values.education_level,
          numSentences: values.no_of_paragraph, 
        });
  
        setGeneratedText(content); 
        setTopic(values.topic)
        
      } catch (error) {
        console.error("Error generating content:", error);
        setGeneratedText("Failed to generate content."); // Handle error case
      }
    };

  const educationOptions = [
    { label: "High School", value: "high_school" },
    { label: "Undergraduate", value: "undergraduate" },
    { label: "Postgraduate", value: "postgraduate" },
  ];
  const noOfParagraph = 
    [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "7", value: "7" },
      { label: "8", value: "8" },
      { label: "9", value: "9" },
      { label: "10", value: "10" },
    ]
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Card className="w-full border-none shadow-lg h-full">
          <CardContent className="space-y-6 flex flex-col pt-6 h-full">
            <div>
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Essay Topic</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">What&apos;s your essay about?</p>
            </div>

            <div className="flex-1 flex-grow">
              <TextArea
                length={60}
                name="topic"
                Label=""
                placeHolder='i-e the importance of honey bee'
              />
            </div>

            <SelectDropdown
              label="No of Paragraphs"
              name="no_of_paragraph"
              options={noOfParagraph}
              control={control} 
            />
            <SelectDropdown
              label="Education Level"
              name="education_level"
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
