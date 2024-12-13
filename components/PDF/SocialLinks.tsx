import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { socialMediaIcons } from '@/constants/Write/WriteTools'

const SocialLinks = () => {
  return (
    <div className="flex flex-col space-y-4 w-full ">
      <div className=" p-2 lg:p-6  bg-[#F6F6F6]  dark:bg-[#223544] space-y-2 rounded-lg border">

        <h1 className="text-[1.4rem] font-poppin text-heading font-[600] ">Want NifaWow Updates?</h1>
        <p className="text-[0.9rem] font-poppin text-paragraph font-[400] max-w-[40ch]">Receive product updates. MAX 1 email a week. No spam, ever</p>
          <form className='w-full flex flex-col lg:flex-row  gap-4'>
          <Input
            type="text"
            className="h-11 bg-[#FFFFFF] dark:bg-input  text-[0.8rem] text-gray-400 dark:text-white   border border-grey py-4
             focus:border-4 focus:border-[#BFDEFF] focus:outline-none rounded-lg"
          />
          <Button type="submit" size="lg" className="font-[600] rounded-lg  font-poppin ">
            Subscribe
          </Button>
          </form>
      </div>
      <div className="p-3 lg:p-6   rounded-lg border space-y-1">

        <h1 className="text-[1.4rem] font-poppin text-heading font-[600] ">Please Share NifaWow</h1>
        <p className="text-[0.9rem] font-poppin text-paragraph font-[400] max-w-[40ch]">We&apos;re free. Consider sharing as payment 😀</p>

        <div className="w-full flex gap-4 lg:gap-8 pt-2 ">
          {socialMediaIcons.map((social,index) => (
            <div className="h-11 w-11 flex justify-center  flex-wrap items-center rounded-full border" key={index}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <Image src={social.icon} alt={social.name}  />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SocialLinks