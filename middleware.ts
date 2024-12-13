import authConfig from "./auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);
import { AuthRoutes, ApiAuthPrefix, Default_Login_Redirect, publicRoutes } from "./routes";
import { NextResponse } from "next/server";


const publicRoutePrefixes = [
    "/write",
    "/image",
    "/file",
    "/video",
    "/pdf",
    "/tools",
    "/tos",
    "/contact",
    "/privacy",
    "/intellihub",
     "/ads.txt"
];


const isPublicRoute = (path: string) => {
   
    if (publicRoutes.includes(path)) {
        return true;
    }
   
    return publicRoutePrefixes.some(prefix => path.startsWith(prefix));
};

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiRoutes = ApiAuthPrefix.startsWith(nextUrl.pathname);
    const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

  
    if (isApiRoutes) {
        return NextResponse.next();
    }

    
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(Default_Login_Redirect, nextUrl));
        }
        return NextResponse.next();
    }

    
    if (!isLoggedIn && !isPublicRoute(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    
    return NextResponse.next();
});


export const config = {
    matcher: ['/write'], 

};
