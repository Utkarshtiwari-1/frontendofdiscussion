import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {getQuestionDetailsUsingId} from "../service/operations"
import { FcQuestions } from "react-icons/fc";
import Answerpaginateditems from "../PaginationcompforAnswers/Answerpaginateditems";
import { TiTags } from "react-icons/ti";
import Giveanswers from "./Giveanswers";
import { formatInTimeZone } from 'date-fns-tz'
import anonymous from "../images/3550773.jpg";

function QuestionDetails(){

    const {queid} = useParams();
    const navigate = useNavigate();
    const [question,setquestion] = useState(null);
    const [loading,setloading] = useState(false);
    const [refresh,setrefresh] = useState(false);
    const [date,setdate] = useState(null);


    useEffect(()=>{

        const getquesdetails = async()=>{
            setloading(true);
            const result = await getQuestionDetailsUsingId(queid);
            if(!result)
            {
                toast.error("Sometihing went wrong");
                navigate("/");
                return;
                
            }

            setquestion(result);
            setdate(result?.question?.date);
            setloading(false);
        }

        getquesdetails();
         



    },[refresh]);

    


     


    return(
        <div className="bg-blue-100 min-h-screen h-full">
            <div className=" pt-24 w-10/12 mx-auto bg-white pl-5 pr-3 min-h-screen h-full">
            <div className=" flex justify-end  ">
                <button className='flex items-center px-3 py-2 rounded-md bg-blue-700 text-white gap-2'
                onClick={()=>navigate("/ask-share-ques")}>
                    <FcQuestions></FcQuestions>
                    <p>Ask / Share</p>
                </button>
            </div>
                {
                    loading?(<div className="w-full h-[500px] flex justify-center items-center">
                    <div className="spinner"></div></div>):(
                        <div>
                            <div>
                                <div className="text-3xl text-black font-semibold">
                                    {
                                        question?.question?.problem
                                    }
                                </div>
                                
                            </div>
                            <div className="h-[1px] bg-gray-700 mt-1 mb-2"></div>
                            <div className="flex lg:flex-row md:flex-col sm:flex-col gap-5">
                                <div className="lg:w-[50%] md:w-full sm:w-full">
                                <div className="text-black  text-center ">
                                {
                                    question?.question?.problemdescription
                                }
                                </div>
                                <div className="mt-4 mb-4 flex justify-center">
                                {
                                    question?.question?.Media!==null && (
                                        question?.question?.mediaType==="image"?(<img src={question?.question?.Media}
                                        className="h-[70%] w-[70%] object-contain rounded-md"></img>)
                                        :(<video src={question?.question?.Media} autoPlay={false} controls={true}></video>)
                                    )
                                }
                            </div>

                            <div className="flex gap-5">
                                <div className="flex flex-col gap-2">
                                    <p className=" text-center font-semibold ">Shared by</p>
                                    <div className="flex gap-2 ">
                                        <img src={question?.isanonymous?anonymous:
                                            question?.asker?.image}
                                        className="w-[80px] h-[80px] aspect-square rounded-full"></img>
                                        <div className="flex flex-col">
                                        <p>{question?.isanonymous?"Anonymous User":
                                            question?.asker?.Name}</p>
                                        <p>{formatInTimeZone(new Date(date), 'America/New_York', 'yyyy-MM-dd ')}</p>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div className=" font-semibold">
                                    <p className="px-2 py-1 bg-blue-300 rounded-md flex items-center gap-2">
                                    <TiTags></TiTags>
                                    {question?.question?.tags?.tagname}</p>
                                    
                                </div>
                                <div className="font-semibold">{question?.upvotes?.length} Upvotes</div>
                            </div>

                            
                            <div className="mt-3 pb-20">
                               
                                    <div className="text-xl font-semibold mb-3 underline">Other's Opinion</div>
                                    <Answerpaginateditems itemsPerPage={4} answers={question?.answers}></Answerpaginateditems>
                                
                            </div>
                                </div>
                                <div className="mt-7 pb-10">
                                <div className="text-2xl font-semibold">Share your Thoughts</div>
                                <Giveanswers queid={queid} setrefresh={setrefresh} refresh={refresh}></Giveanswers>
                                </div>
                            </div>
                            

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default QuestionDetails;