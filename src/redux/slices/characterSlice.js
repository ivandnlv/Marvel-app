import { createSlice } from '@reduxjs/toolkit';

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    id: null,
    thumbnail: null,
    name: null,
    description: null,
  },
  reducers: {
    setCharacter(state, action) {
      state.id = action.payload.id;
      state.thumbnail = action.payload.path + '.' + action.payload.extension;
      state.name = action.payload.name;
      state.description = action.payload.description;
    },
  },
});

export const { setCharacter } = characterSlice.actions;
export default characterSlice.reducer;
