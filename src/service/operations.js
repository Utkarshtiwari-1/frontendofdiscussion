import toast from "react-hot-toast";
import authapi from "./apis";
import axios from "axios";
import { settoken,setuser} from "../slice/authslice";
import { apiconnector } from "./apiconnector";
const {signupapi,loginapi,getalltagapi,createquestionapi,
    postquestionapi,getallquesapi,getdisscussionusingidapi,
    createanswerapi,getpostbytag,increaseupvote,searchuserapi,
    requestedapi,sendrequestapi,getnotificationapi,acceptreqapi,
    getmychtsapi,getmessages,creategroupapi,geminiapi,getuserProfileApi,
    updateimageapi,leaveapi
} = authapi;


export const signup = async(formdata,navigate)=>{
    const toastid = toast.loading("Loading...");
    try {
        
        const response = await axios.post(signupapi,formdata);
        console.log("response",response);
        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }
        navigate("/login");
        toast.success("User registered succsessfully ")


    } catch (error) {
        console.log("error while signup",error);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastid);
}

export const login = async(formdata,navigate,dispatch)=>{
    const toastid = toast.loading("Loading...");
    try {
        
        const response = await axios.post(loginapi,formdata);
        console.log("res",response);
        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        dispatch(settoken(response.data.user.token));
        dispatch(setuser(response.data.user.userexist));
        toast.success("Logged in succsessfully");
        localStorage.setItem("chattoken",JSON.stringify(response.data.user.token));
        localStorage.setItem("chatuser",JSON.stringify(response.data.user.userexist));
        navigate("/");

    } catch (error) {
        console.log("error while login", error);
        toast.error("something went wrong");
    }

    toast.dismiss(toastid);
}

export const getTags = async()=>{
    let result = null;
    try {

        const response = await axios.get(getalltagapi);
        console.log("response",response);
        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.tags;

        
    } catch (error) {
        console.log("error while fetching tags",error);
        toast.error("error while tags fetching");
    }

    return result;
}


export const createquestion = async(formdata,token)=>{
    const toastid = toast.loading("Loading...");
    let result = null
    try {

        const response = await apiconnector("POST",createquestionapi,formdata,{
           "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success("Saved succsessfully");

       
        
    } catch (error) {
        console.log("error while creating ques",error);
        toast.error("Something went wrong");
    }

    toast.dismiss(toastid);
    return result;
}


export const Postquestion = async(questionid,token,isanonymous)=>{
    const toastid = toast.loading("Loading...");
    let result = null;
    try {
        
        const response = await apiconnector("POST",postquestionapi,{question:questionid,isanonymous:isanonymous},{
            Authorization: `Bearer ${token}`
        });

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success("Posted sucsessfully");

    } catch (error) {
        console.log("error while posting query",error);

    }

    toast.dismiss(toastid);
    return result;
}


export const getallposts = async()=>{

    let result = null;
    try {

        const response = await apiconnector("GET",getallquesapi);

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);

        
        }

        result = response.data.data;
        
    } catch (error) {
        
        console.log("error while Fetching all query",error);
        toast.error("cannot fetch all quesries")

    }

    return result;
}

export const getQuestionDetailsUsingId = async(queid)=>{
    let result = null;
    try {

        const response = await apiconnector("POST",getdisscussionusingidapi,{queid});
        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;


        
    } catch (error) {
        console.log("error while fetching disscussion using id",error);

    }

    return result;
}

export const Postanswer = async(queid,answer,token)=>{
    const toastid = toast.loading("Posting...")
    try {

        const response = await apiconnector("POST",createanswerapi,{question:queid,answer:answer},{
             Authorization: `Bearer ${token}`
        });

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        toast.success("Posted succsessfully");



        
    } catch (error) {
        console.log("error while posting answer",error);
        if(error.response.data.message==="jwt verification failed")
        {
            toast.error("Login yourself for posting.");
        }
        else if(error.response.data.message==="authentication failed")
        {
            toast.error("Token expired ,Login again")
        }
        else
        {
            toast.error("someting went wrong")
        }
        
    }
    toast.dismiss(toastid);
}

export const getpostusingtagid = async(tagid)=>{
    let response = null;
    try {

        const result = await apiconnector("POST",getpostbytag,{tagid:tagid});
        console.log("tagid",tagid);

        //console.log("result of tags wise",result);
        if(!result.data.succsess)
        {
            throw new Error(result.data.message);
        }

        response =  result.data.data;
        console.log("response",response);

        

        
    } catch (error) {
        console.log("error while tag wise fetching",error);

    }

    return response;
}

