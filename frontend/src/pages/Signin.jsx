import { MyButton } from "../components/MyButton";
import { Text } from "../components/text";
import { Heading } from "../components/Heading";
import { Password } from "../components/Password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../confing";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signinbutton = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true
        }
      );
      // localStorage.setItem("token", "Bearer " + response.data.token);
      //localStorage.setItem("username",username);
      navigate("/dashboard");
    } catch (error) {
      if(error.response == 404){
        alert("User not found");
      }
      console.error("Signin failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="w-full bg-gray-800 shadow-lg p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/home">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
      </nav>
  
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center mt-20 border border-gray-700 transition-all duration-500 hover:shadow-purple-700/30">
        <Heading label="Login" />
  
        <div className="space-y-5 mt-8">
          <Text
            label="Username"
            change={(e) => setUsername(e.target.value)}
          />
          <Password change={(e) => setPassword(e.target.value)} />
        </div>
  
        <div className="mt-8">
          <button
            onClick={signinbutton}
            className="w-40 bg-gray-700 hover:bg-gray-600  
            hover:text-white text-lg font-semibold py-3 rounded-xl 
            shadow-md hover:shadow-cyan-500/20 transition-all 
            duration-300 ease-in-out transform hover:scale-105 border border-gray-600"
          >
            Login
          </button>
        </div>
  
        <div className="mt-6 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-cyan-400 hover:underline hover:text-purple-400 transition-colors duration-200"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
  
};

export default Signin;
