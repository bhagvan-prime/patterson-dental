// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';

/**
 * Redux Store Configuration
 * 
 * This store is configured with:
 * - RTK Query API for data fetching
 * - TypeScript support
 * - Redux DevTools (auto-enabled in development)
 */

export const store = configureStore({
  reducer: {
    // RTK Query API reducer
    [api.reducerPath]: api.reducer,
    
    // Add your feature slices here later as needed:
    // Example:
    // auth: authReducer,
    // user: userReducer,
    // application: applicationReducer,
  },
  
  // Add RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Optional: Configure middleware options
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['api/executeQuery/fulfilled'],
      },
    }).concat(api.middleware),
  
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

// TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;