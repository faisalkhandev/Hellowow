"use server"

import { getresetTokenByEmail, getresetTokenByToken } from "@/data/reset-token";
import { getUserByEmail } from "@/data/user"
import db from "@/lib/db";
import { sendResetPasswordRequest } from "@/lib/mail";
import { generateResetToken } from "@/lib/token";
import { NewPasswordSchema, ResetSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from 'bcryptjs'

export const resetPassword=async(values:z.infer<typeof ResetSchema>)=>{
    const validatedfields=ResetSchema.safeParse(values);
    if(!validatedfields.success){
        return{error:"Invalid Email"}
    }
    const{email}=validatedfields.data;

  const existingUser=  await getUserByEmail(email);
  if(!existingUser || !existingUser.email ||!existingUser.password){
    return{error:"Email does not exist"}
}
try {
    const existingToken=await generateResetToken(existingUser.email);
    if(!existingToken)return;
 await sendResetPasswordRequest(existingToken.email,existingToken.token)
    return{success:'We have emailed your password reset link!'}
} catch (error) {
    return{error:"Somrthing went wrong"}
}
 
  
}

export const newPassword=async(token:string,values:z.infer<typeof NewPasswordSchema>)=>{
    const validatedfields=NewPasswordSchema.safeParse(values);
    if(!validatedfields.success){
        return{error:"Invalid Email"}
    }
    const{password}=validatedfields.data;
    const existingToken=await getresetTokenByToken(token)
    if(!existingToken){
        return{error:"Token Missing"}
    }
    
    const hasExpires=new Date(existingToken.expires)<new Date();
    if(hasExpires){
        return{error:"Token Expired!"}
    }
    const existingUser=await getUserByEmail(existingToken.email);
    if(!existingUser)return{error:"Email does not exist"}
    const hashedPassword=await bcrypt.hash(password,10)

    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            password:hashedPassword
        }
    })
    
     await db.passwordToken.delete({
         where:{
             id:existingToken.id
         }
     })
    
    
    
    return{success:"Password Reset"}
    
    }