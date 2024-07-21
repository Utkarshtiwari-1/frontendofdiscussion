import React from 'react'
import logo1 from "../images/logo-color (2).png"

import { useDispatch, useSelector } from 'react-redux'
import { settoken, setuser } from '../slice/authslice';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Profiledown from './Profiledown';

export const Navbar = () => {
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

  return (
    <div className='h-[50px] border-b border-gray-700 fixed top-0 w-full bg-white z-10'>
        <div className='w-9/12 mx-auto flex justify-between'>
            <div>
                <Link to="/">
                  <img src={logo1} className='w-[100px] h-[40px] aspect-auto' alt='logo'></img>
                </Link>
                
            </div>
            <div>
                {
                    !token?(
                        <div className='flex gap-5 items-center pt-2'>
                            <button className='px-2 py-1 border border-gray-600 rounded-md text-black'
                            onClick={()=>navigate("/login")}>Login</button>
                            <button className='px-2 py-1 border border-gray-600 rounded-md text-black'
                            onClick={()=>navigate("/signup")}>Signup</button>
                        </div>
                    ):(<div className='flex gap-5 items-center pt-2'>
                            
                            <div className='text-black'>
                                <Profiledown></Profiledown>
                            </div>
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}
