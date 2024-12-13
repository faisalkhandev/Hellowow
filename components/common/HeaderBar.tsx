import React from 'react';
import { SubscribeDialog } from '../HeadingBar/SubscribeDialog';
import Link from 'next/link';

interface HeaderBarProps {
  title: string;
  showReadMore?: boolean;
  showSubscribe?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, showReadMore = false, showSubscribe = false }) => {
  return (
    <div className="bg-primary ">
    <div className="max-container">
    <div className="w-full flex justify-center items-center h-12 bg-primary py-3 gap-2">
      <p className="text-white font-[400] font-poppin text-[0.8rem] sm:text-[1rem]">{title}</p>
      {showReadMore && (
        <Link href="/your-data" className="underline text-white font-bold">Read more</Link>
      )}
      {showSubscribe && (
      <SubscribeDialog/>
      )}
    </div>
    </div>
    </div>
  );
};

export default HeaderBar;
