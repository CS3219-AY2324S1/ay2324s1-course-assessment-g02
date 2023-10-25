import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.QUESTIONS_PORT || 3000;

interface QuestionSchema {
  questionId: number;
}

const questionsUrl: string = `http://localhost:${port}/questions/random`;

const getRandomQuestion = async (
  complexity: string
): Promise<AxiosResponse> => {
  const response: AxiosResponse<QuestionSchema> = await axios.get(
    `${questionsUrl}?complexity=${complexity}`
  );
  console.log('response', response);
  return response;
};

export default getRandomQuestion;
