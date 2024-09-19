"use client"
import { useRouter } from 'next/router';
import React from 'react'
import Home from './home/Home'
import Header from './components/header/Header'
export default function page() {
  return (
    <div>
<Header useRouter={useRouter}/>
     <Home/>
    </div>
  )
}
