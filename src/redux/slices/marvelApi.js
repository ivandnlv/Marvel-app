import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _apiKey } from '../../services/marvelApi';

const randomHeroId = (min = 1011400, max = 1011000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gateway.marvel.com:443/v1/public/',
  }),
  endpoints: (builder) => ({
    getRandom: builder.query({
      query: () => `characters/${randomHeroId()}?${_apiKey}`,
    }),
  }),
});

export const { useGetRandomQuery } = marvelApi;
