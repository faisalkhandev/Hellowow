"use client"

import { StarIcon } from '@/public/icons/Svgs'
import React from 'react'

const Rating = () => {
  return (
    <div className='flex gap-1 text-[0.8rem]'>
        <StarIcon/>
        <StarIcon/>
        <StarIcon/>
        <StarIcon/>
        <StarIcon/>
        </div>
  )
}

export default Rating