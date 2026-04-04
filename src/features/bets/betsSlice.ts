import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Bets } from '../../utils/bets';
import { fetchBetsAPI } from './betsApi';

interface BetsState {
  items: Bets[];
  loading: boolean;
  error: string | null;
}

const initialState: BetsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBets = createAsyncThunk(
  'bets/fetchBets',
  async (_, thunkAPI) => {
    try {
      return await fetchBetsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Bilinmeyen hata'
      );
    }
  }
);

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBets.fulfilled, (state, action: PayloadAction<Bets[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBets.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Bir hata oluÅŸtu';
      });
  },
});

export default betsSlice.reducer;
