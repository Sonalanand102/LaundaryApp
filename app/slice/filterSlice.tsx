import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  city: string;
  state: string;
  services: string;
}

const initialState: FiltersState = {
  city: '',
  state: '',
  services: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setServices: (state, action: PayloadAction<string>) => {
      state.services = action.payload;
    },
    setFilters: (state, action: PayloadAction<FiltersState>) => {
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.services = action.payload.services;
    },
  },
});

export const { setCity, setState, setServices, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
