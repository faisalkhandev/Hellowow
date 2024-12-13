import { Metadata } from 'next';
import Form from '@/components/Image/AIImageGenerated/Form';


export const metadata: Metadata = {
    title: "AI Image - NifaWow",
    description: "Use NifaWow's free AI Image tools to easily edit, annotate, and modify your Images. No sign-up required, fast and secure!",
};


const AIImageGenerator = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center md:py-36 py-14 space-y-8 padding-x">
            <div className='text-center space-y-4'>
                <h1 className="text-[1.6rem] sm:text-[56px] font-bold font-poppin text-heading  dark:text-white">AI Image Generator</h1>
                <p className='text-paragraph font-poppin  text-[1rem]'>Generate AI images with a single click</p>
            </div>
          <Form/>
            
        </div >
    )
}

export default AIImageGenerator
