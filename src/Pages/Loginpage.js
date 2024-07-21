import React, { useState } from 'react'
import { login } from '../service/operations'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const Loginpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata,setformdata] = useState({
    Email:"",
    password:""
  })

  function changehandler(e){
    setformdata({
      ...formdata,
      [e.target.name]:e.target.value
    })
  }

  async function submithandler(e)
  {
      e.preventDefault();
      await login(formdata,navigate,dispatch);
      console.log("chattoken",localStorage.getItem("chattoken"));
     console.log("chatuser",localStorage.getItem("chatuser"));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
      <form onSubmit={submithandler}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name='Email' value={formdata.Email} onChange={changehandler} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" name='password' value={formdata.password} onChange={changehandler} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type='submit' className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
      </form>
      <p className="mt-4 text-gray-700">Don't have an account? <a href="/signup" className="text-indigo-500">Sign up</a></p>
    </div>
  </div>
  )
}
