import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store'; // Import the RootState type from your store

// Define a custom typed useSelector hook
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
