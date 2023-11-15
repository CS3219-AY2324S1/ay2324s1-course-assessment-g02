import axios from 'axios';
import { MatchResponse } from '../interfaces/matchResponse';

const matchUrl: string = `http://${import.meta.env.VITE_APP_MATCH_HOST}:${
  import.meta.env.VITE_APP_MATCH_BACKEND_PORT
}/match/`;

export const findMatch = async (
  userId: string,
  difficulty: string,
  language: string,
  id: number
) => {
  const res = await axios.get(matchUrl + 'find', {
    params: {
      userId: userId,
      difficulty: difficulty,
      language: language,
      id: id
    }
  });
  return res.data as MatchResponse;
};

export const getUserSession = async (id: string) => {
  console.log('getting user session');
  const res = await axios.get(matchUrl + 'get', { params: { id: id } });
  return res;
};

export const deleteMatch = async (
  id: string,
  difficulty: string,
  language: string
) => {
  await axios.delete(matchUrl + 'delete', {
    params: {
      id: id,
      difficulty: difficulty,
      language: language
    }
  });
};
