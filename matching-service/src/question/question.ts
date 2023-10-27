import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const questionsUrl = process.env.QUESTIONS_BACKEND_URL || 'localhost';
const port = process.env.QUESTIONS_PORT || 3000;

interface QuestionSchema {
  questionId: number;
}

const getRandomQuestion = async (
  complexity: string
): Promise<AxiosResponse> => {
  const response: AxiosResponse<QuestionSchema> = await axios.get(
    `http://${questionsUrl}:${port}/questions/random?complexity=${complexity}`
  );
  console.log('response', response);
  return response;
};

export default getRandomQuestion;
