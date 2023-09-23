import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { dummyQuestionData } from './data';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5050;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
});

app.get('/api/questions', (req: Request, res: Response) => {
    res.json(
        dummyQuestionData
    )
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('Connected to Mongoose')
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(
        err => console.log(err)
    );
