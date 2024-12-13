"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { changeUserPassword } from "@/actions/user";
import FormSuccess from "../form-success";
import FormError from "../form-error";
import { UserSetting } from "@/schemas";
import { Card } from "../ui/card";

interface User {
  userId: string;
  name: string | null;
  email: string | null;
}

const AccountSettingForm = ({ user }: { user: User }) => {
  const [errorState, setErrorState] = useState<string | undefined>("");
  const [successState, setSuccessState] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof UserSetting>>({
    resolver: zodResolver(UserSetting),
    defaultValues: {
      fullName: user.name!,
      email: user.email!,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserSetting>) {
    try {
      const result = await changeUserPassword(values);
      if (result?.error) {
        setErrorState(result?.error);
        return null;
      }
      setSuccessState(result.success);
      form.reset({
        fullName: values.fullName,
        email: values.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      signOut({
        callbackUrl: `${window.location.origin}/auth/login`,
        redirect: true,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <div className="w-full py-20">
      <div className="text-center">
        <h1 className="font-semibold text-[32px] text-heading font-poppin">
          Edit Profile
        </h1>
        <p className="font-normal text-base text-paragraph">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="w-full max-w-[1000px] m-auto py-8 px-4">
        <Card className="shadow-2xl px-4 md:px-16 py-10 rounded-xl w-full max-w-screen-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full text-heading space-y-6 font-poppin"
            >
              {/** Full Name Field */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="md:w-1/3">
                      <FormLabel className="text-lg font-medium text-heading leading-8">
                        Full Name
                      </FormLabel>
                    </div>
                    <div className="md:w-2/3">
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className={`border border-[#E3E3E4] text-[0.95rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
                            ${form.formState.errors.fullName ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-lg w-full`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </div>
                  </FormItem>
                )}
              />

              {/** Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="md:w-1/3">
                      <FormLabel className="text-lg font-medium text-heading leading-8">
                        Email Address
                      </FormLabel>
                    </div>
                    <div className="md:w-2/3 space-y-2">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          disabled
                          {...field}
                          className={`border border-[#E3E3E4] text-[0.95rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
                            ${form.formState.errors.email ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-lg w-full`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </div>
                  </FormItem>
                )}
              />

              {/** Current Password Field */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="md:w-1/3">
                      <FormLabel className="text-lg font-medium text-heading leading-8">
                        Current Password
                      </FormLabel>
                    </div>
                    <div className="md:w-2/3">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                          className={`border border-[#E3E3E4] text-[0.95rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
                            ${form.formState.errors.currentPassword ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-lg w-full`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </div>
                  </FormItem>
                )}
              />

              {/** New Password Field */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="md:w-1/3">
                      <FormLabel className="text-lg font-medium text-heading leading-8">
                        New Password
                      </FormLabel>
                    </div>
                    <div className="md:w-2/3">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                          className={`border border-[#E3E3E4] text-[0.95rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
                            ${form.formState.errors.newPassword ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-lg w-full`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </div>
                  </FormItem>
                )}
              />

              {/** Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="md:w-1/3">
                      <FormLabel className="text-lg font-medium text-[#0F172A] leading-8">
                        Confirm Password
                      </FormLabel>
                    </div>
                    <div className="md:w-2/3">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                          className={`border border-[#E3E3E4] text-[0.95rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
                            ${form.formState.errors.confirmPassword ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-lg w-full`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </div>
                  </FormItem>
                )}
              />

              {/** Submit Button */}
              <div className="flex items-center justify-end w-full mt-8">
                <Button
                  className="w-full md:w-auto px-10 py-2"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center gap-2">
                      Submitting
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </div>

              {/** Error Message */}
              {errorState && <FormError message={errorState} />}
              
              {/** Success Message */}
              {successState && <FormSuccess message={successState} />}
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettingForm;
