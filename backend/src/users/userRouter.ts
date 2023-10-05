import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../../lib/prisma';

const userRouter = express.Router();
export default userRouter;

// interface QuestionUpdateData {
//   title?: string;
//   body?: string;
//   complexity?: Complexity;
//   categories?: {
//     set: { id: number }[]; // Array of category IDs for the 'set' operation
//   };
// }

// Get all users
userRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      include: {
        userFriends1: true,
        userFriends2: true,
        attemptedQuestion1: true,
        attemptedQuestion2: true,
        badges: true
      }
    });
    res.status(200).json(users);
  })
);

// Get one user (this should be used for other users to view profile of that user?)
userRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        categories: true
      }
    });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    res.status(200).json(user);
  })
);

// Create user
userRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { title, body, categories, complexity } = req.body;

    const newQuestion = await prisma.user.create({
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
      message: 'user created successfully',
      user: newQuestion
    });
  })
);

// Update user
userRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { title, body, categories, complexity } = req.body;
    const questionId = Number(req.params.id);

    const existingQuestion = await prisma.user.findUnique({
      where: { id: questionId },
      include: {
        categories: true
      }
    });

    if (!existingQuestion) {
      res.status(404).json({ message: 'user not found' });
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

    const updatedQuestion = await prisma.user.update({
      where: { id: questionId },
      data: updateData
    });

    res.status(200).json({
      message: 'user updated successfully',
      user: updatedQuestion
    });
  })
);

// Delete user
userRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const questionId = Number(req.params.id);

    const deletedQuestion = await prisma.user.delete({
      where: { id: questionId }
    });

    if (!deletedQuestion) {
      res.status(404).json({ message: 'user not found' });
      return;
    }

    res.status(200).json({ message: 'user deleted successfully' });
  })
);
