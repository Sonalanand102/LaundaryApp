import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 'light'; 

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => (state === 'light' ? 'dark' : 'light'),
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => action.payload,
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
