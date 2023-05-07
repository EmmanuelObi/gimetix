import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentStream: '',
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentStream(state, action: PayloadAction<string>) {
      state.currentStream = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
