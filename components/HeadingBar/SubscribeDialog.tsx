
"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

// Define the form schema
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
});

export function SubscribeDialog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data); // Implement your submission logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-2xl text-[0.7rem] border border-white text-white px-2 py-[0.35rem] font-[600]">
          Subscribe
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] py-5  px-4 ">
        <DialogHeader>
          <DialogTitle className="m-auto ">
            <div className="p-5 rounded-full bg-primary">
              <Mail color="white" strokeWidth={2} size={30} />
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-4 space-y-3">
            <h1 className="text-heading text-2xl font-poppin font-[600]">NifaWow Updates</h1>
            <p className="text-paragraph text-[0.9rem] font-poppin font-[400] whitespace-pre-wrap">
              We launch new tools and make product updates weekly. Subscribe and get updated. MAX 1 email a week. No spam, ever.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className={`border h-14 border-[#E3E3E4] text-[0.8rem] font-poppin font-[400] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]  rounded-lg w-full 
                            ${form.formState.errors.email ? 'focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-[#BFDEFF]'}`}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
              
                <DialogFooter className="flex w-full gap-2 items-center">
                  <Button type="button" className="w-full h-12" variant="ghost">Cancel</Button>
                  <Button type="submit" className="w-full h-12">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}