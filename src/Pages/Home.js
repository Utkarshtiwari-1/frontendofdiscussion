import React, { useEffect, useState } from 'react'
import { FcQuestions } from "react-icons/fc";
import { FaRocketchat } from "react-icons/fa";
import toast from 'react-hot-toast';
import { getTags } from '../service/operations';
import { useNavigate } from 'react-router-dom';
import RenderQuestions from '../components/RenderQuestions';
import { SiGooglegemini } from "react-icons/si";



export const Home = () => {

  const [tagid,settagid] = useState("all");
  const [alltags,setalltags] = useState([]);
  
  const [loading,setloading] = useState(false);
  const navigate = useNavigate();
  async function getalltags()
  {
    setloading(true);
      const result = await getTags();
      if(!result)
      {
        toast.error("No tags found");
        return;
      }
      
      console.log("result",result);
      setalltags(result);
      setloading(false);
  }

  useEffect(()=>{

    getalltags();
    
  },[])

  function changehandler(e)
  {
    settagid(e.target.value);
  }

  return (
    <div className='bg-blue-50 min-h-[100vh]'>
       <div className='w-9/12 mx-auto pt-28'>
        <div className='flex justify-between'>
         
          <p className='text-3xl font-semibold text-black '>Ask Your Query, Share
          <br></br> your Experience 😊</p>
          
          <div className='flex gap-5 items-center'>
            <button className='flex items-center px-3 py-2 rounded-md bg-blue-700 text-white gap-2'
            onClick={()=>navigate("/ask-share-ques")}>
                <FcQuestions></FcQuestions>
                <p>Ask / Share</p>
            </button>
            <button className='flex items-center px-3 py-2 rounded-md bg-blue-700 text-white gap-2'
            onClick={()=>navigate("/chat")}>
                <FaRocketchat></FaRocketchat>
                <p>Chat</p>
            </button>
            <button className='flex items-center px-3 py-2 rounded-md bg-blue-700 text-white gap-2'
            onClick={()=>navigate("/ask/gemini")}>
              <SiGooglegemini></SiGooglegemini>
              <p>Ask AI</p>
            </button>
          </div>
        </div>
        <div className='h-[1px] bg-gray-600 mt-5'></div>
        <div className='flex justify-between pt-8'>
          <div className='text-2xl font-semibold text-gray-800'>Top Discussions</div>
          <div className='flex gap-3 items-center'>
            <p className=' text-gray-900 '>Types of Discussion you want</p>
            {
              loading?(<p className='text-black px-2 py-1 bg-blue-300 rounded-md'>Loading...</p>):(
                <div className=' bg-blue-600 text-white rounded-md'>
                  <select className=' cursor-pointer bg-blue-600 text-white rounded-md px-1 py-2'
                  onChange={changehandler}>
                    <option className='bg-blue-400' value="all">All</option>
                    {
                      alltags.map((tags)=>(
                        <option key={tags._id} value={tags._id}
                        className=' cursor-pointer bg-blue-400'>{tags.tagname}</option>
                      ))
                    }
                  </select>
                </div>

              )
            }
          </div>
        </div>
        <div className='pb-16 pt-2'>
            <RenderQuestions tagid={tagid}></RenderQuestions>
        </div>
       </div>
    </div>
  )
}
