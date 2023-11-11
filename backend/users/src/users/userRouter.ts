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
        // userFriends1: true,
        // userFriends2: true,
        attemptedQuestion1: true,
        attemptedQuestion2: true
        // badges: true
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
        // userFriends1: true,
        // userFriends2: true,
        attemptedQuestion1: {
          include: {
            question: {
              select: {
                id: true,
                title: true,
                body: true,
                complexity: true
              }
            },
            user1: {
              select: {
                username: true,
                email: true,
                id: true
              }
            },
            user2: {
              select: {
                username: true,
                email: true,
                id: true
              }
            }
          }
        },
        attemptedQuestion2: {
          include: {
            question: {
              select: {
                id: true,
                title: true,
                body: true,
                complexity: true
              }
            },
            user1: {
              select: {
                username: true,
                email: true,
                id: true
              }
            },
            user2: {
              select: {
                username: true,
                email: true,
                id: true
              }
            }
          }
        }
        // badges: true
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

// must be below /userId/:userId route
userRouter.get(
  '/:id/attempts',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        attemptedQuestion1: {
          include: {
            question: true
          }
        },
        attemptedQuestion2: {
          include: {
            question: true
          }
        }
      }
    });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    const combinedAttempts = [
      ...user.attemptedQuestion1,
      ...user.attemptedQuestion2
    ];

    res.status(200).json(combinedAttempts);
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
    const { username, preferredLanguage, preferredComplexity } = req.body;
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
        preferredLanguage: preferredLanguage || existingUser.preferredLanguage,
        preferredComplexity:
          preferredComplexity || existingUser.preferredComplexity
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
