

// import { CheckCircleIcon } from 'lucide-react';
import React from 'react'

interface FormSuccessProps{
    message?:string;
}



const FormSuccess = ({message}:FormSuccessProps) => {
 if(!message){
    return null;
 }


  return (
    <div className='bg-emerald-500/15  p-3 flex items-center gap-x-2 text-emerald-500 rounded-md font-poppin'>
      {/* <CheckCircleIcon className='w-8 h-8'/> */}
      <p>{message}</p>
    </div>
  )
}

export default FormSuccess
