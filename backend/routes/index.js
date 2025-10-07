// const express = require("express");
// const userRouter = require("./user");
import express from "express"
import userRouter from "./user.js"

const router = express.Router();

router.use("/user",userRouter);

export default router;
