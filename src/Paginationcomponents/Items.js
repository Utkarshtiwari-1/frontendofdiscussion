
import Singleitems from "./Singleitems";


function Items({currentItems})
{
    

    return(
        <div className="w-[70%] mt-4 mb-5">
        {
            currentItems?.map((item)=>(
               
                    <Singleitems item={item}></Singleitems>
               
            ))
        }
        </div>
    )
}

export default Items;