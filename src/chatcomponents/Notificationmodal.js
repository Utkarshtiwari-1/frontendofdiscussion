import React from 'react'
import { useSelector } from 'react-redux'
import {acceptrequestoperation} from "../service/operations"
import { rejectrequestoperation } from '../service/operations';

export const Notificationmodal = ({notifications,setnotificationmodal,notificationmodal,setrefetch,refetch}) => {
    const {token} = useSelector((state)=>state.auth);

    async function acceptrequest(reqid)
    {
        await acceptrequestoperation(reqid,token,refetch,setrefetch);
    }
    async function rejectrequest(reqid)
    {
        await rejectrequestoperation(reqid,token,refetch,setrefetch);
    }
  return (
    <div className={`fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white transition-opacity duration-00 ease-in-out bg-opacity-10 backdrop-blur-sm ${
        notificationmodal ? 'opacity-100' : 'opacity-0'
      }`}>
        <div  className={`min-w-[500px] border-1 p-3 flex flex-col text-center border-gray-600 rounded-md transition-transform duration-800 ease-in-out transform ${
          notificationmodal ? 'scale-100' : 'scale-80'
        }`}>

                <div className='flex gap-10 justify-between'>
                    <p className='text-lg font-semibold'>User Notifications</p>
                    <div className=' cursor-pointer text-red-800 font-semibold px-1 py-1 rounded-md
                     bg-gray-400' onClick={()=>setnotificationmodal(false)}>Close</div>
                </div>
                <div className='pt-3'>
                    {
                        notifications.length===0?<p>No Notifications</p>:
                        (
                            notifications.map((user)=>(
                                user.status!=="accepeted" &&
                                <div className='w-full bg-blue-300 border-1 border-gray-600 rounded-md
                                flex gap-2 items-center justify-between p-1'>
                                    <div className='flex gap-2 items-center text-md font-semibold'>
                                    <img src={user.sender.image} className='h-[60px] w-[60px] aspect-square
                                    rounded-full'></img>
                                    <p>{user.sender.Name}</p>
                                    </div>
                                    <div className='flex gap-3 pr-2 '>
                                        <button className='px-1 py-1 bg-orange-500 rounded-md'
                                        onClick={()=>acceptrequest(user._id)}>Accept</button>
                                        <button className='px-1 py-1 bg-gray-500 rounded-md'
                                        onClick={()=>rejectrequest(user._id)}>Reject</button>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

        </div>
       
    </div>
  )
}
