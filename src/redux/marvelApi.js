import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _apiKey } from '../services/_apiKey';

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gateway.marvel.com:443/v1/public/',
  }),
  endpoints: (build) => ({
    getCharactersList: build.query({
      query: (limit) => `characters?orderBy=-modified&limit=${limit}}&offset=73&${_apiKey}`,
    }),
    getComicsList: build.query({
      query: (limit) => `comics?orderBy=-modified&limit=${limit}&offset=10000&${_apiKey}`,
    }),
  }),
});

export const { useGetRandomQuery, useGetCharactersListQuery, useGetComicsListQuery } = marvelApi;
