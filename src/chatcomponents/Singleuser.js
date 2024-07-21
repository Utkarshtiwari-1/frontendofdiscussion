import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { sendrequest } from '../service/operations';

export const Singleuser = ({user,request}) => {

    const [requested,setrequested] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    //console.log("request",request);

    async function sendrequesttouser(){

        const result = await sendrequest(user._id,token);
        if(result===null)
        {
            toast.error("something went wrong");
            return;
        }

        setrequested(true);
    }

  return (
    <div key={user._id} className='flex gap-2 bg-blue-300 border border-gray-400 
                    rounded-md pl-2 pr-2 pt-1 pb-1 cursor-pointer mt-1 w-full items-center'>
                        <div>
                            <img src={user.image} className='w-[40px] h-[40px] aspect-square 
                            rounded-full '></img>
                        </div>
                        <div>
                            <p>{user.Name}</p>
                            <p>{user.Questions.length} Disscussions</p>
                        </div>
                        <div>
                            {
                                request.includes(user._id) || requested?<p className='px-1 py-1 bg-orange-300 rounded-md'>Requested</p>:
                                (<button className='px-1 py-1 bg-blue-700 text-white rounded-md'
                                onClick={sendrequesttouser}
                                >Send Request</button>
                                )
                            }
                        </div>
    </div>
  )
}
