import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './sliceCurrency';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persisteCurrencyReducer = persistReducer(
  {
    key: 'baseCurrency',
    whitelist: ['baseCurrency'],
    storage: storage,
  },
  currencyReducer,
);

export const store = configureStore({
  reducer: {
    currency: persisteCurrencyReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
