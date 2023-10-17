import axios, { AxiosResponse } from 'axios';
import { UserIdSchema, UserSchema } from './apiSchema.ts';

const usersUrl: string = `${import.meta.env.VITE_APP_USERS_BACKEND_URL}/users/`;

export async function fetchUsers() {
  const { data } = await axios.get(usersUrl);
  return data;
}

export const getIdFromUserId = async (
  userId: string
): Promise<AxiosResponse> => {
  const response: AxiosResponse<UserIdSchema> = await axios.get(
    usersUrl + 'userId/' + userId
  );
  return response;
};

export const getUser = async (id: number): Promise<AxiosResponse> => {
  const response: AxiosResponse<UserSchema> = await axios.get(usersUrl + id);
  return response;
};

export async function createUser(userId: string, email: string) {
  const payload = {
    userId: userId,
    email: email
  };
  const response = await axios.post(usersUrl, payload, {});
  return response;
}

export async function updateUser(id: number, payload) {
  const response = await axios.put(`${usersUrl}/${id}`, payload, {});
  return response;
}

export async function deleteUser(id: number) {
  const response = await axios.delete(`${usersUrl}${id}`);
  return response;
}
