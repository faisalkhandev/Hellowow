import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Support = () => {
  return (
    <section className="max-container ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-[500px]">
         <div className="flex flex-col justify-center items-start gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold font-poppin">Support NifaWow</h1>
          <p className="max-w-[45ch] text-white font-poppin font-[400] text-[0.9rem] sm:text-[1rem]">NifaWow is 100% free to use (even OCR), with no pesky registration required. For our most loyal supporters, a $5.99/month plan unlocks an ad and captcha free experience.</p>
<Button variant="secondary" size="lg">Support Us</Button>
         </div>
         <div className="relative h-full w-full md:w-[50%] ">
         <Image src="/images/Home/support.webp" alt="support_logo" fill className='object-contain'/>
         </div>
        </div>
      </section>
  )
}

export default Support