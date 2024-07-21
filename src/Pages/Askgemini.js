import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoIosSend } from "react-icons/io";
import { GenerateResponse } from '../service/operations';
import geminiimage from "../images/google-bard-gemini-v2.webp"


export const Askgemini = () => {

    const [promt,setprompt] = useState("");
    const [ques,setques] = useState("");
    const [loading,setloading] = useState(false);
    const [response,setresponse] = useState("");

    async function submithandler(){
        setques(promt);
        setprompt("");
        setloading(true);

        const result = await GenerateResponse(promt);
        if(!result)
        {
            toast.error("Something went wrong");
            setloading(false);
            return;
        }
        setresponse(result);
        setloading(false);
        
    }

  return (
    <div className='w-full  h-full bg-gray-50'>
        <div className='pt-16 p-6 flex  w-10/12 mx-auto bg-purple-50  border-l border-r border-gray-400 min-h-[100vh] overflow-y-hidden'>
            <div className='lg:min-w-[60%] sm:w-full p-5'>
                <div>
                    {
                        ques.length!==0 ? (<div className='px-2 py-1 bg-blue-200 text-black max-w-max
                         rounded-md'>{ques}</div>):(
                            <div>
                                <img src={geminiimage} className='rounded-md'></img>
                            </div>
                         )
                    }
                </div>
                <div className='pt-5'>
                    {
                        loading?(<div className='loader'></div>):(response.length>0 && 
                        <div className='px-2 py-1 bg-blue-200 text-black max-w-max
                         rounded-md'>{response}</div>)
                    }
                </div>
            </div>
            <div>
            
                <div className='lg:min-w-[40%] sm:w-full flex flex-col'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='text-xl font-sans font-semibold'>Ask Your Query to AI ✨</label>
                        <textarea value={promt} className='min-h-[150px] w-[300px] bg-blue-50 p-2 outline outline-gray-600 rounded-md  '
                         placeholder='Enter Query' onChange={(e)=>setprompt(e.target.value)}></textarea>
                        <div className='flex justify-between w-full'>
                            <div></div>
                            <button className='px-3 py-1 bg-blue-600 text-xl text-white rounded-md'
                            onClick={submithandler}>
                                <IoIosSend></IoIosSend>
                            </button>
                        </div>
                    </div>
                    <div className='mt-10 p-3 border-1 border-gray-600 rounded-md bg-blue-50 text-md'>
                        <ul className='flex flex-col gap-1'>
                            <li>1. Write Simple, Clear and Concise Query.</li>
                            <li>2. Provide Good Enough Information and Facts.</li>
                            <li>3. Fast-check Generated Response.</li>
                            <li>4. Ask Follow-up Questions.</li>
                        </ul>
                    </div>
                </div>
            
        </div>
    </div>
    </div>
  )
}
