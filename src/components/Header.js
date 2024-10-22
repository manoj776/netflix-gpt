import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
const Header = () => {
  const navigate = useNavigate();
 const user= useSelector((store)=>store.user)
const handleSignOut =()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate("/")
  }).catch((error) => {
    // An error happened.
    navigate("/error")
  });
}

  return (
    <div className='absolute px-2 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
        <img className="w-44" alt="netflix-logo" src='https://loodibee.com/wp-content/uploads/Netflix-logo.png'/>
      {user && (<div className='flex p-2'>
        <img className="w-12 h-12" alt="UserIcon" src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'/>
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>      
       </div>
       )}
    </div>
      

  )
}

export default Header