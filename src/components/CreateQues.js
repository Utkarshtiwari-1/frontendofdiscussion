import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { useState ,useEffect} from "react";
import toast from "react-hot-toast";
import { getTags } from "../service/operations";
import { useDispatch, useSelector } from "react-redux";
import {setsteps,setquestionid} from "../slice/stepslice"
import { createquestion } from "../service/operations";
import { format } from "date-fns-tz";

function CreateQues()
{

    const [isvideo,setisvedio] = useState(false);
    const {register,handleSubmit,setValue,getValues} = useForm();
    const [alltags,setalltags] = useState([]);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    

    const [loading,setloading] = useState(false);
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

    async function submithandler(data)
    {
        const formdata = new FormData();

        formdata.append("problem",data.problem);
        formdata.append("problemdescription",data.description)
        formdata.append("problemFile",data?.Media);
        formdata.append("tags",data.tags);
        if(isvideo)
        {
            formdata.append("mediaType","video");
        }
        else
        {
            formdata.append("mediaType","image");
        }
       

        const result = await createquestion(formdata,token);
        if(!result)
        {
            toast.error("Failed to create");
            return;
        }

        dispatch(setsteps(2));
        dispatch(setquestionid(result._id));
        


    }

    return(
        <div className="mt-5 w-full border border-gray-800 rounded-md p-4  ">
            <form onSubmit={handleSubmit(submithandler)}>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold ">Ask your Query or share your Experience</p>
                    
                    <div>
                        {
                            loading?(<p className="px-2 py-1 bg-blue-300 text-black">Loading...</p>):(
                                <select className="px-2 py-1 bg-blue-400 rounded-md text-white"
                                {...register("tags",{required:true})}>
                                    <option className="px-2 py-1 bg-blue-300 text-white" value={null}>Choose Tag</option>
                                    {
                                        alltags.map((tag)=>(
                                            <option value={tag._id} key={tag._id}>{tag.tagname}</option>
                                        ))
                                    }
                                </select>
                            )
                        }
                    </div>
                </div>
                <div className="flex w-full ">
                    <div className=" flex flex-col gap-1 pt-3 w-full">
                    <label>Title<sup>*</sup></label>
                    <input name="problem" type="text" {...register("problem",{required:true})}
                    className="w-[80%] p-2 text-black bg-blue-100 rounded-md  outline outline-1 outline-black"
                    placeholder="Enter title"></input>
                    </div>
                    
                </div>
                <div className="flex flex-col gap-1 pt-3">
                    <label>Describe the Problem/Exprience<sup>*</sup></label>
                    <textarea name="description" {...register("description",{required:true})} 
                    className="min-h-[120px] p-2 bg-blue-100  rounded-md outline outline-1 outline-black "
                     placeholder="Enter the description..."></textarea>
                </div>
                <div className="pt-3">
                    <div className="flex items-center gap-2">
                        <label>For attching Video Click here</label>
                        <input type="checkbox" checked={isvideo}  onChange={()=>setisvedio(!isvideo)}
                            className=" align-bottom p-1 cursor-pointer bg-blue-300 outline outline-1 outline-black"
                        ></input>
                    </div>
                    <Upload
                    
                    label="Upload Media (Optional)"
                    register={register}
                    setValue={setValue}
                    video={isvideo}
                    ></Upload>

                    
                </div>

                <button className="px-2 py-1 bg-blue-400 text-white mt-5 rounded-md"
                 type="submit">Save and Next</button>
            </form>
        </div>
    )
}

export default CreateQues;