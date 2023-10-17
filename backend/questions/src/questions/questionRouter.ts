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

// add function to validate complexity
function validateComplexity(complexity: string): boolean {
  return (
    complexity === 'Easy' ||
    complexity === 'Medium' ||
    complexity === 'Hard'
  );
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

// Get one question that fits query parameters
questionRouter.get(
  '/random',
  asyncHandler(async (req: Request, res: Response) => {
    const complexity = req.query.complexity;
    if (!complexity || !validateComplexity(complexity as string)) {
      res.status(400).json({ message: 'Invalid complexity' });
      return;
    }

    const complexityEnum = complexity as Complexity;
    const questions = await prisma.question.findMany({
      where: {
        complexity: complexityEnum
      },
      include: {
        categories: true
      }
    });
    // return one random question
    const randomIndex = Math.floor(Math.random() * (questions.length - 1));
    res.status(200).json(questions[randomIndex]);
  })
)

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

// Add question attempt
questionRouter.post(
  '/attempts',
  asyncHandler(async (req: Request, res: Response) => {
    const { questionId, userId1, userId2 } = req.body;

    const newAttempt = await prisma.attemptedQuestion.create({
      data: {
        questionId,
        userId1,
        userId2
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
    const { code } = req.body;

    await prisma.attemptedQuestion.update({
      where: { id: Number(req.params.id) },
      data: {
        completedAt: new Date(),
        code: code
      }
    });

    const questionAttempt = await prisma.attemptedQuestion.findUnique({
      where: { id: Number(req.params.id) }
    });

    res.status(200).json({
      message: 'Question attempt marked completed successfully',
      questionAttempt: questionAttempt
    });
  })
);
