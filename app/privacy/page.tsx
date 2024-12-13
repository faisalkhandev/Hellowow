import ContactForm from '@/components/common/ContactForm'
import HeaderBar from '@/components/common/HeaderBar'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <HeaderBar
        title="Want NifaWow Updates? No Spam."
        showReadMore={true}
        showSubscribe={false}
      />
<div className=" px-6 lg:px-36 py-14  lg:py-28 space-y-16  overflow-hidden" >
<div className="max-container">
  <div className='text-center'>
  <h1 className='text-heading  font-poppin font-bold text-[2rem] lg:text-[2.5rem]'>Privacy Policy</h1>
  </div>
  <div className="space-y-4 pt-12">
    <h1 className='text-heading  font-poppin font-bold text-[1.3rem] lg:text-[2rem] leading-[55px]'>Privacy Overview</h1>
    <div className='pl-5 space-y-6'>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>1. We take your privacy seriously. Whenever you upload a file to our servers for processing, we delete the file 1-hour after the processing of that file is complete.</p>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>2. If you were to use that same file again in a different tool, that 1-hour window would re-start.</p>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>3. New files created from the originally uploaded file also are subject to the same 1-hour deletion time.</p>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>4. If those files are used again in another tool, the 1-hour deletion window is reset.</p>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>5. The files sent to NifaWow are uploaded via HTTPS.</p>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>6. We do not sell information on our users or the documents, videos, images, or other file types that may be uploaded when using one of our tools.</p>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>7. We do, however, use analytics tools and third-party tracking to enhance the user experience and personalize the ads served to our users. Information on how to opt-out of this tracking is included in the Opting-Out of Tracking. section of this policy.</p>
    </div>
    <h1 className='text-heading  font-poppin font-bold text-[1.3rem] lg:text-[2rem] leading-[55px]'>Geography and You</h1>
    <div className='space-y-6'>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>nifawow.com is hosted on servers in and subject to the laws of the United States of America. Our site complies with all regulatory and privacy requirements in the jurisdictions in which we operate. The Services are operated in the United States and are intended for users located in the United States. The Services are therefore governed by and operated in accordance with the laws of the United States. If you are located outside of the United States, please be aware that information you provide to us or that we obtain as a result of your use of the Services will be collected in the United States and/or transferred to the United States and will be subject to U.S. law.
</p>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>
    By using the Services and/or providing us with information, you (a) consent to the transfer and/or processing of any information to and in the United States, (b) acknowledge that U.S. law may provide a lower standard of protection for information than the laws of your location, (c) understand that we will collect, transfer, store, process and share your information from or about you in accordance with this Notice and US law.</p>
  
    </div>
    <h1 className='text-heading  font-poppin font-bold text-[1.3rem] lg:text-[2rem]  lg:leading-[55px]'>Opting-Out of Tracking</h1>
    <div className='space-y-6'>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>We use services provided by third parties that collect device data and online activity data from individuals who visit our website or use the app to analyze website traffic and facilitate advertising, such as Google and Facebook.
