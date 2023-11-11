/*
  Warnings:

  - Added the required column `code` to the `AttemptedQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttemptedQuestions" ADD COLUMN     "code" TEXT NOT NULL;
