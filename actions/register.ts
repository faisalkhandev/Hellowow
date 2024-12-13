 //By using it even if i use it in client component it will not bundles with client component
"use server"
import db from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendEmailVerification } from "@/lib/mail";





export const register=async(values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields=RegisterSchema.safeParse(values)
if(!validatedFields.success){
    return{error:"Invalid Fields"}
}

const {email,password,name} =validatedFields.data;
const hashedPassword=await bcrypt.hash(password,10)

const existingUser = await getUserByEmail(email);
if(existingUser){
    return{error:'Email already exist'};
}

await db.user.create({
    data:{
        email,
        password:hashedPassword,
        name:name,
    }
})

const verificationToken=await generateVerificationToken(email)
await sendEmailVerification(verificationToken.email,verificationToken.token);
   return{success:"Confirmation email sent!"}
}
