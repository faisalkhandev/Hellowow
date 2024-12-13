import db from "@/lib/db";

export const getVerificationTokenByToken=async(token:string)=>{
    try {
        const verificationToken = db.verificationToken.findUnique({where:{token}})
        return verificationToken;
    } catch (error) {
        
    }
}

export const getVerificationTokenByEmail=async(email:string)=>{
    try {
        const verificationTokendata = db.verificationToken.findFirst({where:{email}})
        console.log("verification",verificationTokendata,email);

        return verificationTokendata;
        
    } catch (error) {
        
    }
}