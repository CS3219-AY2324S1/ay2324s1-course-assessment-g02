import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Complexity } from '@prisma/client';
import prisma from '../../lib/prisma';

const questionRouter = express.Router();
export default questionRouter;

interface QuestionUpdateData {
  title?: string;
  body?: string;
  complexity?: Complexity;
  categories?: {
    set: { id: number }[]; // Array of category IDs for the 'set' operation
  };
}

// Get all questions
questionRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const questions = await prisma.question.findMany({
      include: {
        categories: true
      }
    });
    res.status(200).json(questions);
  })
);

// Get one question
questionRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const question = await prisma.question.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        categories: true
      }
    });
    res.json(question);
  })
);

// Create question
questionRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { title, body, categories, complexity } = req.body;

    const newQuestion = await prisma.question.create({
      data: {
        title,
        body,
        categories,
        complexity
      }
    });

    // Respond with a success message
    res.status(201).json({
      message: 'Question created successfully',
      question: newQuestion
    });
  })
);

// Update question
questionRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { title, body, categories, complexity } = req.body;
    const questionId = Number(req.params.id);

    const existingQuestion = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        categories: true
      }
    });

    if (!existingQuestion) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    // Prepare the data object for the update
    const updateData: QuestionUpdateData = {
      title: title || existingQuestion.title,
      body: body || existingQuestion.body,
      complexity: complexity || existingQuestion.complexity
    };

    if (categories && categories.length > 0) {
      const categoryIds = categories.map((category) => ({ id: category.id }));
      updateData.categories = {
        set: categoryIds
      };
    }

    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: updateData
    });

    res.status(200).json({
      message: 'Question updated successfully',
      question: updatedQuestion
    });
  })
);

// Delete question
questionRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const questionId = Number(req.params.id);

    const deletedQuestion = await prisma.question.delete({
      where: { id: questionId }
    });

    if (!deletedQuestion) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  })
);
