import { z } from "zod";






export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email." }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
  });
  export const RegisterSchema = z.object({
    name:z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email({ message: "Invalid email." }),
    password: z.string().min(8, {
      message: "Password must be atleast 8 characters",
    }),
  });

  export const ResetSchema = z.object({
    email: z.string().email({ message: "Invalid email." }),
  });

  export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
      message: "Password must be atleast 8 characters",
    }),
  });

  export const UserSetting = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters."),
    newPassword: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters."),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword !== data.currentPassword;
      }
      return true;
    },
    {
      message: "New password must be different from the current password",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );