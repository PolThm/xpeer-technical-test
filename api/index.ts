import axios from 'axios';

import { CharactersResponse } from '@/types';

interface FetchCharactersParams {
  pageParam?: number;
  name?: string;
}

export const fetchCharacters = async ({
  pageParam = 1,
  name = '',
}: FetchCharactersParams): Promise<CharactersResponse> => {
  try {
    const params: any = { page: pageParam };
    if (name) {
      params.name = name;
    }

    const response = await axios.get('https://rickandmortyapi.com/api/character/', {
      params,
    });

    return response.data;
  } catch (error) {
    // if the filter returns no results (status 404), return an empty list
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { info: { count: 0, pages: 0, next: '', prev: null }, results: [] };
    }
    throw error;
  }
};
