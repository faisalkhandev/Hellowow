import MosqueFinder from '@/components/Intellihub/FindMosque/FindMosque'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Mosque Information & Prayer Times - NifaWow",
    description: "Get accurate mosque information and prayer times for your location. Find nearby mosques, prayer timings, and stay updated on community services.",
    keywords: [
      "mosque information",
      "prayer times",
      "mosques near me",
      "Islamic prayer timings",
      "local mosque details",
      "masjid timings",
      "NifaWow mosque info",
      "daily prayer schedule"
    ],
}


const page = () => {
  return (
    <div>
      <MosqueFinder/>
    </div>
  )
}

export default page
