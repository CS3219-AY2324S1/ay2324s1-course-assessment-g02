import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import prisma from '../../../lib/prisma';

const MAX_NUM_QUESTIONS = 100;
const QUESTIONS_CSV_FILES_PATH = './src/data/questions/csv';

interface QuestionCSVRow {
  QID: string;
  title: string;
  difficulty: string;
  topicTags: string[];
}
interface CategoriesCSVRow {
  topicTags: string[];
}

// Should be called before parseCSVToQuestionsData
export async function parseCSVToCategories(): Promise<CategoriesCSVRow[]> {
  await prisma.$connect();
  return new Promise((resolve, reject) => {
    const tagsData: CategoriesCSVRow[] = [];
    const csvFilePath = path.join(QUESTIONS_CSV_FILES_PATH, 'categories.csv');
    const categoriesSet = new Set<string>();
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        if (!row.topicTags || row.topicTags === '') {
          return;
        }
        try {
          const categories = row.topicTags.split(',');
          categories.forEach((category: string) => categoriesSet.add(category));
        } catch (error) {
          reject(error);
        }
      })
      .on('end', async () => {
        // add the categories to the database
        const promises = Array.from(categoriesSet).map((categoryName) =>
          prisma.category.create({
            data: {
              name: categoryName
            }
          })
        );
        // wait for creates to finish
        await Promise.all(promises);

        await prisma.$disconnect();

        // for testing purposes
        const categoriesCSVRow: CategoriesCSVRow = {
          topicTags: Array.from(categoriesSet)
        };
        tagsData.push(categoriesCSVRow);
        resolve(tagsData);
      })

      .on('error', (error) => {
        reject(error);
      });
  });
}

function isValidQuestionRow(row: QuestionCSVRow): boolean {
  const isDefined: boolean =
    row.QID !== undefined &&
    row.title !== undefined &&
    row.difficulty !== undefined;
  const isNotEmpty: boolean =
    row.QID !== '' && row.title !== '' && row.difficulty !== '';
  return isDefined && isNotEmpty;
}

// Should be called after parseCSVToCategories
export async function parseCSVToQuestions(): Promise<QuestionCSVRow[]> {
  await prisma.$connect();
  let numQuestionsAdded = 0;
  return new Promise((resolve, reject) => {
    const questionsData: QuestionCSVRow[] = [];
    const csvFilePath = path.join(
      QUESTIONS_CSV_FILES_PATH,
      'compiledQuestions.csv'
    );

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        if (numQuestionsAdded >= MAX_NUM_QUESTIONS) {
          return;
        }
        if (!isValidQuestionRow(row)) {
          console.log('INVALID QUESTION');
          console.log(row);
          return;
        }
        numQuestionsAdded += 1;

        try {
          let categoryNames: string[] = [];
          if (row.topicTags) {
            categoryNames = row.topicTags.split(',');
            console.log(categoryNames);
          }

          await prisma.question.create({
            data: {
              title: row.title,
              body: row.Body,
              complexity: row.difficulty,
              categories: {
                connect: categoryNames.map((categoryName) => ({
                  name: categoryName
                }))
              }
            }
          });
          console.log(numQuestionsAdded);
        } catch (error) {
          console.error('CSV processing error:', error);
          reject(error);
        }
      })
      .on('end', async () => {
        await prisma.$disconnect();

        resolve(questionsData);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
