import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Myaccount = () => {
    const router = useRouter()
    useEffect(() => {
        if(!localStorage.getItem("token")){
          router.push("/")
        }
        }, [])
    useEffect(() => {
        if(!localStorage.getItem("token")){
          router.push("/")
        }
        }, [router.query])
    
  return (
    <div>my Account</div>
  )
}

export default Myaccount