import NextAuth,{DefaultSession} from "next-auth"
import authConfig from "./auth.config" 
import {PrismaAdapter} from "@auth/prisma-adapter"
import db from "./lib/db"
import {getUserById } from "./data/user"

declare module "next-auth" { 

  interface Session{
    user:{
role:"ADMIN" | "USER"
    } & DefaultSession["user"]
  }
}


// import { getUserById } from "./data/user"
export const { auth, handlers:{GET,POST},signIn,signOut } = NextAuth({
    pages:{
        signIn:"/auth/login",
        error:"/auth/error"
    },
    events:{
        async linkAccount({user}){
            await db.user.update({
                where:{
                    id:user.id
                },
                data:{emailVerified:new Date()}
            })
        }
    },

    adapter: PrismaAdapter(db),  
    session: { strategy: "jwt" },
    trustHost: true,
    ...authConfig,
    callbacks: {
        async signIn({user,account}){
            if(account?.provider !== "credentials")return true;
            const existingUser =await getUserById(user.id!);
            if(!existingUser?.emailVerified)return false;
            return true;
           

        },
        async jwt({ token }) {
          try {
            if(!token.sub) return token;
          const existingUser=  await getUserById(token.sub)
          if(!existingUser) return token;
          token.role=existingUser.role;
            return token;
          } catch (error) {
            console.error("Error in jwt callback:", error);
            return token;
          }
        },
        async session({ session, token }) {
          if (token.role && session.user) {
            session.user.role = token.role as "ADMIN" | "USER";
          }
          return session;
        },
      },
})