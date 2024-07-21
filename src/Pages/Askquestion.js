import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import CreateQues from "../components/CreateQues";
import PostQues from "../components/PostQues";

function Askquestion()
{
    const {step} = useSelector((state)=>state.steps);

    return(
        <div className="w-full bg-blue-50  pt-28 h-full min-h-[100vh] pb-10">
        <div className="w-9/12 mx-auto ">
        <div className="w-[60%] mx-auto ">
            <div className="flex  justify-between items-center">
                    <div className={`w-[50px] h-[50px] aspect-square rounded-full text-center border border-dotted
                    border-gray-700 flex items-center justify-center text-xl font-semibold ${step>1 ?" bg-yellow-400":"bg-blue-400"}`}>
                        {
                            step>1?(<FaCheckCircle></FaCheckCircle>):(<p>1</p>)
                        }
                    </div>
                    <div className={`h-[1px] border-b border-dotted w-[90%] ${step>2?" border-yellow-500":" border-gray-700"} `}></div>
                    <div className={`w-[50px] h-[50px] aspect-square rounded-full text-center border border-dotted
                    border-gray-700 flex items-center justify-center text-xl font-semibold ${step>2 ?" bg-yellow-400":"bg-blue-400"}`}>
                        {
                            step>2?(<FaCheckCircle></FaCheckCircle>):(<p>2</p>)
                        }
                    </div>

            </div>
            {
                step==1 ?(
                    <div>
                        <CreateQues></CreateQues>
                    </div>
                ):(
                    <div>
                        <PostQues></PostQues>
                    </div>
                )
            }
        </div>
            
        </div>

        </div>
    )
}

export default Askquestion;
