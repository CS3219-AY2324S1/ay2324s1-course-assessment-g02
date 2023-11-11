/*
  Warnings:

  - Added the required column `attempts` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratings` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solves` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BadgeTypes" AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "attempts" INTEGER NOT NULL,
ADD COLUMN     "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ratings" INTEGER NOT NULL,
ADD COLUMN     "solves" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Badges" (
    "badgeId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeLink" TEXT NOT NULL,
    "badge" "BadgeTypes" NOT NULL,

    CONSTRAINT "Badges_pkey" PRIMARY KEY ("badgeId")
);

-- CreateTable
CREATE TABLE "AttemptedQuestions" (
    "attemptId" SERIAL NOT NULL,
    "userId1" INTEGER NOT NULL,
    "userId2" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttemptedQuestions_pkey" PRIMARY KEY ("attemptId")
);

-- AddForeignKey
ALTER TABLE "Badges" ADD CONSTRAINT "Badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptedQuestions" ADD CONSTRAINT "AttemptedQuestions_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptedQuestions" ADD CONSTRAINT "AttemptedQuestions_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptedQuestions" ADD CONSTRAINT "AttemptedQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
