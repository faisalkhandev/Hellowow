// An Array of routes that are public don't require authentication

export const publicRoutes=[
    "/",
"/write",
"/image",
"/file",
"/video",
"/pdf",
"/tools",
"/tos",
"/contact",
"/privacy",
"/auth/new-verification",
"/auth/reset-password",
"/auth/forgot-password",
"/your-data",
"/intellihub"

]

//Auth routes
export const AuthRoutes=[
"/auth/login",
"/auth/register",
"/auth/error",
"/auth/resetpassword",
"/auth/forgot-password"
]
export const ApiAuthPrefix="/api/auth"

//Default LoginRedirect

export const Default_Login_Redirect="/"
