import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import { AutoAdsRefresh } from "@/components/Ads/autoAdsRefresh";
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Script from "next/script";
export const metadata: Metadata = {
  title: "Free AI Writing, PDF, Image, and other Online Tools - NifaWow",
  description: "Free AI Writing, PDF, Image, and other Online Tools - NifaWow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning >
      <head>
        <meta 
          name="google-adsense-platform-account"
          content="ca-pub-3790006470209825"
        />
      </head>
      <body
        className="bg-background text-foreground"
      >
        <SessionProvider>
        <GoogleAnalytics gaId="G-GLDNVWPQ32" />
        <ThemeProvider
          attribute="class"
          defaultTheme="Light"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#177fce" />
          <Navbar />

          <div className="pt-[18] ">{children}</div>
          <Sonner richColors position="top-center" />
          <Toaster />
          <Footer />
        </ThemeProvider>
        <AutoAdsRefresh />
         </SessionProvider>
      
      </body>
    </html>
  );
}