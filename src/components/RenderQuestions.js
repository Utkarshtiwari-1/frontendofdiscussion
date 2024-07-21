import PaginatedItems from "../Paginationcomponents/PaginatedItems";
import { getallposts } from "../service/operations";
import { useState,useEffect } from "react";
import { getpostusingtagid } from "../service/operations";

function RenderQuestions({tagid})
{
    const [items,setitems] = useState([]);
    const [loading,setloading] = useState(false);
    useEffect(()=>{

        if(tagid==="all")
        {
            async function getallquestions()
            {
                setloading(true);
                const result = await getallposts();
                if(!result)
                {
                    setitems(["Not a single question is there"]);
                    setloading(false);
                    return;
                }
    
                setitems(result);
                setloading(false);
            }
            getallquestions();
        }
        else
        {
            async function getquestionbytag()
            {
                setloading(true);
                const result = await getpostusingtagid(tagid);
                if(!result)
                {
                    setloading(false);
                    
                    setitems(["No Post Found"]);
                    return;
                }

                setitems(result);
                setloading(false);
            }

            getquestionbytag();
        }
        
    },[tagid])
    return(
        <div>
            <PaginatedItems itemsPerPage={4} items={items}  loading={loading}  />

        </div>
    )
}

export default RenderQuestions;