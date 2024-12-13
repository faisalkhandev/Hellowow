//By using it even if i use it in client component it will not bundles with client component
"use server"
import { signIn, signOut } from "@/auth";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendEmailVerification } from "@/lib/mail";
import { Default_Login_Redirect } from "@/routes";




export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid Fields" }
    }
    const { email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist" }
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendEmailVerification(verificationToken.email, verificationToken.token);
        return { success: "A confirmation email has already been sent. Please check your inbox or spam folder to complete your registration." };


    }

    try {

        const user = await signIn("credentials", {
            email,
            password,
            redirectTo: Default_Login_Redirect
        })
        if (user) {
            return { success: "Logged In" }
        }
        else {

            return { error: "User not found" }

        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error;
    }

}
export const LogOut = async () => {
    await signOut();
}