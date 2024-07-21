
import React from 'react'
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";
import toast from "react-hot-toast";
import { updatevote } from "../service/operations";
import { formatInTimeZone } from 'date-fns-tz';
import { TiTag } from 'react-icons/ti';

export default function Singleitems({item}) {
    const {user} = useSelector((state)=>state.auth);
    const [votes,setvotes] = useState(0)
    const {token} = useSelector((state)=>state.auth);
    const [isvoted,setisvoted] = useState(false);

    useEffect(()=>{
        setvotes(item?.upvotes?.length||0);
    },[]);

    async function votehandler(postid)
    {
        
       
        const result = await updatevote(postid,token);
        if(!result)
        {
            toast.error("Someting wnt wrong");
            return;
        }
        setisvoted(true);
       
        setvotes((prev)=>prev+1);
        

    }

    //console.log("Local storage se",localStorage.getItem("Upvote"));


  return (
    <div>
        <div className=" flex flex-col gap-2 border-b border-gray-500 p-3">
                        <div className="flex gap-20] gap-5">
                        <Link to={`/discussions/${item?._id}`}>
                            <div className="text-lg font-semibold">{item?.question?.problem}</div>
                        </Link>
                            <div>{item?.answers?.length} discussions</div>
                            {
                                isvoted||item?.upvotes?.includes(user?._id)?(<div className="text-blue-500">Thanks for upvote</div>):(
                                <button className="px-2 py-1 bg-blue-200 flex w-[40px] h-[40px] items-center rounded-md gap-1 "
                                onClick={()=>votehandler(item?._id)}>
                                
                                <BiUpvote></BiUpvote>
                                </button>
                                )
                            }
                            
                        </div>
                        <div className="text-sm text-gray-700 "
                        >{item?.question?.problemdescription.length>30 ?
                        <p>{item?.question?.problemdescription.slice(0,30)}...</p>:<p>{item?.question?.problemdescription}</p>}</div>
                        <div className="flex gap-10 pt-2">
                            <div>Share by{" "}
                            <Link className="underline">
                            {   item?.isanonymous?"Anonymous User":
                                item?.asker?.Name}</Link></div>
                            <div className="px-2 py-1 bg-blue-400 flex items-center gap-2 rounded-md">
                                <TiTag></TiTag>
                                <p>{item?.question?.tags?.tagname}</p>
                            </div>
                            <div>{votes} Votes</div>
                            <div>{formatInTimeZone(new Date(item?.createdAt), 'America/New_York', 'yyyy-MM-dd ')}</div>
                        </div>
                    </div>
    </div>
  )
}
