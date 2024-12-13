import ChatPage from '@/components/Intellihub/AIchat/ChatPage'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
  title: "AI Chat Assistant - NifaWow | Get Instant Answers & Support",
  description: "Chat with our advanced AI-powered assistant on NifaWow. Ask questions, get instant solutions, and receive personalized help anytime. Experience the future of AI-driven support for free.",
  keywords: [
    "AI chat",
    "AI assistant",
    "NifaWow AI",
    "instant answers",
    "AI-powered support",
    "personalized AI help",
    "online AI chat",
    "NifaWow assistant"
  ],
}



const page = () => {
  return (
    <div>
     <ChatPage/> 
    </div>
  )
}

export default page
