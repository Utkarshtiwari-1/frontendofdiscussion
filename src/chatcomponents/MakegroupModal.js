import React, { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Rendermember } from './Rendermember';
import { usersearch } from '../service/operations';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Creategroup } from '../service/operations';

export const MakegroupModal = ({setmakegroupmodal,groupmodal,setrefetch,refetch}) => {

    const [members,setmembers] = useState([]);
    const [groupname,setgroupname] = useState("");
    const [name,setnames] = useState("");
    const [loading,setloading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const [user,setuser] = useState(null);

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
        

        setuser(result.users);
        
    }

    async function creategrouphandler()
    {
        const allmembers = [];
        members.forEach((banda)=>allmembers.push(banda._id));

        const response = await Creategroup(groupname,allmembers,token);
        if(response)
        {
            toast.success("Group created sucsessfully");
        }
        else
        {
            toast.error("Something went wrong");
        }
        setrefetch(!refetch);
        setmakegroupmodal(false);

    }

  return (
    <div className={`fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white transition-opacity duration-00 ease-in-out bg-opacity-10 backdrop-blur-sm ${
        groupmodal ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`min-w-[70%] border-1 p-3 flex flex-col  border-gray-600
         bg-purple-100 rounded-md transition-transform duration-800 ease-in-out transform ${
          groupmodal ? 'scale-100' : 'scale-80'
        }`}>
            <div className='flex justify-between'>
                <div className='text-2xl font-semibold text-gray-700'>Create Your Group</div>
                <div className='flex items-center gap-1 cursor-pointer px-2 py-1 bg-gray-700 text-white rounded-md'
                 onClick={()=>setmakegroupmodal(false)}>
                    <IoMdCloseCircle></IoMdCloseCircle>
                    <p>Close</p>
                </div>
            </div>
            <div className='h-[1px] border-b border-gray-700 mt-2'></div>
            <div className='w-full flex '>
                <div className='lg:max-w-[60%] sm:w-full pt-12 '>
                    <div className='flex flex-col gap-1'>
                        <label>Group Name <sup className=' text-red-600'>*</sup></label>
                        <input type='text' value={groupname} onChange={(e)=>setgroupname(e.target.value)}
                            className='px-1 py-1 bg-gray-200 outline outline-1 outline-black rounded-md w-[50%] ' placeholder='Enter Group Name'
                         required></input>
                    </div>
                    <div className='pt-5'>
                        <p className='text-xl font-serif'>Members {`(Search users and add)`}</p>
                        {
                            members.length===0?(<div className='pt-5 pl-5'>No Members Yet.</div>):
                            (
                                <div className='flex flex-wrap gap-2 pt-3'>
                                    {
                                    members.map((member)=>(
                                        <Rendermember member={member} setmembers={setmembers} members={members}></Rendermember>
                                    ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <div className=' lg:pl-20 w-full  h-full flex flex-col items-center
                overflow-y-auto'>
                    <p className='text-xl font-semibold pt-[35px]'>Search User</p>
                    <form onSubmit={submithandler}>
                        <div className='flex flex-col gap-2 mt-2 mb-3 items-end'>
                            <input value={name} name='name' onChange={(e)=>setnames(e.target.value)} 
                            className='p-1 bg-gray-200  rounded-md w-full outline outline-1 outline-black '
                            required placeholder='Search user...'></input>
                            <button className='px-2 py-1 bg-blue-600 text-white rounded-md w-[60px]'
                            type='submit'>{loading?<p>Loading...</p>:<p>Search</p>}
                                </button>
                        </div>
                    </form>
                    {
                        user===null?<div></div> : user.map((people)=>(
                            <div key={people._id} className='flex gap-2 bg-blue-300 border border-gray-400 
                                rounded-md pl-2 pr-2 pt-1 pb-1 cursor-pointer mt-1 w-full items-center'>
                                <div>
                                    <img src={people.image} className='w-[40px] h-[40px] aspect-square 
                                    rounded-full '></img>
                                </div>
                                <div>
                                    <p>{people.Name}</p>
                                    <p>{people.Questions.length} Disscussions</p>
                                </div>
                                <div className='pl-8'>
                                    {   
                                        members.find((member)=>member===people)?(<div 
                                        className='px-1 py-1 bg-yellow-300 rounded-md'>Added</div>):
                                        (
                                        <button className='px-1 py-1 bg-yellow-500 rounded-md'
                                        onClick={()=>setmembers([...members,people])}>Add</button>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }

                    </div>

                </div>
            </div>

            <div className=' pt-20'>
                <button className='px-2 py-1 bg-blue-600 text-white rounded-md '
                onClick={creategrouphandler}>Create Group</button>
            </div>
        </div>
    </div>
  )
}
