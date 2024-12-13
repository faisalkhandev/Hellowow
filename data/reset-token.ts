import db from "@/lib/db";

export const getresetTokenByToken=async(token:string)=>{
    try {
        const verificationToken = db.passwordToken.findUnique({where:{token}})
        return verificationToken;
    } catch (error) {
        
    }
}

export const getresetTokenByEmail=async(email:string)=>{
    try {
        const verificationTokendata = db.passwordToken.findFirst({where:{email}})
        console.log("verification",verificationTokendata,email);

        return verificationTokendata;
        
    } catch (error) {
        
    }
}