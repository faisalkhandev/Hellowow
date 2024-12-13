"use server"
import db from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"


export const newVerification=async(token:string)=>{
const existingToken=await getVerificationTokenByToken(token)
if(!existingToken){
    return{error:"Token Missing"}
}

const hasExpires=new Date(existingToken.expires)<new Date();
if(hasExpires){
    return{error:"Token Expired!"}
}
const existingUser=await getUserByEmail(existingToken.email);
if(!existingUser)return{error:"Email does not exist"}
await db.user.update({
    where:{
        id:existingUser.id
    },
    data:{
        emailVerified:new Date(),
        email:existingUser.email
    }
})


await db.verificationToken.delete({
    where:{
        id:existingToken.id
    }
})

return{success:"Email verified!"}

}

