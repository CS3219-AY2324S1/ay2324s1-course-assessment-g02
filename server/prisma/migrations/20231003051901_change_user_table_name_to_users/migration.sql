/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

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

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

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
