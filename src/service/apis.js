

const baseurl = "https://backendofdiscussion-2.onrender.com/api/v1";

const authapi = {

    signupapi:baseurl+"/signup",
    loginapi : baseurl+"/login",
    getalltagapi:baseurl+"/getalltags",
    createquestionapi : baseurl+"/createquestion",
    postquestionapi:baseurl+"/postquestion",
    getallquesapi :baseurl+"/getallquestions",
    getdisscussionusingidapi :baseurl+"/getquestionbyid",
    createanswerapi :baseurl+"/createanswer",
    getpostbytag:baseurl+"/gettagwisepost",
    increaseupvote:baseurl+"/incvote",
    searchuserapi :baseurl+"/chat/search-user",
    requestedapi:baseurl+"/chat/isrequested",
    sendrequestapi :baseurl+"/chat/send-request",
    getnotificationapi :baseurl+"/chat/getallNotifications",
    acceptreqapi:baseurl+"/chat/acceptRequest",
    getmychtsapi:baseurl+"/chat/my-chats",
    getmessages:baseurl+"/chat/get-messages",
    creategroupapi:baseurl+"/chat/new",
    geminiapi:baseurl+"/chat/ask/google-gemini",
    getuserProfileApi :baseurl+"/get-profile",
    updateimageapi:baseurl+"/update-image",
    leaveapi:baseurl+"/chat/leave",
}

export default authapi;
