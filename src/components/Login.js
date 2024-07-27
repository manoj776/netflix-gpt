import React from 'react'
import Header from './Header';
import { useState } from 'react';
import { checkValidData } from "../utils/validate.js";
import { useRef } from 'react';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  const email = useRef(null);
  const password = useRef(null);
 const name=useRef(null);
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value,name.current.value);
    console.log(email.current.value, password.current.value,name.current.value)
    console.log(message)
    setErrorMessage(message);
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>

      <Header />
      <div className='absolute'>

        <img alt="background"
          src='https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_large.jpg' />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 bg-black my-40 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1
          className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm &&

          <input
            type='text'
            ref={name}
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-600' />}

        <input
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-600'
          ref={email} />

        <input
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-600'
          ref={password} />

          <p className='text-red-500 font-bold'>{errorMessage}</p>

        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick} >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className='py-4 cursor-pointer text-decoration-line: underline'
          onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  )
}

export default Login;