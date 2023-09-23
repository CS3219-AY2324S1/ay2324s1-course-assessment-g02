import express, { Request, Response } from "express";
import {dummyQuestionData} from './data';

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

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});