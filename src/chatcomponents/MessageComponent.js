import React from 'react'

export default function MessageComponent({user,message}) {
   
   //console.log("sender namw",message);
  return (
    <div className={`flex ${message.sender._id.toString()===user._id.toString()?" justify-start":
        " justify-end"}  px-1 py-1  rounded-md mt-1 `}>
        <div className='bg-blue-300 px-2 py-1 rounded-md min-w-[80px]'>
        <p className='text-xs text-gray-600'>{
            message.sender._id.toString()===user._id.toString()?`${user.Name}`:`${message.sender.Name}`
          }</p>
          <p className='text-md'>{message.content}</p>
          
        </div>
    </div>
  )
}