export const updatevote = async(postid,token)=>{

    let result = null;
    try {

        const response = await apiconnector("POST",increaseupvote,{postid:postid},
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        //localStorage.setItem("Upvote",JSON.stringify([postid]));
        
    } catch (error) {
        
        console.log("error while inc votes",error);

    }

    return result;
}

export const usersearch = async(name,token)=>{
    let result = null;
    try {
        
        console.log("name",name,typeof(name));
        const response = await apiconnector("GET",searchuserapi,null,{
             Authorization: `Bearer ${token}`
        },
        {
            name:name
        }
    );
        console.log("response",response);

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data;

    } catch (error) {
        console.log("error while searching users",error);
        toast.error("Someting went wrong");
    }

    return result;
}

export const sendrequest = async(userid,token)=>{
    let result = null;
    try {


        const response = await apiconnector("POST",sendrequestapi,{userid},{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.message;
    
        
        
    } catch (error) {
        console.log("error while checking requested",error);
        
    }

    return result;
}

export const getnotification = async(token)=>{
    let result = null;

    try {

        const response = await apiconnector("GET",getnotificationapi,null,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        console.log("response",response);
        
        result = response.data.data;
    } catch (error) {
        
        console.log("error while getting notification",error);
        toast.error("Something went wrong");
    }
    return result;
}

export const acceptrequestoperation = async(reqid,token,refetch,setrefetch)=>{
    try {

        const response = await apiconnector("POST",acceptreqapi,{requestid:reqid,accept:true},{
           
            Authorization: `Bearer ${token}`
            
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message)

        }

        setrefetch(!refetch);
        toast.success("Request accepted");
        
    } catch (error) {
        console.log("error while accepting notification",error);
        toast.error("Something went wrong")
    }
}

export const rejectrequestoperation = async(reqid,token,refetch,setrefetch)=>{
    try {

        const response = await apiconnector("POST",acceptreqapi,{requestid:reqid,accept:false},{
           
            Authorization: `Bearer ${token}`
            
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message)

        }

        setrefetch(!refetch);
        toast.success("Request rejected");
        
    } catch (error) {
        console.log("error while rejecting notification",error);
        toast.error("Something went wrong")
    }
}


export const Getallchats = async(token)=>{
    let result = null;
    try {
        
        const response = await apiconnector("GET",getmychtsapi,null,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.chats;

    } catch (error) {
        console.log("error while fetching chats",error);
        toast.error("Something went wrong while fething chats");
    }

    return result;
}

export const Getprevmessages = async(chatid,token)=>{
    let result = null;
    try {
        
        const response = await apiconnector("POST",getmessages,{chatid:chatid},{
              Authorization: `Bearer ${token}`
        });

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {
        console.log("error while getting messages of chat",error);
        toast.error("something went wrong");
    }

    return result;
}

export const Creategroup = async(groupname,allmembers,token)=>{
    let result = null;
    const toastid = toast.loading("Loading...");
    try {
        
        const response = await apiconnector("POST",creategroupapi,{name:groupname,members:allmembers},
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.succsess;


    } catch (error) {
        console.log("error while Creating group",error);
    }
    toast.dismiss(toastid);
    return result;
}

export const GenerateResponse = async(promt)=>{
    let result = "";
    try {

        const response = await apiconnector("POST",geminiapi,{ques:promt});

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.solution;
        result = result.replace(/[*\n]/g,'');
        console.log("result",result);
        
    } catch (error) {
        console.log("error while generating sol using gemini",error);
        toast.error(error);
    }

    return result;
}

export const getUserProfile = async(token)=>{
    let result = null;
    try {
        
        const response = await apiconnector("GET",getuserProfileApi,null,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {
        console.log("error while fetching profile details",error);
        toast.error("something went wrong");
    }

    return result;
}

export const updateimage = async(token,image)=>{
    let result = null;
    const toastid = toast.loading("Loading...");
    try {
        
        const formdata = new FormData();
        formdata.append("imagefile",image);
        const response = await apiconnector("POST",updateimageapi,formdata,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = true;

    } catch (error) {
        console.log("error while updating image",error);
    }

    toast.dismiss(toastid);
    return result;
}

export const LeaveGrouporchat = async(token,chatid)=>{
    const toastid = toast.loading("Loading..");
    let result = false;
    try {
        
        const response = await apiconnector("DELETE",leaveapi,{chatid:chatid},{
               Authorization: `Bearer ${token}`
        })

        if(!response.data.succsess)
        {
            throw new Error(response.data.message);
        }

        result = true;

    } catch (error) {
        console.log("error while deleting");
    }

    toast.dismiss(toastid);
    return result;
}