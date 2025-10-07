// const JWT_SECRET = require("./config");
// const jwt = require("jsonwebtoken");
import JWT_SECRET from "./config.js";
import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
    // const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startsWith('Bearer')){
    //     return res.status(404).json({});
    // }

    // const token = authHeader.split(' ')[1];

    const token = req.cookies.token;

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userID = decoded;
        next();
    }catch(err){
        return res.status(404).json({});
    }
}


export default authMiddleware;