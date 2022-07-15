import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _apiKey } from '../../services/_apiKey';

const randomHeroId = (min = 1011400, max = 1011000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomHero = createAsyncThunk(
  'random/getRandomHero',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${randomHeroId()}?${_apiKey}`,
      ).then((result) => result.json());
      if (response.data.results) {
        const { name, description, thumbnail, urls } = response.data.results[0];
        dispatch(
          setHero({
            name,
            description,
            thumbnail: thumbnail.path,
            type: thumbnail.extension,
            urls,
          }),
        );
      } else {
        dispatch(
          setHero({
            name: 'Sorry, an error has occurred',
            thumbnail:
              'https://cdni.iconscout.com/illustration/premium/thumb/internet-error-1886586-1598257.png',
            description: '',
            urls: [],
          }),
        );
      }
    } catch (error) {
      rejectWithValue(error);
      dispatch(
        setHero({
          name: 'Error',
          thumbnail:
            'https://cdni.iconscout.com/illustration/premium/thumb/internet-error-1886586-1598257',
          type: 'png',
          description: 'Try again',
          urls: [],
        }),
      );
    }
  },
);

const randomSlice = createSlice({
  name: 'random',
  initialState: {
    name: '',
    thumbnail: '',
    description: '',
    urls: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    setHero(state, action) {
      state.name = action.payload.name;
      state.thumbnail = action.payload.thumbnail + '.' + action.payload.type;
      state.description = action.payload.description;
      state.urls = action.payload.urls;
    },
  },
  extraReducers: {
    [getRandomHero.fulfilled]: (state) => {
      state.isFetching = false;
      state.isError = false;
    },
    [getRandomHero.pending]: (state) => {
      state.isFetching = true;
    },
    [getRandomHero.rejected]: (state) => {
      state.isError = true;
    },
  },
});

export const { setHero } = randomSlice.actions;
export default randomSlice.reducer;
