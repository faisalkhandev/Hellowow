import QuranPage from '@/components/Intellihub/ListenQuran/listenQuran'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: "Quran Surahs, Translations & Recitations - NifaWow",
    description: "Access the complete Quran with translations and recitations. Explore surahs, listen to recitations, and understand the meanings of each verse with NifaWow.",
    keywords: [
      "Quran online",
      "Quran surahs",
      "Quran recitations",
      "Quran translation",
      "Islamic resources",
      "listen to Quran",
      "Quran with English translation",
      "learn Quran online",
      "NifaWow Quran resources"
    ],
}
const page = () => {
  return (
    <div>
      <QuranPage/>
    </div>
  )
}

export default page
