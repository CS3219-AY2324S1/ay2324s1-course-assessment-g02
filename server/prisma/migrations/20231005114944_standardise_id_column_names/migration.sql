/*
  Warnings:

  - The primary key for the `AttemptedQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attemptId` on the `AttemptedQuestions` table. All the data in the column will be lost.
  - The primary key for the `Badges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `badgeId` on the `Badges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AttemptedQuestions" DROP CONSTRAINT "AttemptedQuestions_pkey",
DROP COLUMN "attemptId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AttemptedQuestions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Badges" DROP CONSTRAINT "Badges_pkey",
DROP COLUMN "badgeId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Badges_pkey" PRIMARY KEY ("id");
