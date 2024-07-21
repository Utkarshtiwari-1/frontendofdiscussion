
function Answeritems({currentItems}){
    return(
        <div>
            {
                currentItems.map((answer)=>(
                    <div className="flex flex-col gap-2 border-b border-gray-500 pl-5 pr-5 ">
                        <div>{answer?.answer}</div>
                        <div className="font-semibold">By {answer?.solver?.Name}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Answeritems;