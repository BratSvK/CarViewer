import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// Custom hooks to use the Redux store in components
// These hooks provide a typed version of useDispatch and useSelector
// This ensures that the types of the state and actions are correctly inferred
// This is useful for TypeScript users to avoid type errors when accessing the store
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
