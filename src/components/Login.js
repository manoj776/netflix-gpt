import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from "../utils/validate.js";
import { auth } from '../utils/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';

const Login = () => {
  // State variables for toggling between sign-in and sign-up and for error messages
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
const navigate = useNavigate()
  // Refs for form fields
  const dispatch=useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  // Handle button click for sign in / sign up
  const handleButtonClick = () => {
    const nameValue = isSignInForm ? '' : name.current?.value || ''; // Only access name when signing up

    // Validate form data
    const message = checkValidData(email.current?.value, password.current?.value, nameValue);
    if (message) {
      setErrorMessage(message); // Display validation error message
      return;
    }

    // Proceed with authentication
    if (!isSignInForm) {
      // Sign-up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user;
          updateProfile(auth.user, {
            displayName: nameValue, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            // Profile updated!
            // ...
            const { uid, email, displayName,photoURL } = auth.currentUser;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL:photoURL }))
            navigate("/browse")
          }).catch((error) => {
            // An error occurred
            // ...
          });
          console.log('Signed up user:', user);
          navigate("/browse") // Clear any previous error message
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`); // Display error message
        });
    } else {
      // Sign-in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;
          console.log("Signed in user:", user);
          navigate("/browse") // Clear any previous error message
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`); // Display error message
        });
    }
  };

  // Toggle between sign-in and sign-up forms
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Clear error message when switching forms
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          alt="background"
          src='https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_large.jpg'
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent default form submission
        className='w-3/12 absolute p-12 bg-black my-40 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
      >
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Conditionally render the full name field for sign-up */}
        {!isSignInForm && (
          <input
            type='text'
            ref={name}
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-600'
          />
        )}

        <input
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-600'
          ref={email}
        />

        <input
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-600'
          ref={password}
        />

        {errorMessage && <p className='text-red-500 font-bold'>{errorMessage}</p>}

        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className='py-4 cursor-pointer text-decoration-line: underline'
          onClick={toggleSignInForm}
        >
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
