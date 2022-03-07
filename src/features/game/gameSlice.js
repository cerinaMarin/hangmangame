import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchText, getScores } from '../../service/hangmanAPIService';
import { gameState } from '../../types/gameState';

const initialState = {
  status: 'idle',
  gameState: gameState.NAME_INPUT,
  name: null,
  quoteId: null,
  gameText: '',
  revealedCharacters: [],
  mistakesCount: 0,
  highscores: [],
  playerScore: 0,
};

export const fetchHighScoresAsync = createAsyncThunk(
  'counter/fetchScores',
  async () => {
    const response = await getScores();
    return response;
  }
);

export const fetchTextAsync = createAsyncThunk(
  'counter/fetchText',
  async () => {
    const response = await fetchText();
    return response;
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setGameState: (state, action) => {
      state.gameState = action.payload;
    },
    incrementMistakeCount: (state) => {
      state.mistakesCount += 1;
    },
    addToRevealedCharacters: (state, action) => {
      state.revealedCharacters = [...state.revealedCharacters, action.payload];
    },
    resetGame: (state) => {
      state.status = 'idle';
      state.gameState = gameState.NAME_INPUT;
      state.name = null;
      state.gameText = '';
      state.revealedCharacters = [];
      state.mistakesCount = 0;
      state.highscores = [];
      state.playerScore = 0;
      state.quoteId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTextAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTextAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.gameText = action.payload.content;
        state.quoteId = action.payload._id;
      })
      .addCase(fetchHighScoresAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHighScoresAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.highscores = action.payload;
      });

  },
});

export const { increment, decrement, incrementByAmount, setGameState, setName, incrementMistakeCount, addToRevealedCharacters, resetGame } = gameSlice.actions;

export const selectGame = (state) => state.game;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectGame(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default gameSlice.reducer;
