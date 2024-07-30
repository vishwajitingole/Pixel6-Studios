import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customers',
  initialState: [],
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    editCustomer: (state, action) => {
      const { index, updatedCustomer } = action.payload;
      state[index] = updatedCustomer;
    },
    deleteCustomer: (state, action) => {
      const index = action.payload;
      return state.filter((_, i) => i !== index);
    },
  },
});

export const { addCustomer, editCustomer, deleteCustomer } = customerSlice.actions;

export default customerSlice.reducer;
