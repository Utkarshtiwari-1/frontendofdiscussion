import React from 'react'
import { Singleuser } from './Singleuser'

export const Userscomponent = ({users,request}) => {
  return (
    <div className='mt-5'>
        {
            users.length===0?(<div className='text-xl text-gray-700'>No Users Found</div>):
            (
                users.map((user)=>(
                    <Singleuser user={user} request={request} key={user?._id} ></Singleuser>
                ))
            )
        }
    </div>
  )
}
