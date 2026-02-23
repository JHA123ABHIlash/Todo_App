import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
export default function Signup() {

  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const navigateTo=useNavigate();

  const handleRegister=async(e)=>{
    e.preventDefault();
    
    try{
      const {data}=await axios.post("http://localhost:4002/user/signup",{
        username,email,password
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(data)
      toast.success(data.message || "User registered successfully");
      localStorage.setItem("jwt",data.token);
      navigateTo('/login')
      setUsername("");
      setEmail("");
      setPassword("");
      
    }catch(err){
      console.log(err);
      toast.error(err.response.data.errors || "User registration failed");
      
    }
  }

  return (
    <div>
      <div>
        <div className='flex h-screen item-center justify-center bg-gray-100'>
          <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold md-5 text-center'>Signup</h2>

            <form onSubmit={handleRegister}>
              {/* Username */}

              <div className='mb-4'>
                <label className='block md-2 font-semibold' htmlFor="username">Username </label>
                <input 
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="text" id='username' 
                placeholder='Please Enter Username'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
              </div>

              {/* Email */}

              <div className='mb-4'>
                <label className='block md-2 font-semibold' htmlFor="email">Email</label>
                <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                 type="text" id='email' 
                 placeholder='Please Enter Email'
                 value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 />
              </div>

              {/* Password */}

              <div className='mb-4'>
                <label className='block md-2 font-semibold' htmlFor="password">Password</label>
                <input 
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="password" id='password'
                 placeholder='Please Enter Password'
                 value={password}
                onChange={(e)=>setPassword(e.target.value)}
                 />
              </div>

              <button type='submit' className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3'>Signup</button>
              <p className='mt-4 text-center text-gray-600'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
