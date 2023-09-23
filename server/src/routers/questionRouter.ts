import express, { Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import QuestionModel from '../models/question';

export const questionRouter = express.Router();

questionRouter.get('/', 
    asyncHandler(async (req: Request, res: Response) => {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    })
);