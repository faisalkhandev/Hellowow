

import React from 'react';
import Image from 'next/image';
import { auth } from '@/auth';

const UserAvatar=async() => {

    const session = await auth(); 

 

    if (!session) {
      return <div>Please log in to view your profile.</div>;
    }
    const{user}=session;
  const image = user?.image || null; 
  const email = user?.email || "";
  const firstLetter = email.charAt(0).toUpperCase(); 

  return (
    <div className=" w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center">
  {image ? (
    <Image 
      src={image} 
      alt="User Avatar" 
      width={40} 
      height={40} 
      className="w-full h-full rounded-full" 
    />
  ) : (
    <span className=" text-gray-700 py-2">{firstLetter || "?"}</span> 
  )}
</div>
  );
};

export default UserAvatar;