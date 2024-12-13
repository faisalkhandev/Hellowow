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
  company_name: z.string().min(5, { message: "Please at least 5 characters" }),
  address: z.string().min(5, { message: "Please at least 5 characters" }),
  website_url: z
  .string()
  .url({ message: "Invalid URL format" })  // built-in URL validation
  .regex(
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    { message: "Invalid URL format" }
  )

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
      const content = await generateContent("privacy_policy_generator",{
        company: values.company_name,
        address:values.address,
        websiteUrl: values.website_url, 
      });

      setGeneratedText(content); 
      setTopic(values.company_name)
      
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
              <h1 className="text-[1.3rem] font-poppin text-heading font-bold">Privacy Policy</h1>
              <p className="text-paragraph text-[0.9rem] font-poppin">Generate privacy policy in a second</p>
            </div>

            <div className="flex-1 h-[100px]">
              <TextArea
                length={150}
                name="company_name"
                Label="Company Name"
                placeHolder=''
              />
            </div>
            <div className="flex-1 ">
              <TextArea
                length={500}
                name="address"
                Label="Address"
                placeHolder=''
              />
            </div>
            <InputField name="website_url" Label="Website URL" />


            <Button type="submit" disabled={isSubmitting} className="w-full">   {isSubmitting ? 'Generating...' : 'Generate'}</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;
