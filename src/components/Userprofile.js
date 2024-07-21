import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserProfile } from '../service/operations';
import { CiEdit } from "react-icons/ci";
import { SetImageModal } from './setImageModal';



export default function Userprofile() {

  const {token} = useSelector((state)=>state.auth)
  const [userdata,setuserdata] = useState(null);
  const [loading,setloading] = useState(false);
  const [imagemodal,setimagemodal] = useState(false);
  const [refetch,setrefetch] = useState(false);

  useEffect(()=>{

  async function getuser()
  {
    setloading(true);
    const result = await getUserProfile(token);
    console.log("result",result);
    if(!result)
    {
      setloading(false);
      return;
    }
    setuserdata(result);
    setloading(false);
  }

  getuser();
  
  

  },[refetch])


  return (
    <div className=' relative bg-blue-50 min-h-[100vh] w-full h-full'>
        <div className='w-10/12 bg-blue-100 border-l border-r min-h-[100vh] mx-auto pt-14  border-gray-400'>
        {
          loading?(<div className='flex h-full w-full justify-center items-center pt-52'><div className='spinner'></div></div>):(
            <div className='grid lg:grid-cols-2 sm:grid-cols-1'>
              <div>
                <div className=' grid lg:grid-cols-2 sm:grid-cols-1  lg:gap-28 sm:gap-y-20 p-5 lg:ml-5 border-1
                 border-gray-500 rounded-md   bg-blue-50 mt-7  '>
                    <div className='flex flex-col gap-1' >
                      <p className='text-2xl font-semibold '>{userdata?.user?.Name}</p>
                      <p> <span className='font-semibold'>Email:</span> {userdata?.user?.Email}</p>
                      <p><span className='font-semibold'>College: </span>{userdata?.user?.college}</p>
                    </div>
                    <div className='flex items-baseline gap-2'>
                      <img src={userdata?.user.image} className='w-[100px] h-[100px] aspect-square rounded-full
                      object-cover border-1 border-gray-600'></img>
                      <button className='text-xl text-red-800 p-1 bg-gray-400 rounded-md'
                      onClick={()=>setimagemodal(true)}
                     >
                        <CiEdit></CiEdit>
                      </button>
                    </div>
              </div>
              <div className='flex flex-col p-5 bg-blue-50 border-1 border-gray-500
               rounded-md ml-5 mr-5 mt-10 text-xl text-gray-600'>
                <p><span className='text-black'>1.</span> No of Disscussions made by you: <span
                className='text-xl text-black font-semibold'>{userdata?.user?.Questions?.length}</span></p>
                <p><span className='text-black'>2.</span> No of Thoughts shared by You: <span
                className='text-xl text-black font-semibold'>{userdata?.Answersbyuser}</span></p>
                <p><span className='text-black'>3.</span> No of Groups created by you: <span
                className='text-xl text-black font-semibold'>{userdata?.groupadminUser?.length}</span></p>
                <p><span className='text-black'>4.</span> Total Chats: <span
                className='text-xl text-black font-semibold'>{userdata?.Totalchats.length}</span></p>
                <p><span className='text-black'>5.</span> Notifications: <span
                className='text-xl text-black font-semibold'>{userdata?.Notifications}</span></p>
              </div>
            </div>
            <div>
                <div className='pl-10 pt-3'>
                  <p className='text-xl font-semibold'>Your Chats</p>
                  <div>
                    {
                      userdata?.Totalchats?.length==0?<div>No Chats</div>:
                      userdata?.Totalchats?.map((chat)=>(
                        <div className='pl-5 pr-10 '>
                        <div key={chat?._id} className='flex gap-2 bg-blue-300 border border-gray-400 
                    rounded-md pl-2 pr-2 pt-1 pb-1 cursor-pointer mt-1 w-full items-center'>
                        <div>
                            <img src={chat?.avtar} className='w-[40px] h-[40px] aspect-square 
                            rounded-full '></img>
                        </div>
                        <div>
                            <p className='font-semibold'>{chat?.name}</p>
                            {
                              chat?.groupChat?<div>Group Chat</div>:<div>Personal Chat</div>
                            }
                        </div>
                        </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
            </div>
          </div>
          )
        }
          

        </div>
        {
           imagemodal && <SetImageModal setimagemodal={setimagemodal} setrefetch={setrefetch} refetch={refetch}
           ></SetImageModal>
        }
    </div>
  )
}
