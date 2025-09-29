// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed Redux Hooks
 * 
 * Use these hooks throughout your app instead of plain `useDispatch` and `useSelector`
 * 
 * Benefits:
 * - Full TypeScript support
 * - Autocomplete for state and actions
 * - Type safety
 * 
 * Usage:
 * import { useAppDispatch, useAppSelector } from './store/hooks';
 * 
 * const dispatch = useAppDispatch();
 * const user = useAppSelector((state) => state.user);
 */

// Export typed useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Export typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;