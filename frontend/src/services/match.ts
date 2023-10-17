import axios from 'axios';
import { MatchResponse } from '../interfaces/matchResponse';

const matchUrl: string = `${import.meta.env.VITE_APP_MATCH_BACKEND_URL}/match/`;

export const getMatch = async (
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
