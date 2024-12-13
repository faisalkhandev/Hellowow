"use client"
import { ChevronsRightLeft } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const BeforeAfterSlider = () => {
  const [percentage, setPercentage] = useState(50); // Initial slider position at 50%
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    isDragging.current = true;
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e:PointerEvent) => {
    if (!isDragging.current) return;
    const container = sliderContainerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newPercentage = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);
      setPercentage(newPercentage);
      console.log('Function called: Handle moved');
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <>
      <div className='text-center space-y-4 pt-8 md:pt-16'>
        <p className='text-md text-primary font-poppin font-[600]'>BEFORE & AFTER</p>
        <h1 className='text-3xl text-heading font-poppin font-[600]'>NifaWow Background Remover</h1>
        <p className='text-paragraph font-[400] font-poppin'>Check it. Pretty Cool Eh?</p>
      </div>
      <div
        className='max-w-[806px] mx-auto relative h-[538px] select-none'
        ref={sliderContainerRef}
        style={{ cursor: 'pointer' }}
      >
        {/* After Image */}
        <picture>
          <source srcSet="https://tinywow.com/v2/img/before-after/after.webp" type="image/webp" />
          <source srcSet="https://tinywow.com/v2/img/before-after/after.png" type="image/png" />
          <img
            alt="After"
            className="w-full h-auto transition-opacity duration-300 z-50"
            loading="lazy"
            src="https://tinywow.com/v2/img/before-after/after.png"
          />
        </picture>
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), 
                              linear-gradient(-45deg, #808080 25%, transparent 25%), 
                              linear-gradient(45deg, transparent 75%, #808080 75%), 
                              linear-gradient(-45deg, transparent 75%, #808080 75%)`,
            backgroundSize: '20px 20px',
            opacity: 0.5, // Adjust opacity as needed
          }}
        ></div>

        {/* Before Image */}
        <div
          className='absolute top-0 left-0 h-full overflow-hidden'
          style={{ width: `${percentage}%` }}
        >
          <Image
            alt="Before"
            style={{
              width: '806px', // Fixed width
              height: 'auto', // Maintain aspect ratio
              minWidth: '806px'
            }}
            loading="lazy"
            width={806}
            height={538} // Adjusted to maintain aspect ratio
            src="https://tinywow.com/v2/img/before-after/before.jpg"
          />
        </div>

        {/* Handle */}
        <div
          onPointerDown={handlePointerDown}
          className="absolute z-50 bg-white top-0 h-full flex justify-center items-center"
          style={{
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
            width: '2px',
          }}
        >
          <div className='z-50 absolute bg-white rounded-full p-4'>
            <ChevronsRightLeft size={24} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforeAfterSlider;