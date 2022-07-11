import { configureStore } from '@reduxjs/toolkit';
import { marvelApi } from '../marvelApi';
import characterSlice from '../slices/characterSlice';
import randomSlice from '../slices/randomSlice';

const store = configureStore({
  reducer: {
    [marvelApi.reducerPath]: marvelApi.reducer,
    random: randomSlice,
    character: characterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marvelApi.middleware),
});

export default store;
