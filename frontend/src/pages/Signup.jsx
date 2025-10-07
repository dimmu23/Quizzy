import { MyButton } from "../components/MyButton";
import { Text } from "../components/text";
import { Heading } from "../components/Heading";
import { useState } from "react";
import axios from "axios";
import { Password } from "../components/Password";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import { BACKEND_URL } from "../confing";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username,
        firstName: firstname,
        lastName: lastname,
        password,
      },{
        withCredentials: true
      });
      //localStorage.setItem("token", response.data.token);
      //localStorage.setItem("username",username);
      navigate("/dashboard");
    } catch (error) {
      alert("Error Signing Up");
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      
      <nav className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link to="/home">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Quizzy
          </h1>
        </Link>
      </nav>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center mt-20 border border-gray-700 transition-all duration-500 hover:shadow-purple-700/30 w-full max-w-md ">
       
        <div className="text-center mb-6">
          <Heading label="Sign Up" />
        </div>
      
        <div className="flex flex-col items-center space-y-4">
          <Text label="First Name" change={(e) => setFirstname(e.target.value)} />
          <Text label="Last Name" change={(e) => setLastname(e.target.value)} />
          <Text label="Username" change={(e) => setUsername(e.target.value)} />
          <Password change={(e) => setPassword(e.target.value)} />
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleSignup}
            className="w-40 bg-gray-700 hover:bg-gray-600  
            hover:text-white text-lg font-semibold py-3 rounded-xl 
            shadow-md hover:shadow-cyan-500/20 transition-all 
            duration-300 ease-in-out transform hover:scale-105 border border-gray-600"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-400 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


