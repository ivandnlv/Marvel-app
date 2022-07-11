import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _apiKey } from '../services/_apiKey';

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
    getCharactersList: builder.query({
      query: (limit) => `characters?limit=${limit}?&${_apiKey}`,
    }),
    getCharacterById: builder.query({
      query: (id) => `characters/${id}?${_apiKey}`,
    }),
  }),
});

export const { useGetRandomQuery, useGetCharactersListQuery, useGetCharacterByIdQuery } = marvelApi;
