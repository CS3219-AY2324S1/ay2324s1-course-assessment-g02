import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const MAX_NUM_QUESTIONS = 100;
// const BLANK_QUESTION_BODY = '';
const QUESTIONS_CSV_FILES_PATH = './src/data/questions';

interface QuestionCSVRow {
  QID: string;
  title: string;
  difficulty: string;
  topicTags: string[];
}

interface QuestionBodyCSVRow {
  QID: string;
  Body: string;
}

export async function parseCSVToQuestionsData(): Promise<QuestionCSVRow[]> {
  return new Promise((resolve, reject) => {
    const prisma = new PrismaClient();
    const questionsData: QuestionCSVRow[] = [];
    const csvFilePath = path.join(QUESTIONS_CSV_FILES_PATH, 'questions.csv');
    let numQuestionsAdded = 0;

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        if (
          numQuestionsAdded >= MAX_NUM_QUESTIONS ||
          row.QID === '' ||
          row.title === '' ||
          row.topicTags === '' ||
          row.difficulty === ''
        ) {
          return;
        }
        try {
          const tags = row.topicTags.split(',');
          questionsData.push({
            QID: row.QID,
            title: row.title,
            difficulty: row.difficulty,
            topicTags: tags
          });
          // await prisma.question.create({
          //   data: {
          //     title: row.title,
          //     complexity: row.difficulty,
          //     categories: tags,
          //     body: BLANK_QUESTION_BODY
          //   }
          // });
          numQuestionsAdded += 1;
        } catch (error) {
          reject(error);
        }
      })
      .on('end', async () => {
        // console.log(questionsData);
        await prisma.$disconnect();
        resolve(questionsData);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export async function parseCSVToQuestionBodies(): Promise<
  QuestionBodyCSVRow[]
> {
  return new Promise((resolve, reject) => {
    const prisma = new PrismaClient();
    const bodiesData: QuestionBodyCSVRow[] = [];
    const csvFilePath = path.join(
      QUESTIONS_CSV_FILES_PATH,
      'questionsbody.csv'
    );
    let numQuestionsAdded = 0;

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        if (
          numQuestionsAdded >= MAX_NUM_QUESTIONS ||
          row.QID === '' ||
          row.Body === ''
        ) {
          return;
        }
        try {
          bodiesData.push({
            QID: row.QID,
            Body: row.Body
          });
          // await prisma.question.update({
          //   where: {
          //     id: Number(row.QID) // Convert QID to a number
          //   },
          //   data: {
          //     body: row.Body
          //   }
          // });

          numQuestionsAdded += 1;
        } catch (error) {
          reject(error);
        }
      })
      .on('end', async () => {
        // console.log(questionsData);
        await prisma.$disconnect();
        resolve(bodiesData);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
