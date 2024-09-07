import { createSlice } from '@reduxjs/toolkit';
import { getBaseCurrency } from 'reduxState/currencyAsyncThunk';
const initialState = {
  isLoading: false,
  error: false,
  baseCurrency: '',
  rates: {},
};

const sliceCurrency = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(getBaseCurrency.rejected, state => {
        state.baseCurrency = 'USD';
      }),
});

export const selectBaseCurrency = state => state.currency.baseCurrency;

export const { setBaseCurrency } = sliceCurrency.actions;
export const currencyReducer = sliceCurrency.reducer;
