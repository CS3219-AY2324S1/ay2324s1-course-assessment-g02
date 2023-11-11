// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function dropAllCategories() {
//   try {
//     // Use the .deleteMany method to delete all records in the Categories table
//     const deleteResult = await prisma.category.deleteMany({});
//     console.log(`Deleted ${deleteResult.count} categories.`);
//   } catch (error) {
//     console.error('Error dropping categories:', error);
//   } finally {
//     // Disconnect from the database when done
//     await prisma.$disconnect();
//   }
// }

// async function dropAllQuestions() {
//   try {
//     // Use the .deleteMany method to delete all records in the Questions table
//     const deleteResult = await prisma.question.deleteMany({});
//     console.log(`Deleted ${deleteResult.count} questions.`);
//   } catch (error) {
//     console.error('Error dropping questions:', error);
//   } finally {
//     // Disconnect from the database when done
//     await prisma.$disconnect();
//   }
// }

// // Call the function to drop all categories
// // dropAllCategories();
// // dropAllQuestions();
