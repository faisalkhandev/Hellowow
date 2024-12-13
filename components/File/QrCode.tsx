"use client"
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { QRcodeImage } from '@/public/icons/Svgs'
import Image from 'next/image'
import SocialLinks from './SocialLinks'

const QrCode = () => {
  return (
    <Card className="border-none shadow-lg  w-full max-w-[996px]   ">
 
    <CardContent className="grid lg:grid-cols-[.5fr_1fr] gap-6 pt-4 max-lg:px-2  ">
    <div className='flex flex-col items-center border text-center p-3 lg:p-6 rounded-lg h-[370px] space-y-2'>
<h1 className="text-[1.4rem] font-poppin text-heading font-[600] ">Save To Phone</h1>
<p className="text-[0.75rem] font-poppin text-paragraph font-[400] whitespace-pre-wrap">Use the QR Code and save the processed file to your phone</p>
<div >
    <div className="w-[200px] h-[200px]  relative ">
<Image src={QRcodeImage} alt="Qr_code"  fill objectFit='contain' />
</div>
</div>
    </div>
    <SocialLinks/>
    </CardContent>
   
  </Card>
  )
}

export default QrCode