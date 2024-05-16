import axios from 'axios';

import { CharactersResponse } from '@/types';

interface FetchCharactersParams {
  pageParam?: number;
}

export const fetchCharacters = async ({
  pageParam = 1,
}: FetchCharactersParams): Promise<CharactersResponse> => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageParam}`);
  return response.data;
};
