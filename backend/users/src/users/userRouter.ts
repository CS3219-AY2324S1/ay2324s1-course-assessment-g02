import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../../lib/prisma';

const userRouter = express.Router();
export default userRouter;

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
        userFriends1: true,
        userFriends2: true,
        attemptedQuestion1: true,
        attemptedQuestion2: true,
        badges: true
      }
    });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    res.status(200).json(user);
  })
);

// Get id from userId
userRouter.get(
  '/userId/:userId',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        userId: req.params.userId
      }
    });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    res.status(200).json(user.id);
  })
);

// Create user
userRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, email } = req.body;

    const newUser = await prisma.user.create({
      data: {
        userId,
        email
      }
    });

    // Respond with a success message
    res.status(201).json({
      message: 'user created successfully',
      user: newUser
    });
  })
);

// Update user's username, userId, and/or email
// Doesn't include friends, attempted questions, or badges
// Expect different routes for that
userRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { username, userId, email } = req.body;
    const id = Number(req.params.id);

    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      res.status(404).json({ message: 'user not found' });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: username || existingUser.username,
        userId: userId || existingUser.userId,
        email: email || existingUser.email
      }
    });

    res.status(200).json({
      message: 'user updated successfully',
      user: updatedUser
    });
  })
);

// Delete user
userRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deletedUser = await prisma.user.delete({
      where: { id }
    });

    if (!deletedUser) {
      res.status(404).json({ message: 'user not found' });
      return;
    }

    res.status(200).json({ message: 'user deleted successfully' });
  })
);