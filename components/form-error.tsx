

import { TriangleAlert } from 'lucide-react';
import React from 'react'

interface FormErrorProps{
    message?:string;
}



const FormError = ({message}:FormErrorProps) => {
 if(!message){
    return null;
 }


  return (
    <div className='bg-[#FFCDD2] p-3 flex items-center gap-x-2 text-red-500 rounded-md font-poppin'>
      <TriangleAlert className='w-4 h-4'/>
      <p>{message}</p>
    </div>
  )
}

export default FormError
