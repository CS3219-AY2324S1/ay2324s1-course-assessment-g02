import express, { Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import QuestionModel from '../models/question';

export const questionRouter = express.Router();

// read questions
questionRouter.get('/', 
    asyncHandler(async (req: Request, res: Response) => {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    })
);

// create question
questionRouter.post('/',
    asyncHandler(async (req: Request, res: Response) => {
        const { title, description, categories, complexity } = req.body;

        // Create a new question
        const newQuestion = new QuestionModel({
          title,
          description,
          categories,
          complexity,
        });
  
        // Save the question to the database
        await newQuestion.save();
  
        // Respond with a success message
        res.status(201).json({ message: 'Question created successfully', question: newQuestion });
    })
);

// update question
questionRouter.put('/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { title, description, categories, complexity } = req.body;
        const question = await QuestionModel.findById(req.params.id);

        if (question) {
            question.title = title || question.title;
            question.description = description || question.description;
            question.categories = categories || question.categories;
            question.complexity = complexity || question.complexity;

            const updatedQuestion = await question.save();
            res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
        } else {
            res.status(404);
            throw new Error('Question not found');
        }
    })
);

// delete question
questionRouter.delete('/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const question = await QuestionModel.findByIdAndDelete(req.params.id);

        if (question) {
            res.status(200).json({ message: 'Question deleted successfully' });
        } else {
            res.status(404);
            throw new Error('Question not found');
        }
    })
);