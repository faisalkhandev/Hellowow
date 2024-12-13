import React from 'react';

const VideoDisplay = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="flex justify-center items-center w-full  mx-auto">
      <video id="video-player" controls className="w-full h-[450px] max-w-full">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoDisplay;