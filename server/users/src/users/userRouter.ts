import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../../lib/prisma";

const userRouter = express.Router();
export default userRouter;

// Get all users
userRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  })
);

// Get one user (this should be used for other users to view profile of that user?)
userRouter.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json(user);
  })
);

userRouter.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, email, preferredComplexity, preferredLanguage } = req.body;
    const newUser = await prisma.user.create({
      data: {
        userId,
        email,
        preferredComplexity,
        preferredLanguage,
      },
    });
  })
);

// Get id from userId
userRouter.get(
  "/userId/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        userId: req.params.userId,
      },
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json(user.id);
  })
);

// Update user's username, userId, and/or email
// Doesn't include friends, attempted questions, or badges
// Expect different routes for that
userRouter.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, preferredLanguage, preferredComplexity } = req.body;
    const id = Number(req.params.id);

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: username || existingUser.username,
        preferredLanguage: preferredLanguage || existingUser.preferredLanguage,
        preferredComplexity:
          preferredComplexity || existingUser.preferredComplexity,
      },
    });

    res.status(200).json({
      message: "user updated successfully",
      user: updatedUser,
    });
  })
);

// Delete user
userRouter.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    res.status(200).json({ message: "user deleted successfully" });
  })
);
