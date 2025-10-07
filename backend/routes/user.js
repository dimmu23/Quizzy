import express, { application } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import  zod  from "zod";
import {User,Quiz} from "../db.js"; // Add `.js` extension to imports
import jwt from "jsonwebtoken";
import JWT_SECRET  from "../config.js";
import middleware from "../middleware.js";
import cookieParser from "cookie-parser";

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(8)
});

router.post("/signup",async (req,res) => {
    
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(404).json({
            message: "Invalid Inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(404).json({
            message: "username already exits"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'None',  // allows cross-origin usage
        secure: true       // required when sameSite is 'None'
    });


    res.status(200).json({
        message: "User created successfully",
        //token: token
    })
})

const siginBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin",async (req,res)=>{
    const {success} = siginBody.safeParse(req.body);
    
    if(!success){
        return res.status(404).json({
            message: "User doesn't exist"
        })
    }
    
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    
    if(!user){
        return res.status(404).json({
            message: "User doesn't exist"
        })
    }

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'None',  // allows cross-origin usage
        secure: true       // required when sameSite is 'None'
    });

    return res.status(200).json({
        message: "Signin successfully"
    });
})

router.post('/getdetails',async (req,res)=>{
    try{
        const user = await User.findOne({
            username: req.body.username
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const details = await Quiz.findOne({id: user._id});

        return res.status(202).json({
            user,
            details
        });
    }
    catch{
        return res.status(500).json({
            error: "Server Error"
        })
    }
})


router.post('/insertquizdata', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const temp = await Quiz.findOne({ id: user._id });

    if (temp) {
      temp.quizesTaken += 1;
      temp.averageScore = ((temp.averageScore * (temp.quizesTaken - 1)) + req.body.marks) / temp.quizesTaken;
      temp.quizzes.push({
        topic: req.body.topic,
        numques: req.body.numques,
        difficulty: req.body.difficulty,
        marks: req.body.marks
      });
      await temp.save();
      console.log("Quiz updated");
    } else {
      await Quiz.create({
        id: user._id,
        quizesTaken: 1,
        averageScore: req.body.marks,
        quizzes: [
          {
            topic: req.body.topic,
            numques: req.body.numques,
            difficulty: req.body.difficulty,
            marks: req.body.marks
          }
        ]
      });
      console.log("New quiz document created");
    }

    res.status(200).json({ msg: "Quiz data inserted successfully" });
  } catch (error) {
    console.error("Error inserting quiz data:", error);
    res.status(500).json({ msg: "Error inserting quiz data" });
  }
});
 

function getPrompt(topic,numques,difficulty){
    const prompt = `Create a quiz with ${numques} questions on the topic of ${topic}, each question having 4 options, with ${difficulty} difficulty. Return the response in the following format:

    {
      "title": "Quiz Title",
      "instructions": "Quiz Instructions",
      "questions": [
        {
          "questionNumber": 1,
          "question": "The question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Correct Option"
        },
        ...
      ]
    }`;

    return prompt;
}

router.post("/genratequiz", middleware,async (req, res) => { 
    const genAI = new GoogleGenerativeAI("AIzaSyAU5dtpb83lzs8qeg5PKlarEzJFlqamMY0");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const { topic, numques, difficulty } = req.body;

        if (!topic || !numques || !difficulty) {
            return res.status(400).json({ error: "Missing required fields: topic, numques, or difficulty." });
        }

        const prompt = getPrompt(topic,numques,difficulty);

        const result = await model.generateContent(prompt);
        
        const rawquiz = result.response.text();

        const cleanquiz = rawquiz.replace("```json\n", "").replace("\n```", "");
        
        const parsedquiz = JSON.parse(cleanquiz);

        res.json({ quiz: parsedquiz }); 
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
});


router.post("/logout", (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout successfully"
    })
})

router.get("/me",async (req,res)=>{
    const token = req.cookies.token;

    if (!token) return res.status(401).send("Token missing");

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        
        const user = await User.findOne({
            _id: decoded.userId
        })
        
        
        res.json({
            username: user.username
        });
    }catch{
        res.status(401).send("Invalid token");
    }
}); 


export default router;