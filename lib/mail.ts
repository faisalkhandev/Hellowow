import ResetPassword from "@/components/emails/ResetPassword";
import VerifyAccount from "@/components/emails/VerifyAccount";
import { render } from "@react-email/components";
import {Resend} from "resend";
const resend=new Resend(process.env.RESEND_API_KEY);
export const sendEmailVerification=async(email:string,token:string)=>{
    
const productionLink = `${process.env.PRODUCTION_URL}/auth/new-verification?token=${token}`;
const localLink = `${process.env.DEVELOPMENT_URL}/auth/new-verification?token=${token}`;
const link =
  process.env.NODE_ENV === "development" ? localLink : productionLink;
  const htmlContent = await render(VerifyAccount({ verificationLink: link }));
await resend.emails.send({
    from:"info@nifawow.com",
    to:email,
    subject:"Confirm your email",
    html:htmlContent,
})
}



export const sendResetPasswordRequest=async(email:string,token:string)=>{
    
  const productionLink = `${process.env.PRODUCTION_URL}/auth/reset-password?token=${token}`;
  const localLink = `${process.env.DEVELOPMENT_URL}/auth/reset-password?token=${token}`;
    const link =
      process.env.NODE_ENV === "development" ? localLink : productionLink;
  const htmlContent = await render(ResetPassword({resetLink: link }));

await resend.emails.send({
    from:"info@nifawow.com",
    to:email,
    subject:"Reset your password",
    html:htmlContent,
})
}

