import { Card } from '@/components/ui/card';
import React from 'react';
import { DownLoadDialog } from './DownloadDialog';
import Image from 'next/image';

interface DownloadFileProps {
  screenshot?: string | null;
  fileName?:string | null;
}

const DownloadFile: React.FC<DownloadFileProps> = ({ screenshot,fileName }) => {
  // Download handler
  const handleDownload = () => {
    if (screenshot) {
      const link = document.createElement('a');
      link.href = screenshot;
      link.download = fileName??'image.png'; // Specify the filename
      link.click();
    }
  };

  return (
    <Card className='w-full max-w-[940px] shadow-2xl border-none mx-auto min-h-[470px] h-auto'>
      <div className="flex flex-col justify-center items-center space-y-4 h-full py-8 px-4">
        {
          screenshot && (
            <div className="relative w-[350px] aspect-square">
            <Image
              src={screenshot}
              alt="img"
              fill
            />
          </div>
        )}
        <div className='text-center '>
          <h1 className="text-[1rem] sm:text-[1.2rem] font-bold font-poppin text-heading dark:text-white">
            Your image is ready
          </h1>
        </div>
        {/* Pass the download handler to DownLoadDialog if it handles the download */}
        <DownLoadDialog onDownload={handleDownload} />
        <p className='underline cursor-pointer text-paragraph font-poppin' onClick={() => window.location.reload()}>
          Start Over
        </p>
      </div>
    </Card>
  );
};

export default DownloadFile;
