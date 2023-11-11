import axios from 'axios';
import { MatchResponse } from '../interfaces/matchResponse';

const matchUrl: string = `http://${import.meta.env.VITE_APP_HOST}:${import.meta.env.VITE_APP_MATCH_BACKEND_PORT}/match/`;

export const findMatch = async (
  id: string,
  difficulty: string,
  language: string
) => {
  const res = await axios.get(matchUrl + 'find', {
    params: {
      id: id,
      difficulty: difficulty,
      language: language
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
