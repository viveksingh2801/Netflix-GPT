import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

const toggleSignInForm = () => {
   setIsSignInForm(!isSignInForm);
}

  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img src='https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_small.jpg' alt='logo1'/>
      </div>
      <form className='w-3/12 absolute p-12 bg-black bg-opacity-90 my-36 mx-auto right-0 left-0 text-white rounded-lg'>
        <h1 className='font-semibold text-3xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
        {!isSignInForm && <input type='text' placeholder='Full Name' className='w-full bg-gray-700 p-3 my-3 rounded-sm'/>}
        <input type='text' placeholder='Email Address' className='w-full bg-gray-700 p-3 my-3 rounded-sm'/>
        <input type='password' placeholder='Password' className='w-full bg-gray-700 p-3 my-3 rounded-sm'/>
        {!isSignInForm && <input type='number' placeholder='Mobile Number' className='w-full bg-gray-700 p-3 my-3 rounded-sm'/>}
        <button className='p-3 my-5 bg-red-700 font-semibold w-full rounded-sm'>{isSignInForm?"Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login


 