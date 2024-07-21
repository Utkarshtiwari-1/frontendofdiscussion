import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Imageuploader from '../chatcomponents/Imageuploader';
import toast from 'react-hot-toast';
import { updateimage } from '../service/operations';

import { useSelector } from 'react-redux';

export const SetImageModal = ({setimagemodal,setrefetch,refetch}) => {

    const {register,setValue,getValues,handleSubmit} = useForm();
    const [loading ,setloading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    async function imageuploadhandler(data)
    {
        
        console.log("image",data.Media);
        const result = await updateimage(token,data.Media);
        if(!result)
        {
            setimagemodal(false);
            toast.error("something went wrong");
            return;
        }
        else
        {
            toast.success("image updated successfully");
            
            setrefetch(!refetch);
            setimagemodal(false);
        }
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        
        <div className='min-w-[300px]  border-1 p-3 flex flex-col bg-purple-100  text-center border-gray-600 rounded-md'>
            {
                loading?(<div className='loader'></div>)
                :(<div>
                    <div className='flex justify-between p-2 border-b border-gray-500'>
                <p className='text-xl font-semibold text-gray-700'>Reset Your Image</p>
                <p className='font-semibold text-red-800 cursor-pointer'
                 onClick={()=>setimagemodal(false)}>Close</p>
            </div>
            
            <form onSubmit={handleSubmit(imageuploadhandler)}>
            <div className=' flex justify-center'>
                <Imageuploader label={"Upload Image"} register={register} setValue={setValue}></Imageuploader>
            </div>

            <button className='px-2 py-1 w-full bg-blue-700 text-white font-semibold rounded-md mt-2'
             type='submit'>
                Update
            </button>
            </form>
            </div>
            )
            }
        </div>
    </div>
  )
}
