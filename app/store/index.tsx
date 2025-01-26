import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../slice/themeSlice'; 
import filtersReducer from '../slice/filterSlice' ;

const initialState = {
  location: null,
  theme: 'light', 
};

const locationReducer = (state = initialState.location, action: any) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return action.payload;
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    location: locationReducer,
    theme: themeReducer,
    filters: filtersReducer,
  },
});

export default store;
