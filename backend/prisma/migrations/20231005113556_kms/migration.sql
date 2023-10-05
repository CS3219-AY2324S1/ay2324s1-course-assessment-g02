-- CreateEnum
CREATE TYPE "Language" AS ENUM ('C', 'Cpp', 'Java', 'Python', 'Javascript', 'Typescript', 'Rust', 'Go', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'Haskell', 'Clojure', 'Lua', 'Perl', 'PHP', 'R', 'Dart', 'Julia', 'Cobol', 'Fortran', 'Lisp', 'Prolog', 'Bash', 'Assembly', 'SQL', 'HTML', 'CSS', 'Other');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "preferredComplexity" "Complexity" NOT NULL DEFAULT 'Easy',
ADD COLUMN     "preferredLanguage" "Language" NOT NULL DEFAULT 'Python';
