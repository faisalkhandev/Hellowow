
import { Card, CardContent } from '@/components/ui/card'
import QrCode from '@/components/Video/QrCode'
import Form from '@/components/Video/YoutubeTranscript/Form'
import Rating from '@/components/Video/YoutubeTranscript/Rating'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "YouTube to Transcript Converter – Free Transcript Generator | NifaWow",
  description: "Convert YouTube videos to text by simply entering the video link. NifaWow’s free tool quickly generates accurate transcripts online.",
};

const YoutubeTranscript = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-16  space-y-8 padding-x">
        <div className='text-center'>
          <h1 className="text-[1.6rem] sm:text-[40px] font-bold  font-poppin text-heading  dark:text-white ">
            YouTube Transcript Generator</h1>
          <p className='text-paragraph font-poppin  text-[1rem]'>Enter a YouTube video link and receive the transcription</p>
        </div>
        <div className='w-full flex justify-center items-center py-8 '>
          <Form />
        </div>
        <QrCode />
        <p className="py-6 font-poppin text-[0.9rem] text-center  text-primary italic">Uploaded and generated files are deleted 1 hour after upload</p>
        <Card className='border-none shadow-xl '>
          <CardContent className='flex flex-col gap-2 lg:flex-row justify-between items-center lg:px-3 py-6 lg:py-4 '>
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
  )
}

export default YoutubeTranscript