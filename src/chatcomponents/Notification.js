import React, { useState } from 'react'
import { IoIosNotifications } from "react-icons/io";


export const Notification = ({setnotificationmodal}) => {

    
  return (
    <div>
        <button className='flex gap-1 px-2 py-1 bg-blue-300 rounded-md items-center ml-3'
        onClick={()=>setnotificationmodal(true)}>
            <IoIosNotifications></IoIosNotifications>
            <p>Notifications</p>
        </button>
    </div>
  )
}
