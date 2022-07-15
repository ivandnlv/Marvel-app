import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _apiKey } from '../services/_apiKey';

const randomHeroId = (min = 1011400, max = 1011000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gateway.marvel.com:443/v1/public/',
  }),
  endpoints: (build) => ({
    getRandom: build.query({
      query: () => `characters/${randomHeroId()}?${_apiKey}`,
    }),
    getCharactersList: build.query({
      query: (limit) => `characters?limit=${limit}?&${_apiKey}`,
    }),
  }),
});

export const { useGetRandomQuery, useGetCharactersListQuery } = marvelApi;
