import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { _apiKey } from '../../services/_apiKey';

export const getCharacterInfo = createAsyncThunk(
  'characterInfo/getCharacterInfo',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?${_apiKey}`,
      ).then((data) => data.json());

      if (response.data) {
        const { name, description, id, thumbnail, comics, urls } = response.data?.results[0];
        const { items } = comics;
        const { path, extension } = thumbnail;
        dispatch(
          setCharacter({
            name,
            description,
            id,
            comics: items,
            path,
            extension,
            urls,
          }),
        );
      }
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const characterInfoSlice = createSlice({
  name: 'characterInfo',
  initialState: {
    id: null,
    thumbnail: null,
    name: null,
    urls: null,
    description: null,
    comics: null,
    isFetching: null,
    isError: null,
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setCharacter(state, action) {
      state.thumbnail = action.payload.path + '.' + action.payload.extension;
      state.name = action.payload.name;
      state.urls = action.payload.urls;
      state.description = action.payload.description;
      state.comics = action.payload.comics;
    },
  },
  extraReducers: {
    [getCharacterInfo.fulfilled]: (state) => {
      state.isFetching = null;
      state.isError = null;
    },
    [getCharacterInfo.pending]: (state) => {
      state.isFetching = true;
    },
    [getCharacterInfo.rejected]: (state) => {
      state.isError = true;
    },
  },
});

export const { setCharacter, setId } = characterInfoSlice.actions;
export default characterInfoSlice.reducer;
