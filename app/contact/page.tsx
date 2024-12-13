import React from 'react'
import ballon from '@/public/images/baloon.png'
import Image from 'next/image'
import ContactForm from '@/components/common/ContactForm'
import HeaderBar from '@/components/common/HeaderBar'

const ContactPage = () => {
  return (
    <div className='relative overflow-hidden'>
         <HeaderBar
        title="Want NifaWow Updates? No Spam."
        showReadMore={true}
        showSubscribe={false}
      />
      <div
        className='absolute h-[100vh] w-[100vw]  lg:-bottom-360 lg:-right-560 opacity-[0.2] rounded-full hidden dark:block '
        style={{
          background: 'radial-gradient(circle, rgba(26, 143, 227, 1) 0%, rgba(26, 143, 227, 1) 0%, rgba(255, 255, 255, 0) 70%)',
        }}></div>
      <div className=" padding-x py-14  lg:py-28 h-full relative " >
        <div className="max-container">
          <div className=" flex flex-col sm:flex-row items-center w-full   ">

            <div className='w-full'>
              <h1 className='font-poppin text-[1rem] text-primary font-[600]'>CONTACT US</h1>
              <h1 className='font-poppin text-[1.3rem] lg:text-[2.5rem] text-heading font-bold'>How can we help?</h1>
            </div>
            <p className='text-paragraph font-poppin text-[1rem] font-[400] tracking-wide'>This site is free. We don&apos;t monetize or sell data. Files are deleted 1 hour after creation.</p>
          </div>
          <div className='flex-col flex sm:flex-row justify-between items-center '>

            <div className='h-[500px] w-full relative flex justify-start'>
              <Image src={ballon} alt="baloon" fill priority objectFit='contain' />
            </div>
            <div className='pt-16  w-full '>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ContactPage