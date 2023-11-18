import axios, { AxiosResponse } from "axios";

const url = "http://localhost:3001/users/";

export interface User {
  id: number;
  userId: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  preferredComplexity: string;
  preferredLanguage: string;
  attemptedQuestion1: any[];
  attemptedQuestion2: any[];
}

export const getAllUsers = async () => {
  const allUsers: User[] = await axios
    .get(url)
    .then((response) => {
      console.log("Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    });

  return allUsers;
};

export const createUser = async (
  email: string,
  password: string,
  preferredComplexity: string,
  preferredLanguage: string
) => {
  const createQuestionResp: User = await axios
    .post(url, {
      userId: email,
      email: email,
      preferredComplexity: preferredComplexity,
      preferredLanguage: preferredLanguage,
    })
    .then((response) => {
      console.log(response.data);
      return response.data.user;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  return createQuestionResp;
};

export const updateUser = async (u: User) => {
  console.log("u2", u);
  const payload = {
    username: u.username,
    email: u.email,
    preferredComplexity: u.preferredComplexity,
    preferredLanguage: u.preferredLanguage,
  };
  console.log(payload);
  await axios
    .put(url + u.id, payload)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const deleteUser = async (u: User) => {
  await axios
    .delete(url + u.id)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};