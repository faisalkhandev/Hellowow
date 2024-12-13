import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

type User = {
  id: string;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  name:string | null;
};

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET_KEY,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          
            return null; }
          const { email, password } = validatedFields.data;
          const user: User | null = await getUserByEmail(email); 
          if (!user || !user.password) {
            return null;
          } 

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return null; 
            }
            return user;
        }
       
    }),
  ],
} satisfies NextAuthConfig;