import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import combinedReducer from './rootReducer';
import { createWrapper } from 'next-redux-wrapper';

export const reducer = (state, action) => {
   return combinedReducer(state, action);
};

export const makeStore = () => {
   const isServer = typeof window === 'undefined';
   if (isServer) {
      return configureStore({ reducer });
   } else {
      const { persistStore, persistReducer, createTransform } = require('redux-persist');
      const storage = require('redux-persist/lib/storage').default;
      const persistConfig = {
         key: 'persist-key',
         storage, // if needed, use a safer storage
         whitelist: ['login', 'order'], // only counter will be persisted, add other reducers if needed
      };
      const persistedReducer = persistReducer(persistConfig, reducer); // Create a new reducer with our existing reducer
      const store = configureStore({
         reducer: persistedReducer,
         middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
         devTools: true,
      });
      store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
      return store;
   }
};

export const wrapper = createWrapper(makeStore);
