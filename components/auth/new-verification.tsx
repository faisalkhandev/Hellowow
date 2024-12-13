"use client"

import React, { startTransition, useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import {BeatLoader} from "react-spinners"
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import Link from 'next/link'

const NewEmailVerificationForm = () => {
    const[error,setError]=useState<string | undefined>("");
    const[success,setSuccess]=useState<string | undefined>("");


const searchParams=useSearchParams();
const token=searchParams.get("token")
const onSubmit=useCallback(async()=>{
    if(success || error)return;
    if(!token){
        setError("Missing Token");
        return;
    };
    startTransition(async()=>{
   await  newVerification(token).then((data)=>{
    if(data){
setError(data?.error)
setSuccess(data?.success)
    }
   }).catch(()=>{
    setError("Something went wrong")
   })
  })

},[token,success,error])
useEffect(()=>{
    onSubmit();
},[onSubmit])

  return (
    <div className='py-16'>
       <Card className='w-[500px] m-auto rounded-lg border-none border shadow-2xl'>
      <CardHeader className='flex justify-center w-full items-center '>
       
        <h1 className="font-poppin font-semibold text-3xl  ">🔐 Auth</h1>
        <p className="text-paragraph text-[0.9rem] pt-2 ">Confirming your verification</p>
      </CardHeader>
      <CardContent className='w-full flex items-center justify-center'>
        {
            !success && !error && (
                <BeatLoader/>

            )
        }
      <FormSuccess message={success}/>
{
    !success && (
        <FormError message={error}/>

    )
}
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

export default NewEmailVerificationForm
