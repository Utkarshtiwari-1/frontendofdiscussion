import React, { useState } from 'react'
import { signup } from '../service/operations';
import { useNavigate } from 'react-router-dom';


export const Signuppage = () => {

    const [formdata,setformdata] = useState({
        Name:"",
        Email:"",
        password:"",
        college:"",
        
    });

    const navigate = useNavigate();

    function changehandler(event){
        setformdata({
            ...formdata,
            [event.target.name]:event.target.value,
        });

        console.log("formdata",formdata);
    }

    async function submithandler(event)
    {
        event.preventDefault();
        await signup(formdata,navigate);

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign Up</h2>
      <form onSubmit={submithandler}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" name='Name' value={formdata.Name} onChange={changehandler} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name='Email' value={formdata.Email} onChange={changehandler} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" name='password' value={formdata.password} onChange={changehandler} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700">College</label>
          <input type="text" name='college' value={formdata.college} onChange={changehandler} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Harvard University" />
        </div>
        <button type='submit' className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Sign Up</button>
      </form>
      <p className="mt-4 text-gray-700">Already have an account? <a href="/login" className="text-indigo-500">Login</a></p>
    </div>
  </div>
  )
}
