import axios from 'axios';
import dotenv from 'dotenv';

export interface attemptSchema {
  questionId: number;
  userId1: number;
  userId2: number;
  code: string;
  language: string;
}

dotenv.config();

const questionsUrl = `http://${process.env.QUESTIONS_HOST}:${process.env.QUESTIONS_PORT}/questions/attempts`;

console.log(questionsUrl);

export async function createQuestionAttempt(payload: attemptSchema) {
  try {
    const response = await axios.post(questionsUrl, payload);
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.message,
        details: error.response?.data || error.toJSON()
      };
    } else {
      return {
        error: 'An unexpected error occurred',
        details: error
      };
    }
  }
}
