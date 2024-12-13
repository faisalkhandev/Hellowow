"use server"

import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { UserSetting } from "@/schemas";
import bcrypt from 'bcryptjs';
import { z } from "zod";


export async function changeUserPassword( values: z.infer<typeof UserSetting>) {
    const validatedFields=UserSetting.safeParse(values)
    if(!validatedFields.success){
        return{error:"Invalid Fields"}
    }
    const{fullName,newPassword,email}=validatedFields.data;
    const existingUser=await getUserByEmail(email)
    if(!existingUser || !existingUser.email){
        return{error:"Email does not exist"}
    }
    try {
      const user = await db.user.findUnique({
        where: { id: existingUser.id },
      });
      if (!user) {
        return { error: 'User not found' };
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedNewPassword,name:fullName }
      });
      return { success: "password updated" };
    } catch (error) {
      console.error('Error in changeUserPassword:', error);
      return { error: 'An error occurred while changing the password' };
    }
  }