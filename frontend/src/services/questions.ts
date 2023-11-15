import axios, { AxiosResponse } from 'axios';
import { QuestionSchema } from './apiSchema.ts';

const questionsUrl = `http://${import.meta.env.VITE_APP_QUESTION_HOST}:${
  import.meta.env.VITE_APP_QUESTIONS_BACKEND_PORT
}/questions`;

export async function fetchQuestions() {
  const { data } = await axios.get(questionsUrl);
  return data;
}

export const getQuestion = async (id: number): Promise<AxiosResponse> => {
  const response: AxiosResponse<QuestionSchema> = await axios.get(
    questionsUrl + '/' + id
  );
  return response;
};

export async function createQuestion(payload) {
  const response = await axios.post(questionsUrl, payload, {});
  return response;
}

export async function updateQuestion(id: number, payload) {
  const response = await axios.put(`${questionsUrl}/${id}`, payload, {});
  return response;
}

export async function deleteQuestionApi(id: number) {
  const response = await axios.delete(`${questionsUrl}/${id}`);
  return response;
}
