import axios, { AxiosResponse } from "axios";

const url = "http://localhost:5050/questions/";

export interface Question {
  _id: string;
  title: string;
  description: string;
  complexity: string;
  categories: string[];
}

export const getAllQuestions = async () => {
  const allQuestions: Question[] = await axios
    .get(url)
    .then((response) => {
      console.log("Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    });

  return allQuestions;
};

export const createQuestion = async (qn: Question) => {
  const createQuestionResp: Question = await axios
    .post(url, {
      title: qn.title,
      description: qn.description,
      complexity: qn.complexity,
      categories: qn.categories,
    })
    .then((response) => {
      console.log(response.data);
      return response.data.question;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  return createQuestionResp;
};

export const updateQuestion = async (qn: Question) => {
  await axios
    .put(url + qn._id, {
      title: qn.title,
      description: qn.description,
      complexity: qn.complexity,
      categories: qn.categories,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const deleteQuestion = async (qn: Question) => {
  await axios
    .delete(url + qn._id)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};
