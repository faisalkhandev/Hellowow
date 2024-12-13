import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Link from 'next/link'

const ErrorCard = () => {
  return (
    <div className='py-16'>
    <Card className='w-[500px] m-auto rounded-lg border-none border shadow-2xl'>
   <CardHeader className='flex justify-center w-full items-center '>
    
     <h1 className="font-poppin font-semibold text-3xl  ">🔐 Auth</h1>
     <p className="text-paragraph text-[0.9rem] pt-2 ">Confirming your verification</p>
   </CardHeader>
   <CardContent className='w-full flex items-center justify-center'>
   <p>Oops! Something went wrong!</p>
   </CardContent>
   <CardFooter className='px-4 flex flex-col'>
     <Link href="/auth/login">
     <p className="text-center text-[0.75rem] pt-4 font-poppin text-paragraph">
       Back to login
      
     </p>
     </Link>
   </CardFooter>
 </Card>
 </div>
  )
}

export default ErrorCard
