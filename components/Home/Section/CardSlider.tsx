import { cardData } from '@/constants/Home/Home'
import { Square, VertivalTriangle } from '@/public/icons/Svgs'
import Image from 'next/image'
import React from 'react'
import CustomCard from '../Card'
import Link from 'next/link'
import Login from '@/components/auth/modal/login'

const CardSlider = () => {
  return (
    <div className="max-container mt-6  ">

      <div className="max-w-full flex gap-4 overflow-y-auto scrollbar-hide relative">
        {cardData.map((card, index) => (
          <Link key={index} href={card.link}>
            <CustomCard key={index} {...card} />
          </Link>
        ))}
      </div>

      <Image src={Square} alt="square_box" className="absolute left-52 mt-2 max-lg:hidden" />
      <Image src={VertivalTriangle} alt="square_box" className="absolute left-10 max-lg:hidden  " />
    </div>
  )
}

export default CardSlider