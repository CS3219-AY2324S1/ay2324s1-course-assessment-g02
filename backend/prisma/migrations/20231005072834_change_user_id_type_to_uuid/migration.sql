/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `userId1` on the `AttemptedQuestions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId2` on the `AttemptedQuestions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Badges` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId1` on the `UserFriends` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId2` on the `UserFriends` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
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

-- AlterTable
ALTER TABLE "AttemptedQuestions" DROP COLUMN "userId1",
ADD COLUMN     "userId1" UUID NOT NULL,
DROP COLUMN "userId2",
ADD COLUMN     "userId2" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Badges" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "UserFriends" DROP COLUMN "userId1",
ADD COLUMN     "userId1" UUID NOT NULL,
DROP COLUMN "userId2",
ADD COLUMN     "userId2" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "UserFriends" ADD CONSTRAINT "UserFriends_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriends" ADD CONSTRAINT "UserFriends_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badges" ADD CONSTRAINT "Badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptedQuestions" ADD CONSTRAINT "AttemptedQuestions_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptedQuestions" ADD CONSTRAINT "AttemptedQuestions_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
