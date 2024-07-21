import React from 'react'
import { MdGroups } from "react-icons/md";


export const Makegroup = ({setmakegroupmodal}) => {
  return (
    <div>
        <button className='flex gap-1 px-2 py-1 bg-blue-300 rounded-md items-center ml-3'
        onClick={()=>setmakegroupmodal(true)}>
            <MdGroups></MdGroups>
            <p>Create Group</p>
        </button>
    </div>
  )
}
