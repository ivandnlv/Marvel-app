import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _apiKey } from '../../services/_apiKey';

export const getComicById = createAsyncThunk(
  'comic/getComicById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/comics/${id}?${_apiKey}`,
      ).then((res) => res.json());
      if (response) {
        const { id, title, description, prices, thumbnail, pageCount } = response.data?.results[0];
        const { path, extension } = thumbnail;
        const { price } = prices[0];
        dispatch(setComic({ id, title, path, extension, description, price, pageCount }));
      }
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const comicSlice = createSlice({
  name: 'comic',
  initialState: {
    id: null,
    title: null,
    limit: 8,
    thumbnail: null,
    description: null,
    price: null,
    pageCount: null,
    loading: null,
    error: null,
  },
  reducers: {
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setComic(state, action) {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.price = action.payload.price;
      state.thumbnail = action.payload.path + '.' + action.payload.extension;
      state.description = action.payload.description;
      state.pageCount = action.payload.pageCount;
    },
  },
  extraReducers: {
    [getComicById.fulfilled]: (state) => {
      state.loading = null;
      state.error = null;
    },
    [getComicById.pending]: (state) => {
      state.loading = true;
    },
    [getComicById.rejected]: (state) => {
      state.error = true;
    },
  },
});

export const { setComic, setLimit } = comicSlice.actions;
export default comicSlice.reducer;
