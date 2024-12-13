import StepperPage from '@/components/common/Stepper';
import { Card, CardContent } from '@/components/ui/card';
import Rating from '@/components/Video/CompressVideo/Rating';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
    title: "Compress MKV Video File Size Online – Free Tool by NifaWow",
    description: "Reduce MKV video file sizes online for free with NifaWow’s easy-to-use video compression tool. Save storage without compromising quality.",
};
const FormFile = dynamic(() => import('@/components/Video/CompressMKV/Form'), { ssr: false })

const CompressMkv = () => {
    const stepsData = [
        {
            title: "Step 1",
            description: "Select a video that has an oversized file size",
        },
        {
            title: "Step 2",
            description: "Upload the video to our servers",
        },
        {
            title: "Step 3",
            description: "Download the compressed video",
        }
    ];
    const heading = "How To Compress a Video File";
    return (
        <div className="w-full py-16  space-y-8 padding-x">
            <div className='max-container'>
                <div className='text-center'>
                    <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
                        Compress MKV File Size</h1>
                    <p className='text-paragraph font-poppin  text-[1rem]'>Lessen the file size of a Video file</p>
                </div>
                <div className=' mt-8 w-full  md:px-28'>
                    <FormFile />
                </div>
                <p className="py-6 font-poppin text-[0.9rem] text-center  text-primary italic">Uploaded and generated files are deleted 1 hour after upload</p>
                <div className='flex justify-center items-center w-full'>
                    <Card className='border-none shadow-xl max-w-md '>
                        <CardContent className='flex flex-col gap-2 lg:flex-row justify-between items-center lg:px-3 py-2 lg:py-4 '>
                            <p className="font-poppin text-[1rem] text-paragraph font-[600]">Help Us Improve</p>
                            <div className="flex items-center gap-2 pl-11">
                                <Rating />
                                <div className='flex text-primary border-l pl-2'>4.8 <span className="text-paragraph">(4708)</span></div>
                            </div>
                            <div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className='pt-11'>
                    <StepperPage heading={heading} stepsData={stepsData} />;
                </div>
            </div>
        </div>
    )
}

export default CompressMkv
