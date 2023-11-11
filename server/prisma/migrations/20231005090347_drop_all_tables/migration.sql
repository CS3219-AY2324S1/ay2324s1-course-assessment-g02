/*
  Warnings:

  - You are about to drop the `AttemptedQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Badges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFriends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttemptedQuestions" DROP CONSTRAINT "AttemptedQuestions_questionId_fkey";

-- DropForeignKey
ALTER TABLE "AttemptedQuestions" DROP CONSTRAINT "AttemptedQuestions_userId1_fkey";

-- DropForeignKey
ALTER TABLE "AttemptedQuestions" DROP CONSTRAINT "AttemptedQuestions_userId2_fkey";

-- DropForeignKey
ALTER TABLE "Badges" DROP CONSTRAINT "Badges_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFriends" DROP CONSTRAINT "UserFriends_userId1_fkey";

-- DropForeignKey
ALTER TABLE "UserFriends" DROP CONSTRAINT "UserFriends_userId2_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToQuestion" DROP CONSTRAINT "_CategoryToQuestion_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToQuestion" DROP CONSTRAINT "_CategoryToQuestion_B_fkey";

-- DropTable
DROP TABLE "AttemptedQuestions";

-- DropTable
DROP TABLE "Badges";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "Questions";

-- DropTable
DROP TABLE "UserFriends";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "_CategoryToQuestion";

-- DropEnum
DROP TYPE "BadgeTypes";

-- DropEnum
DROP TYPE "Complexity";
