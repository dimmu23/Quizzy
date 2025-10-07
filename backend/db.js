import mongoose, { Mongoose } from "mongoose";

mongoose.connect("mongodb+srv://deveshparyani17:4aqolemn@admin.sx4z291.mongodb.net/");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength:8
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

export const User = mongoose.model('User',userSchema);

const quizSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizesTaken: {
        type: Number
    },
    averageScore: {
        type: Number
    },
    quizzes:[
        {
            topic: {
                type: String
            },
            numques: {
                type: String
            },
            difficulty: {
                type: String
            },
            marks: {
                type: Number
            },
            date: { type: Date, default: Date.now }
        }
    ]
})

export const Quiz = mongoose.model('Quizz',quizSchema);
