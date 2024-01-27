'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '../_components/Logo'
import LoginForm from './_components/LoginForm'
import Image from 'next/image'
import login from '@/public/assets/login.png'
import LoginSubmitted from './_components/LoginSubmitted'

const Login = () => {
const [submitted, setSubmitted] = useState("")

  return (
    <div className="grid-halves h-screen">
      <div className="border-right bg-offwhite">
        <div className="column-padding">
        <div className="tablet-centered">
          <Link href={'/'} className='logo-container'>
            <Logo style={{width:150}} />
          </Link>
          {submitted? <LoginSubmitted submitted={submitted} />: <LoginForm setSubmitted={setSubmitted} />}
          </div>
        </div>
      </div>
      <div className="bg-navy border-right">
        <Image src={login} alt="login" className='callout-image' />
      </div>
    </div>
  )
}

export default Login