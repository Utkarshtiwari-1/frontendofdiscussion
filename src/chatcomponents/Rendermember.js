import React from 'react'

export const Rendermember = ({member,setmembers,members}) => {
  return (
    <div className='flex gap-2 bg-blue-300 border border-gray-400 
        rounded-md pl-2 pr-2 pt-1 pb-1 cursor-pointer mt-1  max-w-max items-center'>
        <div>
            <img src={member.image} alt={`Profile of ${member.Name}`} className='w-[40px] h-[40px] aspect-square 
            rounded-full ' />
        </div>
        <div>
            <p>{member.Name}</p>
            <p>{member.Questions.length} Disscussions</p>
        </div>
        <div>
            <button className='px-1 py-1 bg-gray-600 text-white rounded-md'
            onClick={()=>setmembers(members.filter((obj)=>obj._id!==member._id))}>Remove</button>
        </div>

    </div>
  )
}
