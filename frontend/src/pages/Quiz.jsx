import { Button, CircularProgress, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Dropdown from "../components/Dropdown";
import { Heading } from "../components/Heading";
import { BACKEND_URL } from "../confing";

const Quiz = () => {
  const [isauthenticated, setisauthenticated] = useState(null);
  //const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function check (){
    const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`,{
      withCredentials: true
    });
    if(res){
      return true;
    }else{
      return false;
    }
  }

  useEffect(() => {
    if (!check) {
      setisauthenticated(false);
      navigate("/login");
    } else {
      setisauthenticated(true);
    }
  }, [navigate]);

  const [quizData, setquizData] = useState(null);
  const [currQues, setcurrQues] = useState(0);
  const [isattempting, setisattempting] = useState(false);
  const [isQuizgen, setisQuizgen] = useState(false);
  const [isfinish, setisfinish] = useState(false);
  const [topic, settopic] = useState("");
  const [numques, setnumques] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [answer, setanswer] = useState([]);
  const [marks, setmarks] = useState(0);
  const [loading, setloading] = useState(false);


  const genratequiz = async () => {
    setloading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/genratequiz`,
        { topic, numques, difficulty }, 
        {
          withCredentials: true,    
        }
      );
      setquizData(response.data.quiz);
      setisQuizgen(true);
    } catch (error) {
      if (error.response?.status === 400) alert(error.response.data.error);
    } finally {
      setloading(false);
    }
  };

  const calculatemarks = () => {
    if (!quizData || !quizData.questions) {
      console.error("quizData or questions missing.");
      return 0;
    }
    let temp = 0;
    const length = Math.min(answer.length,quizData.questions.length);
    for (let i = 0; i < length; i++) {
      if (answer[i] === quizData.questions[i].answer) {
        temp++;
      }
    }
    setmarks(temp);
    return temp;
  };

  const insertquizdata = async (topic,numques,difficulty,marks)=>{
    try{
      await axios.post(`${BACKEND_URL}/api/v1/user/insertquizdata`,
        {
          topic,
          numques,
          difficulty,
          marks
        },{
          withCredentials: true
        }
      )
    }catch(error){
      console.log(error);  
    }
  }

  const handlequiz = async () => {
    if (currQues < quizData.questions.length - 1) {
      setcurrQues(currQues + 1);
    } else {
      const marks = calculatemarks();
      setisfinish(true);
      setcurrQues(0);
      setisattempting(false);
      setisQuizgen(false);
      await insertquizdata(topic,numques,difficulty,marks);
    }
  };

  return (
    <>
      {/* Enhanced Navbar */}
      <nav className="w-full bg-gray-900 shadow-xl p-4 flex justify-between items-center fixed top-0 left-0 z-50 border-b border-cyan-800/30">
        <Link to="/dashboard">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
      </nav>
  
      {/* Enhanced Main Content */}
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-white px-4 pt-24 pb-12">
        {isfinish ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-lg flex flex-col justify-center items-center text-center border border-gray-700"
          >
            <div className="mb-6 w-full">
              <Heading label={`Score: ${marks}/${numques}`} />
              <div className="mt-2 h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500" 
                  style={{ width: `${(marks/numques) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-8 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-orange-500 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
            >
              Return to Dashboard
            </button>
  
            <div className="mt-2 w-full text-left space-y-6">
              <h2 className="text-xl font-semibold text-cyan-300 mb-2">Question Review</h2>
              {quizData.questions.map((question, index) => {
                const isCorrect = answer[index] === question.answer;
                return (
                  <div key={index} className="bg-gray-700/80 p-5 rounded-xl shadow-md border border-gray-600">
                    <h3 className="text-lg font-medium mb-3 text-white">
                      {index + 1}. {question.question}
                    </h3>
  
                    <div className="mt-3 space-y-2">
                      {question.options.map((opt, optIndex) => {
                        let optStyle = "bg-gray-600 text-white border-gray-500";
  
                        if (opt === question.answer) {
                          optStyle = "bg-green-600/90 text-white border-green-500";
                        } else if (opt === answer[index] && !isCorrect) {
                          optStyle = "bg-red-600/90 text-white border-red-500";
                        }
  
                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg ${optStyle} border shadow-sm transition-all`}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-lg flex flex-col justify-between items-center text-center border border-gray-700"
          >
            {isQuizgen ? (
              isattempting ? (
                <>
                  <div className="w-full mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <Heading label={`Question ${currQues + 1}`} />
                      <span className="text-sm font-medium text-gray-400">{currQues + 1}/{quizData.questions.length}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 rounded-full mb-4">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" 
                        style={{ width: `${((currQues + 1)/quizData.questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium p-5 bg-gray-700/80 rounded-xl shadow-md w-full text-gray-100 mt-2 mb-6 border border-gray-600">
                    {quizData.questions[currQues].question}
                  </p>
                  <div className="w-full mb-6">
                    <Dropdown
                      value="Select your answer"
                      arr={quizData.questions[currQues].options}
                      change={(e) => {
                        const updatedAns = [...answer];
                        updatedAns[currQues] = e.target.value;
                        setanswer(updatedAns);
                      }}
                    />
                  </div>
                  <button
                    onClick={handlequiz}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
                  >
                    {currQues === quizData.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </button>
                </>
              ) : (
                <>
                  <div className="w-full text-center mb-6">
                    <Heading label="Ready to Begin!" />
                    <p className="text-gray-300 mt-2">Your quiz has been generated successfully.</p>
                  </div>
                  <div className="w-full space-y-4 mb-6">
                    <div className="bg-gray-700/60 p-4 rounded-lg flex justify-between items-center">
                      <span className="text-gray-300">Topic:</span>
                      <span className="font-medium text-cyan-300">{topic}</span>
                    </div>
                    <div className="bg-gray-700/60 p-4 rounded-lg flex justify-between items-center">
                      <span className="text-gray-300">Questions:</span>
                      <span className="font-medium text-cyan-300">{numques}</span>
                    </div>
                    <div className="bg-gray-700/60 p-4 rounded-lg flex justify-between items-center">
                      <span className="text-gray-300">Difficulty:</span>
                      <span className="font-medium text-cyan-300">{difficulty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setisattempting(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
                  >
                    Start Quiz
                  </button>
                </>
              )
            ) : (
              <>
                <div className="w-full text-center mb-6">
                  <Heading label="Create Quiz" />
                  <p className="text-gray-300 mt-1">Customize your quiz settings below</p>
                </div>
                <div className="w-full space-y-5">
                  <input
                    type="text"
                    placeholder="Enter topic"
                    onChange={(e) => settopic(e.target.value)}
                    className="w-full p-4 border border-gray-600 bg-gray-700/70 text-white rounded-lg focus:border-cyan-500 focus:ring focus:ring-cyan-300/30 transition placeholder-gray-400"
                  />
  
                  <Dropdown
                    value="Number of questions"
                    arr={["5", "10"]}
                    change={(e) => setnumques(e.target.value)}
                    className="mb-1"
                  />
                  <Dropdown
                    value="Difficulty"
                    arr={["Easy", "Medium", "Hard"]}
                    change={(e) => setdifficulty(e.target.value)}
                    className="mb-2"
                  />
                  <button
                    onClick={genratequiz}
                    className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold text-white rounded-lg shadow-lg w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <CircularProgress size={20} color="inherit" />
                        Generating Quiz...
                      </span>
                    ) : (
                      "Generate Quiz"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};



export default Quiz;