</p>

    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>
    There are a number of ways to opt out, which we have summarized below.</p>
    <div>
    <h1  className='text-heading  font-poppin font-bold text-[1rem] leading-[55px]'>Blocking cookies in your browser.</h1>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    Most browsers let you remove or reject cookies, including cookies used for interest-based advertising. To do this, follow the instructions in your browser settings. Many browsers enable cookies by default until you change your settings. To learn more, visit www.allaboutcookies.org.</p>
    </div>
    <div>
    <h1  className='text-heading  font-poppin font-bold text-[1rem] leading-[55px]'>Blocking advertising ID use in your mobile settings.</h1>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    Your mobile device settings may provide the functionality to limit the use of the advertising ID associated with your mobile device for interest-based advertising purposes.</p>
    </div>
    <div>
    <h1  className='text-heading  font-poppin font-bold text-[1rem] leading-[55px]'>Using privacy plug-ins or browsers.</h1>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    You can block our site from setting cookies used for interest-based ads by using a browser with privacy features, like Brave, or installing browser plugins, like Ghostery, and configuring them to block third-party cookies/trackers.</p>
    </div>
    <div>
    <h1  className='text-heading  font-poppin font-bold text-[1rem] leading-[55px]'>Platform opt-outs.</h1>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    Google, Facebook, LinkedIn, Twitter, Snapchat, and TikTok offer opt-out features that let you opt out of the use of your information for interest-based advertising. We have included the applicable links below to facilitate this election if you choose to do so:</p> 
    <div className="pl-3 space-y-4 pt-6">
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    a. Google: <Link className='text-primary no-underline hover:text-[#0056B3]' href="https://adssettings.google.com"> https://adssettings.google.com</Link></p> 
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    b. Facebook:  <Link className='text-primary no-underline hover:text-[#0056B3]' href="https://www.facebook.com/about/ads">https://www.facebook.com/about/ads</Link></p> 
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    c. LinkedIn:<Link className='text-primary no-underline hover:text-[#0056B3]' href="https://www.linkedin.com/help/linkedin/answer/62931/manage-advertising-preferences?lang=en"> https://www.linkedin.com/help/linkedin/answer/62931/manage-advertising-preferences?lang=en</Link></p>  
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    d. Twitter: <Link className='text-primary no-underline hover:text-[#0056B3]' href="https://business.twitter.com/en/help/ads-policies/product-policies/interest-based-opt-out-policy.html"> https://business.twitter.com/en/help/ads-policies/product-policies/interest-based-opt-out-policy.html</Link></p> 
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    e. Snapchat: <Link className='text-primary no-underline hover:text-[#0056B3]' href="https://support.snapchat.com/en-US/a/advertising-preferences">https://support.snapchat.com/en-US/a/advertising-preferences</Link></p> 
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    f. TikTok <Link className='text-primary no-underline hover:text-[#0056B3]' href="https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/personalization-and-data">https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/personalization-and-data</Link></p> 



    </div>
    <div className="lg:pl-5 pt-10 pb-20  relative  ">
    <div 
    className='absolute w-100 p-0 h-[1200px]  lg:w-[1200px] lg:h-[1200px] left-2 lg:-botton-223 lg:-right-[360px] opacity-[0.2] rounded-full   hidden dark:block'
    style={{
      background: 'radial-gradient(circle, rgba(26, 143, 227, 1) 0%, rgba(26, 143, 227, 1) 0%, rgba(255, 255, 255, 0) 70%)',
    }}
  ></div>
      <div>
<h1  className='text-heading  font-poppin font-bold text-[1.3rem] lg:text-[2rem] lg:leading-[55px] max-lg:pb-3'>Advertising industry opt-out tools.</h1>
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] max-w-[90ch] '>
    You can also use these opt-out options to limit the use of your information for interest-based advertising by participating companies:</p> 
</div>
<div className=" lg:pl-6 space-y-4 pt-6">
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    a. Digital Advertising Alliance: <Link className='text-primary no-underline' href="http://optout.aboutads.info"> http://optout.aboutads.info</Link></p> 
    <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>
    b. Network Advertising Initiative:  <Link className='text-primary no-underline hover:text-[#0056B3]' href="http://optout.networkadvertising.org/?c=1">http://optout.networkadvertising.org/?c=1</Link></p> 
 
    </div>
    

    <div className=' flex-col flex sm:flex-row justify-between items-start pt-16 relative w-full '>

      <div className='space-y-2 '>
        <h1 className='text-heading  font-poppin font-bold text-[2rem] leading-[55px]'>Contact Us</h1>
        <div className='lg:pl-3'>
        <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>NifaWow, LLC</p>
        <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>2206 Spedale Ct Suite 3</p>
        <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>Spring Hill, TN 37174</p>
        <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap leading-[28px] '>Last Revised: March 9, 2023</p>
        </div>
      </div>
      <div className="pt-12 w-full  max-w-[650px]">
     
        <ContactForm/>
      </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</div>
   </div>
   </>
  )
}

export default page