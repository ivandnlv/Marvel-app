import { createSlice } from '@reduxjs/toolkit';

const randomSlice = createSlice({
  name: 'random',
  initialState: {
    name: '',
    thumbnail: '',
    description: '',
    urls: [],
  },
  reducers: {
    setHero(state, action) {
      state.name = action.payload.name;
      state.thumbnail = action.payload.thumbnail + '.' + action.payload.type;
      state.description = action.payload.description;
      state.urls = action.payload.urls;
    },
  },
});

export const { setHero } = randomSlice.actions;
export default randomSlice.reducer;
