import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import QuestionModel from './models/question';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5050;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/questions', async (req: Request, res: Response) => {
    const questions = await QuestionModel.find().exec();
    res.status(200).json(questions);
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('Connected to Mongoose')
    })
    .catch(
        err => console.log(err)
    );

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
