import axios, { AxiosError, AxiosResponse } from 'axios';

const questionsUrl: string = `${process.env.VITE_APP_BACKEND_URL}/questions`;

export async function fetchQuestions() {
  const response = await axios.get(questionsUrl);
  return response.data;
}

export const getQuestion = async (id: number): Promise<AxiosResponse> => {
  const response: AxiosResponse<ApiDataType> = await axios.get(
    questionsUrl + id
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
