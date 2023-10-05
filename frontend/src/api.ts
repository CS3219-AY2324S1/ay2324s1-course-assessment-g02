import axios, { AxiosError, AxiosResponse } from 'axios';

const questionsUrl: string = `${
  import.meta.env.VITE_APP_BACKEND_URL
}/questions`;

export async function fetchQuestions() {
  const { data } = await axios.get(questionsUrl);
  return data;
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
