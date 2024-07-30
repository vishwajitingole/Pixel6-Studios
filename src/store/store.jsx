import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerReducer';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});
