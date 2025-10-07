import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import Lottie from "lottie-react"; // For animated graphics
import quizAnimation from "../assets/quiz-animation.json"; // Example Lottie animation
import { useState } from "react";
import { LogIn } from "lucide-react";
import {Brain, Target, BarChart3, Trophy} from "lucide-react";
import { BACKEND_URL } from "../confing";
import axios from "axios";

const LandingPage = () => {

  const [isLogin,setisLogin] = useState(false);
  const navigate = useNavigate();

  // const check = ()=>{
  //   const t = localStorage.getItem('token');
  //   if(t){
  //     navigate('/dashboard');
  //     setisLogin(true);
  //   }else{
  //     navigate('/login');
  //   }
  // }

  async function check (){
    try{
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`,{
        withCredentials: true
      });
      console.log(res);
      navigate('/dashboard');
      setisLogin(true);
      navigate('/login');
    }
    catch(error){
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col justify-between overflow-hidden text-white">
      
      <nav className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/home">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
        <div className="flex space-x-6">
          <Link to="/login">
            <Button
              variant="outlined"
              className="!border-2 !border-cyan-500 hover:!bg-gradient-to-r hover:!from-cyan-500 hover:!to-blue-600 !text-cyan-400 hover:!text-white !font-medium !px-4 !py-2 !rounded-lg flex items-center gap-2"
            >
              <span>Login</span>
              <LogIn className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="outlined"
              className="!border-2 !border-cyan-500 hover:!bg-gradient-to-r hover:!from-cyan-500 hover:!to-blue-600 !text-cyan-400 hover:!text-white !font-medium !px-4 !py-2 !rounded-lg flex items-center gap-2"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-16"
      >
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-cyan-400 mb-6 mt-6">
            Unleash Your Knowledge with <span className="text-purple-400">AI-Powered Quizzes!</span>
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Create personalized quizzes on any topic with the power of AI. Learn,
            challenge, and improve—all in one place!
          </p>
          <div className="mt-8">   
            <button 
              onClick={check}
              className="text-xl bg-gradient-to-r from-cyan-900 via-blue-800 to-purple-900 text-cyan-300 font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 border-2 border-cyan-700 hover:border-cyan-500 hover:text-cyan-200"
            >
              GET STARTED
            </button>  
          </div>
        </div>
        <div className="mt-12 w-full max-w-2xl">
          <Lottie animationData={quizAnimation} loop={true} />
        </div>
      </motion.div>

     
      <div className="mt-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-14 font-poppins">
          Why Choose Quizzy?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "AI-Powered Quizzes",
              desc: "Generate unique quiz questions instantly.",
              icon: <Brain className="w-12 h-12 text-purple-400" />,
            },
            {
              title: "Customizable Difficulty",
              desc: "Choose the level that matches your skills.",
              icon: <Target className="w-12 h-12 text-cyan-400" />
            },
            {
              title: "Instant Feedback",
              desc: "Get detailed insights and explanations.",
              icon: <BarChart3 className="w-12 h-12 text-pink-400" />
            },
            {
              title: "Interactive & Engaging",
              desc: "Challenge yourself and track progress.",
              icon: <Trophy className="w-12 h-12 text-yellow-400" />,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl text-center shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4 animate-pulse">
                <div className="mb-6 flex justify-center items-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-cyan-300 font-poppins">
                {feature.title}
              </h3>
              <p className="text-gray-400 mt-3 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    <div className="mt-28 bg-gradient-to-r from-cyan-900 via-blue-800 to-purple-900 text-cyan-300 py-16 text-center rounded-t-xl shadow-inner">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
        Start your AI-powered quiz journey today!
      </h2>
      <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto font-medium px-4">
        Join thousands of learners who are already improving their knowledge with Quizzy. Sign up now and get started in seconds!
      </p>

      <div className="flex justify-center gap-6">
        <Link to="/signup">
          <button className="bg-white text-purple-700 hover:bg-purple-100 font-bold px-8 py-4 rounded-xl text-lg shadow-md transition-all duration-300">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold px-8 py-4 rounded-xl text-lg shadow-md transition-all duration-300">
            Login
          </button>
        </Link>
      </div>
    </div>


      <footer className="w-full bg-gray-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Quizzy. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
