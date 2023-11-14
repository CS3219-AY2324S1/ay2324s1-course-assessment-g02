/*
  Warnings:

  - The values [Typescript,Rust,Swift,Kotlin,Scala,Haskell,Clojure,Lua,Perl,PHP,R,Dart,Julia,Cobol,Fortran,Lisp,Prolog,Bash,Assembly,SQL,HTML,CSS,Other] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `attemptedAt` on the `AttemptedQuestions` table. All the data in the column will be lost.
  - You are about to drop the `Badges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFriends` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `userId1` on the `AttemptedQuestions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId2` on the `AttemptedQuestions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('C', 'Cpp', 'Java', 'Python', 'Javascript', 'Go', 'Ruby');
ALTER TABLE "Users" ALTER COLUMN "preferredLanguage" DROP DEFAULT;
ALTER TABLE "Users" ALTER COLUMN "preferredLanguage" TYPE "Language_new" USING ("preferredLanguage"::text::"Language_new");
ALTER TABLE "AttemptedQuestions" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
ALTER TABLE "Users" ALTER COLUMN "preferredLanguage" SET DEFAULT 'Python';
COMMIT;

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
ALTER TABLE "AttemptedQuestions" DROP COLUMN "attemptedAt",
DROP COLUMN "userId1",
ADD COLUMN     "userId1" INTEGER NOT NULL,
DROP COLUMN "userId2",
ADD COLUMN     "userId2" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Badges";

-- DropTable
DROP TABLE "UserFriends";

-- DropEnum
DROP TYPE "BadgeTypes";

-- AddForeignKey
ALTER TABLE "AttemptedQuestions" ADD CONSTRAINT "AttemptedQuestions_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptedQuestions" ADD CONSTRAINT "AttemptedQuestions_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
