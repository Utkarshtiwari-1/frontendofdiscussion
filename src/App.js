import { Route, Routes } from "react-router-dom";
import { Loginpage } from "./Pages/Loginpage";
import { Signuppage } from "./Pages/Signuppage";
import { Home } from "./Pages/Home";
import { Navbar } from "./components/Navbar";
import Askquestion from "./Pages/Askquestion";
import QuestionDetails from "./components/QuestionDetails";
import Userprofile from "./components/Userprofile";
import { useSelector } from "react-redux";
import {Chat} from "./Chat/chat";
import { Askgemini } from "./Pages/Askgemini";

function App() {

  const {user} = useSelector((state)=>state.auth);
  return (
    <div >
    <div>
      <Navbar></Navbar>
    </div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Loginpage></Loginpage>}></Route>
          <Route path="/signup" element={<Signuppage></Signuppage>}></Route>
          <Route path="/ask-share-ques" element={<Askquestion></Askquestion>}></Route>
          <Route path="/discussions/:queid" element={<QuestionDetails></QuestionDetails>} ></Route>
          {
            user && <Route path="/dashboard/my-profile" element={<Userprofile></Userprofile>}></Route>
          }
          {
            user && <Route path="/chat" element={<Chat></Chat>}></Route>
          }
          <Route path="/ask/gemini" element={<Askgemini></Askgemini>}></Route>
        </Routes>
        
    </div>
  );
}

export default App;
