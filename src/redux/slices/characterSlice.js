import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _apiKey } from '../../services/_apiKey';

export const getCharacterById = createAsyncThunk(
  'character/getCharacterById',
  async (name, { dispatch }) => {
    if (name) {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?name=${name}&${_apiKey}`,
      ).then((data) => data.json());
      if (response) {
        if (response.data.results.length !== 0) {
          dispatch(resetCharacter());
          dispatch(
            setCharacter({
              id: response.data.results[0]?.id,
              name: response.data.results[0]?.name,
              path: response.data.results[0]?.thumbnail.path,
              extension: response.data.results[0]?.thumbnail.extension,
              description: response.data.results[0]?.description,
            }),
          );
          dispatch(setSuccess());
        } else {
          dispatch(setError('The character was not found. Check the name and try again'));
        }
      }
    } else {
      dispatch(setError('This field is required'));
    }
  },
);

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    id: null,
    thumbnail: null,
    name: null,
    description: null,
    success: null,
    error: null,
    errorMessage: null,
    loading: null,
  },
  reducers: {
    setSuccess(state) {
      state.success = true;
    },
    setError(state, action) {
      state.error = true;
      state.errorMessage = action.payload;
    },
    resetCharacter(state) {
      state.id = null;
      state.thumbnail = null;
      state.name = null;
      state.description = null;
      state.success = null;
      state.error = null;
      state.errorMessage = null;
      state.loading = null;
    },
    setCharacter(state, action) {
      state.id = action.payload.id;
      state.thumbnail = action.payload.path + '.' + action.payload.extension;
      state.name = action.payload.name;
      state.description = action.payload.description;
    },
  },
  extraReducers: {
    [getCharacterById.fulfilled]: (state) => {
      state.error = null;
      state.loading = null;
    },
    [getCharacterById.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getCharacterById.rejected]: (state) => {
      state.error = true;
      state.loading = null;
    },
  },
});

export const { setCharacter, resetCharacter, setError, setSuccess } = characterSlice.actions;
export default characterSlice.reducer;
