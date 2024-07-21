import toast from "react-hot-toast";
import { IoArrowUndo } from "react-icons/io5";
import { SiApostrophe } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setquestionid, setsteps } from "../slice/stepslice";
import { Postquestion } from "../service/operations";
import { useState } from "react";

function PostQues()
{

    const {questionid} = useSelector((state)=>state.steps);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isanonymous,setisanonymous] = useState(false);

    async function posthandler()
    {
        const response = await Postquestion(questionid,token ,isanonymous);
        if(!response)
        {
            toast.error("Failed to post publically");
            navigate("/");
            return;
        }
        dispatch(setquestionid(null));
        dispatch(setsteps(1));
        navigate("/profile/my-queries");

    }

    function gobackhandler()
    {

    }
    return(
        <div className="w-full border border-gray-600 rounded-md mt-5 p-5 bg-blue-100">
            <div className=" text-center text-2xl font-semibold">
                Wanted to post it Publically?
            </div>
            <div className="flex items-center justify-center mt-3 gap-2">
                <p className="text-md font-semibold">Keep me anonymous</p>
                <input type="checkbox" value={isanonymous} onChange={()=>setisanonymous(!isanonymous)}></input>
            </div> 
            <div className="flex justify-evenly mt-5">
                <button className="flex gap-2 items-center px-3 py-2 bg-gray-600 text-white rounded-md"
                onClick={gobackhandler}>
                    <IoArrowUndo></IoArrowUndo>
                    <p>Go back</p>
                </button>
                <button className="flex gap-2 items-center bg-blue-600 text-white px-3 py-2 rounded-md"
                onClick={posthandler}>
                    <SiApostrophe></SiApostrophe>
                    <p>Post Publically</p>
                </button>
            </div>

        </div>
    )
}

export default PostQues;