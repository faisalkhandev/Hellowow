import HeaderBar from '@/components/common/HeaderBar'
import React from 'react'

const ReadmorePage = () => {
  return (
    <div>
      <HeaderBar
        title="Want NifaWow Updates? No Spam."
        showReadMore={false}
        showSubscribe={true}
      />
      <div className=" px-6 lg:px-36 py-14  lg:py-28 " >
        <div className="max-container">
          <div className='text-center'>
            <h1 className='text-heading  font-poppin font-bold text-[1.7rem] lg:text-[2.5rem]'>NifaWow & Your Privacy</h1>
          </div>
          <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] py-2 '>Don&apos;t you love finding a great online tool-set that claims to be free, let&apos;s you build and interact the way you want, only to be denied access if you don&apos;t pay for an account(or sign up for an account). Our site is free. We don&apos;t limit. We don&apos;t even take sign-ups. Might we take sign-ups one day? Sure, we probably will(but not any time soon). When we do go down that route, what we will NOT do is trick you into spending your time using our tools, only to be denied access before you can download what you have just spent your precious time creating.</p>

          <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] py-2 '>NifaWow is free. We currently run one ad on each page. This is the only way that the site is monetized. That&apos;s good enough for us for now. Why offer these tools for free? We operate two tech websites: Alphr & TechJunkie. We thought our users might find these tools helpful. For now, utilizing our existing infrastructure we are able to operate these tools at minimal additional cost. Building this and watching the growth has been fun, so we’re going to keep building free stuff.</p>

          <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] py-2'>We take your privacy seriously. Whenever you upload a file to our servers for processing, we delete the file 1 hour after the processing of that file is complete. If you were to use that same file again in a different tool, that 15-minute window would re-start. New files created from the originally uploaded file also are subject to the same 1 hour deletion time. If those files are used again in another tool, the 15-minute deletion window is reset.</p>

          <p className='text-paragraph font-poppin text-[1rem] whitespace-pre-wrap lg:leading-[28px] '>The files sent to NifaWow are uploaded via HTTPS. We do not sell information on our users or the documents, videos, images, or other file types that may be uploaded when using one of our tools.</p>
        </div>
      </div>

    </div>
  )
}

export default ReadmorePage
