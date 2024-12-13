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
  topic: z.string().min(5, { message: "Topic must be at least 5 characters" }).optional(),
  question: z.string().min(5, { message: "Question must be at least 5 characters" }).optional(),
  isquestion: z.string(),
  no_of_answers: z.string(),
}).refine(data => {
  if (data.isquestion === 'Yes') {
    return data.question && data.question.length >= 5; // Validate question if isquestion is 'Yes'
  }
  return data.topic && data.topic.length >= 5; // Validate topic if isquestion is 'No'
}, {
  message: "Either topic or question must be provided based on the selection.",
  path: ["question"], // You can specify which field to highlight for the error
});

type FormFields = z.infer<typeof schema>;

interface EssayFormProps {
  setGeneratedText: React.Dispatch<React.SetStateAction<string | null>>;
  setTopic: React.Dispatch<React.SetStateAction<string | null>>;
}

const Form: React.FC<EssayFormProps> = ({ setGeneratedText, setTopic }) => {
  const methods = useForm<FormFields>({
    defaultValues: {
      isquestion: 'No',
      no_of_answers: '4',
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { isSubmitting }, watch } = methods;
  const isQuestionProvided = watch("isquestion");

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    
    try {
      const content = await generateContent("poll_generator", {
        topic: values.topic,
        pollQuestion: values.question,
        no_of_answers: values.no_of_answers,
        isquestionprovided: values.isquestion
      });

      setGeneratedText(content);
      setTopic("poll-generator");

    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedText("Failed to generate content."); // Handle error case
    }
  };

  const noOfQuestions = [
    { label: "No", value: "No" },
    { label: "Yes", value: "Yes" },
  ];
  
  const ProvideAnswer = [
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Card className="w-full border-none shadow-lg h-full">
          <CardContent className="space-y-6 flex flex-col pt-6 h-full">
            {isQuestionProvided === 'No' ? (
              <>
                <div>
                  <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Enter a Topic</h1>
                  <p className="text-paragraph text-[0.9rem] font-poppin">We’ll Provide a Question</p>
                </div>
                <div className="flex-1 flex-grow">
                  <TextArea
                    length={60}
                    name="topic"
                    Label=""
                    placeHolder=''
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Poll Question</h1>
                  <p className="text-paragraph text-[0.9rem] font-poppin">Provide a Question</p>
                </div>
                <div className="flex-1 flex-grow">
                  <TextArea
                    length={60}
                    name="question"
                    Label=""
                    placeHolder=''
                  />
                </div>
              </>
            )}

            <SelectDropdown
              label="Will you provide the poll question?"
              name="isquestion"
              options={noOfQuestions}
              control={control}
            />
            <SelectDropdown
              label="No of Answers"
              name="no_of_answers"
              options={ProvideAnswer}
              control={control}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Generating...' : 'Generate'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;