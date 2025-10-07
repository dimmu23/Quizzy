import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DistributionChart from "../components/Charts";
import { LogOut } from 'lucide-react';
import { BACKEND_URL } from "../confing";

const Dashboard = () => {
  const navigate = useNavigate();
  const [details, setdetails] = useState(null);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const haveTokenAndFetchDetails = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          withCredentials: true,
        });

        const username = res.data.username;

        if (!username) return;

        const detailsRes = await axios.post(`${BACKEND_URL}/api/v1/user/getdetails`, { username });
        
        setuser(detailsRes.data.user);
        setdetails(detailsRes.data.details);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/login");
        } else {
          console.log("Auth failed:", err);
        }
      }
    };

    haveTokenAndFetchDetails();
  }, []);


  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white font-poppins">

      <Navbar></Navbar>
  
      <div className="pt-32 px-5 max-w-5xl mx-auto space-y-16">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Welcome Back, {user?.firstName || "User"}!
          </h1>
          <p className="text-gray-400 text-lg">Explore your quiz journey and challenge yourself!</p>
        </div>
  
        <QuickStats details={details}/>

        <div className="flex justify-center my-16">
          <a href="/quiz">
            <button 
              className="text-xl bg-gradient-to-r from-cyan-900 via-blue-800 to-purple-900 text-cyan-300 font-poppins font-bold px-16 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 border-2 border-cyan-700 hover:border-cyan-500 hover:text-cyan-200"
            >
              TAKE A NEW QUIZ
            </button>
          </a>
        </div>

  
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">Difficulty Distribution</h2>
          <Distribution details={details} />
        </div>
  
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <QuizHistory details={details}></QuizHistory>
        </div>

      </div>

      <footer className="w-full bg-gray-900 text-white text-center p-5 mt-12">
        &copy; {new Date().getFullYear()} Quizzy. All Rights Reserved.
      </footer>

    </div>
  );
  
};

function Navbar(){
  const navigate = useNavigate();
  const logout = async () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('username');
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/logout`);
    if(res){
      navigate('/');
    }else{
      alert("Error loging out");
    }
  };
  return(
    <nav className="w-full bg-gray-800 shadow-lg p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/dashboard">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Quizzy
          </h1>
        </Link>
        <Button
          variant="outlined"
          onClick={logout}
          className="!border-2 !border-cyan-500 hover:!bg-gradient-to-r hover:!from-cyan-500 hover:!to-blue-600 !text-cyan-400 hover:!text-white !font-medium !px-4 !py-2 !rounded-lg flex items-center gap-2"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </nav>
  )
}

function QuickStats({details}){
  return(
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-xl text-gray-400 mb-1">Total Quizzes Taken</p>
            <p className="text-4xl font-bold text-cyan-400">{details?.quizesTaken || "0"}</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-gray-400 mb-1">Average Score</p>
            <p className="text-4xl font-bold text-cyan-400">{Number(details?.averageScore.toFixed(2)) || "0"}</p>
          </div>
    </div>
  )
}

function QuizHistory({details}){
  return(
    <>
    <h2 className="text-3xl font-bold text-cyan-400 mb-6">Quiz History</h2>
          {details?.quizzes?.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between text-cyan-300 font-semibold border-b border-cyan-700 pb-2">
                <div className="w-1/5">Topic</div>
                <div className="w-1/5">Questions</div>
                <div className="w-1/5">Difficulty</div>
                <div className="w-1/5">Marks</div>
                <div className="w-1/5">Date</div>
              </div>
              {details.quizzes.map((item, index) => (
                <div key={index} className="flex justify-between bg-gray-700 p-4 rounded-lg shadow-inner">
                  <div className="w-1/5">{item.topic.toUpperCase()}</div>
                  <div className="w-1/5 px-5">{item.numques}</div>
                  <div className="w-1/5">{item.difficulty}</div>
                  <div className="w-1/5 px-5">{item.marks}</div>
                  <div className="w-1/5">{item.date}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No quiz history available.</p>
          )}
    </>
  )
}

function Distribution({details}) {  //destructring 
  
  const [easy,seteasy] = useState(0);
  const [medium,setmedium] = useState(0);
  const [hard,sethard] = useState(0);


  useEffect(()=>{
    if(details?.quizzes?.length){
      let e=0,m=0,h=0;
    details.quizzes.map(item => {
      if(item.difficulty === "Easy") e++;
      else if(item.difficulty === "Medium") m++;
      else if(item.difficulty === "Hard") h++;
    });

    seteasy(e);
    setmedium(m);
    sethard(h);
  }
  },[details])

  return (
    
    <DistributionChart easy={easy} medium={medium} hard={hard} />
  );
}

export default Dashboard;
