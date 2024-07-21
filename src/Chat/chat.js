import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { usersearch } from '../service/operations';
import { Userscomponent } from '../chatcomponents/Userscomponent';
import { Chatting } from '../chatcomponents/Chatting';
import { Notification } from '../chatcomponents/Notification';
import { Notificationmodal } from '../chatcomponents/Notificationmodal';
import {getnotification} from "../service/operations"
import { Getallchats } from '../service/operations';
import { Makegroup } from '../chatcomponents/Makegroup';
import { MakegroupModal } from '../chatcomponents/MakegroupModal';
import chatimge from "../images/chatimage.png"

export const Chat = () => {

    const {token} = useSelector((state)=>state.auth);
    const [users,setusers] = useState(null);
    const [name,setnames]  = useState("");
    const [request,setrequest] = useState(null);
    const [loading,setloading] = useState(false);
    const [notificationmodal,setnotificationmodal] = useState(false);
    const [notifications,setnotification] = useState([]);
    const [refetch,setrefetch] = useState(false);
    const [chats,setchats] = useState(null);
    const [chatid,setchatid] = useState(null);
    const [members,setmembers] = useState(null);
    const [chatdata,setchatdata] = useState({
        name:"",
        avtar:"",
        members:0,
        groupchat:false
    })

    const [makegroupmodal,setmakegroupmodal] = useState(false);

    async function submithandler(e){
        e.preventDefault();
        setloading(true);
        const result = await usersearch(name,token);

        setloading(false);
        setnames("");
        if(!result)
        {
            toast.error("No users found");
            return;
        }
        

        setusers(result.users);
        setrequest(result.request);

    }

    useEffect(()=>{
        const notify = async()=>{
            const result = await getnotification(token);
            if(result)
            {
                setnotification(result);

            }
        }
        notify();
        const getchats = async()=>{
            const result = await Getallchats(token);
            if(result)
            {
                setchats(result);
                console.log("all chats",result);
            }
        }
        getchats();
        
    },[refetch])

  return (
    <div className='w-full min-h-[100vh] h-[100vh] bg-blue-50 pt-14 z-0 relative '>
        <div className='flex justify-between h-full '>
            <div className='lg:w-[20%] sm:w-full border-r border-gray-600 h-full '>
                <div className='flex gap-2 items-center'>
                <Notification setnotificationmodal={setnotificationmodal}></Notification>
                <Makegroup setmakegroupmodal={setmakegroupmodal}></Makegroup>
                </div>
                
                <div className='h-[1px] bg-gray-500 mt-1 mb-2'></div>
                <div className='p-3'>
                {
                    chats===null?(<div>No chats Found</div>):
                    (
                        chats.map((group)=>(
                            <div key={group._id} className='flex gap-1 px-1 py-1 bg-blue-300 items-center
                             mt-1 rounded-md cursor-pointer'
                             onClick={()=>{
                                setchatid(group._id)
                                setmembers(group.members)
                                setchatdata({name:group.name,avtar:group.avtar,members:group.members.length,
                                groupchat:group.groupChat})
                             }}>
                                <img src={group.avtar} className='w-[50px] h-[50px] aspect-square rounded-full'></img>
                                <div className='text-lg font-semibold '>{group.name}</div>
                                
                            </div>
                        ))
                    )
                }
                </div>
                
            </div>
            <div className='lg:w-[60%] sm:w-full    bg-blue-100 h-full'>
                {
                    chatid===null?<div className='flex justify-center items-center h-full bg-purple-200 pl-0'>
                        <img src={chatimge} className='rounded-md'></img>
                    </div>:(
                        <Chatting chatid={chatid} members={members} chatdata={chatdata} setchatid={setchatid}
                        refetch={refetch} setrefetch={setrefetch}></Chatting>
                    )
                }
           
            </div>
            <div className='lg:w-[20%] sm:w-full border-l border-gray-600 h-full flex flex-col items-center
             overflow-y-auto'>
                <p className='text-xl font-semibold pt-2'>Search User</p>
                <form onSubmit={submithandler}>
                    <div className='flex flex-col gap-2 mt-2 items-end'>
                        <input value={name} name='name' onChange={(e)=>setnames(e.target.value)} 
                        className='p-1 bg-blue-100 rounded-md w-full outline outline-gray-300 '
                        required placeholder='Search user...'></input>
                        <button className='px-2 py-1 bg-blue-600 text-white rounded-md w-[60px]'
                        type='submit'>{loading?<p>Loading...</p>:<p>Search</p>}
                            </button>
                    </div>
                
                </form>
                {
                    users===null ?<p></p>:(<Userscomponent users={users} request={request}></Userscomponent>)
                }
                
               
            </div>
        </div>
        {
            notificationmodal && <Notificationmodal setnotificationmodal={setnotificationmodal}
            notifications={notifications} setrefetch={setrefetch} refetch={refetch} notificationmodal={notificationmodal}></Notificationmodal>
            
        }
        {
            makegroupmodal && <MakegroupModal setrefetch={setrefetch} refetch={refetch}
             setmakegroupmodal={setmakegroupmodal} groupmodal={makegroupmodal}></MakegroupModal>
        }
    </div>
  )
}
