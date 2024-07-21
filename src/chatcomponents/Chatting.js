import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Getprevmessages } from '../service/operations';
import MessageComponent from './MessageComponent';
import toast from 'react-hot-toast';
import { LeaveGrouporchat } from '../service/operations';

export const Chatting = ({chatid,members,chatdata,setchatid,refetch,setrefetch}) => {

    const [allmessage,setallmessages] = useState([]);
    const [message,setmessage] = useState("");
    const [othermessage,setothermessage] = useState("");
    const {token,user} = useSelector((state)=>state.auth);
    const [loading,setloading] = useState(false);
    const socket = io("https://backendofdiscussion-2.onrender.com",{
        auth:{
            token:token
        }
    });

    useEffect(()=>{

        async function Getallmessages()
        {
            setloading(true);
            const result = await Getprevmessages(chatid,token);
            if(result)
            {
                setallmessages(result);
                console.log("all messages",result);
            }
            setloading(false);
        }
        Getallmessages();


    },[chatid])
   
    
    //console.log("chatid",chatid,members)
    function sendmessagehandler(e){
        e.preventDefault();
        const dataforusermessage = {
            chatid,
            sender:{
                _id:user._id,
            },
            content:message
        }
        
        setallmessages([...allmessage,dataforusermessage]);
        socket.emit("NEW_MESSAGE",{chatid,members,message});
        setmessage("");
    }

    socket.on('NEW_MESSAGE',(data)=>{
        //console.log("data from User",data);
        if(data.chatid===chatid)
        {
            setallmessages([...allmessage,data]);
        }
    })

    async function leavechat(){
        const result = await LeaveGrouporchat(token,chatid);
        if(result)
        {
            setrefetch(!refetch);
           setchatid(null);

           toast.success("Left successfully");
        }
        else
        {
            toast.error("something went wrong..");
        }
    }

  return (
    <div className='flex flex-col h-full  relative w-full'>
        <div className='overflow-y-auto pb-10'>
            <div className='flex gap-3 items-center border-b border-gray-600 py-2 pl-5 justify-between'>
                <div className='flex gap-3 items-center '> 
                <img src={chatdata.avtar} className='h-[50px] w-[50px] aspect-square rounded-md'></img>
                <div className='text-xl text-gray-800 font-serif'>{chatdata.name}</div>
                {
                    chatdata.groupchat?(<div>Group chat {`(${chatdata.members} Members) `}</div>):(<div>Presonal chat</div>)
                }
                </div>
                <div className=' mr-9'>
                    <button
                        className='px-1 py-1 bg-purple-300 text-semibold rounded-md
                        ' onClick={leavechat}>{chatdata.groupchat?"Leave":"Delete"}

                    </button>
                </div>
              
            </div>
            <div className='min-h-[90%] '>
            {
                loading?<div className='h-full w-full flex pt-48 justify-center items-center'><div className='spinner'>
                </div></div>:(allmessage.length!==0 && (
                    <div className='pl-3 pr-3 pb-5'>
                        {
                            allmessage.map((mess)=>(

                            <MessageComponent user={user} message={mess}></MessageComponent>    

                            ))
                        }
                    </div>
                    
                ))
                
            }
           
        </div>
        </div>
        
        <div  >
            <form onSubmit={sendmessagehandler} className='fixed bottom-1 w-[50%] flex gap-3'>
                <input type='text' value={message} onChange={(e)=>setmessage(e.target.value)}
                    className='w-full pl-2 pr-2 pt-1 pb-1 bg-blue-300 text-black outline outline-1 rounded-md '
                    placeholder='Send message'
                ></input>
                <button className='px-2 py-1 bg-blue-800 rounded-md text-white flex gap-1 items-center'>
                    <IoIosSend></IoIosSend>
                    <p>Send</p>
                </button>
            </form>
            
        </div>
    </div>
  )
}
