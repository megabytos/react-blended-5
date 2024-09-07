import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from 'service/opencagedataApi';

export const getBaseCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (coordinates, ThunkAPI) => {
    const state = ThunkAPI.getState();
    if (state.currency.baseCurrency) return state.currency.baseCurrency;
    
    try {
      const res = await getUserInfo(coordinates);
      return res.results[0]?.annotations?.currency?.iso_code;
    } catch (_) {
      return ThunkAPI.rejectWithValue('Error occured while getting base currency');
    }
  },
);
