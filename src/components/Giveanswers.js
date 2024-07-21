import React, { useState } from 'react'
import { Postanswer } from '../service/operations';
import { useSelector } from 'react-redux';

export default function Giveanswers({queid,setrefresh,refresh}) {

    const [answer,setanswer] = useState("");
    const {token} = useSelector((state)=>state.auth);

    function changehandler(e){
        setanswer(e.target.value);
    }

    async function Postanswerhandler(){

        await Postanswer(queid,answer,token);
        setanswer("");
        setrefresh(!refresh);

    }

  return (
    <div>
        <div className='text-sm mt-2 mb-2'>Share your point of view so the other one's better understand</div>
        <textarea className='w-full min-h-[300px] bg-blue-100 outline rounded-md p-3' 
        placeholder='Share your thoughts....' onChange={changehandler}></textarea>
        <div className='flex justify-end mt-3'>
            <button className='px-2 py-1 bg-blue-500 text-white rounded-md'
            onClick={Postanswerhandler}>📮 Post Publically</button>
        </div>
    </div>
  )
}
