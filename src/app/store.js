import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    game: counterReducer,
  },
});
