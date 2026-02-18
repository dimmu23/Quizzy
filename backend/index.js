// const express = require("express");
// const cors = require('cors');
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    //origin: "https://quizzy-beryl-one.vercel.app"
      origin: "https://quizzy-black-nine.vercel.app/"
}));
app.use(express.json());


import mainrouter from "./routes/index.js";

app.use("/api/v1",mainrouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

