import { createSlice } from '@reduxjs/toolkit';

const characterInfoSlice = createSlice({
  name: 'character',
  initialState: {
    id: null,
    thumbnail: null,
    name: null,
    urls: null,
    description: null,
    comics: null,
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setCharacter(state, action) {
      state.thumbnail = action.payload.path + '.' + action.payload.type;
      state.name = action.payload.name;
      state.urls = action.payload.urls;
      state.description = action.payload.description;
      state.comics = action.payload.comics;
    },
  },
});

export const { setCharacter, setId } = characterInfoSlice.actions;
export default characterInfoSlice.reducer;
