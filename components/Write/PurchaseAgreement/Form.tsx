
"use client"; // Ensure this at the top for Next.js client-side hooks

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React, { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import TextEditor from '../TextEditor';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/common/InputField';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'; // Make sure to import these from your component library
import { Calendar } from '@/components/ui/calendar'; // Make sure to import Calendar if you're using a component for date selection
import { FormField, FormItem, FormLabel, FormControl,FormMessage } from '@/components/ui/form'; // Adjust imports as per your component structure
import { format } from 'date-fns';
import { CalendarCheck } from 'lucide-react';
import { generateContent } from '@/actions/write/action';
import DownLoadFile from '../PurchaseAgreement/DownLoadFile';

const schema = z.object({
  dob: z.date({
    required_error: "Date is required, please select.",
  }),
  buyer_first_name: z.string().min(5, {
    message: "Please enter at least 5 characters",
  }),
  seller_first_name: z.string().min(5, {
    message: "Please enter at least 5 characters",
  }),
  item_name: z.string().min(5, {
    message: "Please enter at least 5 characters",
  }),
  purchase_price: z.string().min(2, {
    message: "Please enter at least 2 characters",
  }),
  governing_jurisdiction: z.string().min(2, {
    message: "Please enter at least 2 characters",
  }),
  important_info: z.string().min(5, {
    message: "Please enter at least 5 characters",
  }),
});

type FormFields = z.infer<typeof schema>;

export const Form = () => {
  const[generatedText,setGeneratedText]=useState("");
  const[topic,setTopic]=useState("");

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, formState: { isSubmitting }, control } = methods;

  const contractData = [
    {
      name: "buyer_first_name",
      label: "First Name",
      placeholder: "First & Last name ",
    },
    {
      name: "seller_first_name",
      label: "Seller Info",
      placeholder: "First & Last name ",
    },
    {
      name: "item_name",
      label: "Item Name",
      placeholder: "Description",
    },
    {
      name: "purchase_price",
      label: "Purchase Price",
      placeholder: "$xxx", // Adjust formatting as needed
    },
    {
      name: "dob",
      label: "Date of Birth",
      placeholder: "Pick a date",
    },
    {
      name: "governing_jurisdiction",
      label: "Governing Jurisdiction",
      placeholder: "County/City, State",
    },
    
  ];

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const content = await generateContent("purchase_agreement_generator",{
        buyerName:values.buyer_first_name,
        sellerName:values.seller_first_name,
        itemBeingSold:values.item_name,
        purchasePrice:values.purchase_price,
        deliveryDate:values.dob,
        governingJurisdiction:values.governing_jurisdiction
      });

      setGeneratedText(content); 
      setTopic("Purchase Agrement")
      
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedText("Failed to generate content."); // Handle error case
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
      {
          generatedText?(
            <>
           <div className='grid grid-cols-1 md:grid-cols-[0.6fr_1fr] text-left gap-6 mt-8 w-full min-h-[500px]  '>
            <Card className="w-full shadow-xl border-none  space-y-6 flex-col   max-lg:px-1 pt-5  pb-0 ">
              <div className='px-5'>
              <h1 className="text-[1.2rem] sm:text-[24px] font-[600] font-poppin text-heading dark:text-white">
              Purchase Agreement
              </h1>
              <p className="font-poppin text-paragraph text-[0.9rem] font-[400]">
            
              Paste your info below
              </p>
            </div>
            <CardContent className="w-full  flex flex-col gap-4 overflow-auto max-h-[400px] h-[calc(100%-100px)] invisible-scrollbar">
              <div className="w-full grid grid-cols-1  gap-4">
                {contractData.map((data, index) => (
                  <div key={index} className="w-full">
                    <InputField
                      name={data.name}
                      Label={data.label}
                      placeHolder={data.placeholder}
                    />
                  </div>
                ))}
              </div>
             
  
             
            </CardContent>
            <CardFooter className='bg-white'>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12"
                >
                  {isSubmitting ? 'Generating...' : 'Start Generating'}
                </Button>
                </CardFooter>
          </Card>
               <Card className="w-full border-none shadow-lg   ">
    
               <CardContent className='space-y-1  flex flex-col pt-6 px-4'>
                 <h1 className="text-[1.35rem] font-poppin text-heading font-bold">AI Output</h1>
                 <p className="text-paragraph text-[0.85rem] sm:text-[0.9rem] font-poppin mb-2">Use the generated content as you please</p>
                 <TextEditor generatedText={generatedText} />
               
               </CardContent>
               <CardFooter className="">
                 <DownLoadFile generatedText={generatedText} topic={topic} />
               </CardFooter>
               </Card>
              
               </div>
               </>
          ):(
        <Card className="w-full shadow-xl border-none mt-6 space-y-6 flex-col text-center justify-center items-center max-lg:px-1 min-h-[332px] py-8">
          <div>
            <h1 className="text-[1rem] sm:text-[24px] font-[500] font-poppin text-heading dark:text-white">
            Purchase Agreement
            </h1>
            <p className="font-poppin text-paragraph text-[0.9rem] font-[400]">
              Paste your info below
            </p>
          </div>
          <CardContent className="w-full text-center flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
              {contractData.map((data, index) => (
                <div key={index} className="w-full ">
                  {data.name === "dob" ? (
                    <FormField
                      control={control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start w-full justify-between ">
                          <FormLabel className="text-paragraph font-poppin font-[400] text-[1rem]">{data.label}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className=
                                    "w-full text-left font-normal text-paragraph hover:text-paragraph"
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>{data.placeholder}</span>
                                  )}
                                  <CalendarCheck className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                               
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                         
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <InputField
                      name={data.name}
                      Label={data.label}
                      placeHolder={data.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex-col justify-center items-center space-y-5">
              <InputField
                name="important_info"
                Label="Important Contract Info"
                placeHolder="Enter important contract information"
                width={true}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-sm h-12"
              >
                {isSubmitting ? 'Generating...' : 'Start Generating'}
              </Button>
            </div>
          </CardContent>
        </Card>)}
      </form>
    </FormProvider>
  );
};

