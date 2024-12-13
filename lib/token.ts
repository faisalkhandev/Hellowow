import { getVerificationTokenByEmail } from "@/data/verification-token";
import {v4 as uuid} from "uuid";
import db from "./db";
export const generateVerificationToken=async(email:string)=>{
    const token=uuid();
   const expires= new Date(new Date().getTime()+3600*1000)
   const existingToken =await getVerificationTokenByEmail(email);
console.log("data is in token",token,expires,existingToken)
   if(existingToken){
    await db.verificationToken.delete({
        where:{
            id:existingToken.id
        }
    })
   }
   const verificationToken= await db.verificationToken.create({
    data:{
        token,
        email,
        expires
    }
})
return verificationToken
}
export const generateResetToken=async(email:string)=>{
    const token=uuid();
   const expires= new Date(new Date().getTime()+3600*1000)
  
   const verificationToken= await db.passwordToken.create({
    data:{
        token,
        email,
        expires
    }
})
return verificationToken
}