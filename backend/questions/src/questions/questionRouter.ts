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
  avgRating?: number;
  ratings?: number;
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
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.status(200).json(question);
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
        categories: {
          connect: categories.map((category: { id: number }) => ({
            id: category.id
          }))
        },
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
    const { title, body, categories, complexity, ratings } = req.body;
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
      complexity: complexity || existingQuestion.complexity,
      avgRating: ratings
        ? (existingQuestion.ratings * existingQuestion.avgRating + ratings) /
          (existingQuestion.ratings + 1)
        : existingQuestion.avgRating,
      ratings: ratings ? existingQuestion.ratings + 1 : existingQuestion.ratings
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

// This route should be above the /attempts/:id route to avoid conflict
// Get all question attempts for a user
questionRouter.get(
  '/attempts/users/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.userId);
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        attemptedQuestion1: true,
        attemptedQuestion2: true
      }
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const combinedAttempts = [
      ...user.attemptedQuestion1,
      ...user.attemptedQuestion2
    ];

    res.status(200).json(combinedAttempts);
  })
);

// Add question attempt
questionRouter.post(
  '/attempts',
  asyncHandler(async (req: Request, res: Response) => {
    const { questionId, userId1, userId2, code } = req.body;

    const newAttempt = await prisma.attemptedQuestion.create({
      data: {
        questionId,
        userId1,
        userId2,
        code
      }
    });

    // Respond with a success message
    res.status(201).json({
      message: 'Question attempt created successfully',
      questionAttempt: newAttempt
    });
  })
);

// Complete question attempt
questionRouter.put(
  '/attempts/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const questionAttempt = await prisma.attemptedQuestion.findUnique({
      where: { id: Number(req.params.id) }
    });
    await prisma.attemptedQuestion.update({
      where: { id: Number(req.params.id) },
      data: { completedAt: new Date() }
    });

    res.status(200).json({
      message: 'Question attempt marked completed successfully',
      questionAttempt: questionAttempt
    });
  })
);

// Get all question attempts
questionRouter.get(
  '/attempts',
  asyncHandler(async (req: Request, res: Response) => {
    const questionAttempts = await prisma.attemptedQuestion.findMany({});
    res.status(200).json(questionAttempts);
  })
);
