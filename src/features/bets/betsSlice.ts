import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Bets, SelectedBet } from '../../utils/bets';
import { fetchBetsAPI } from './betsApi';

interface BetsState {
  items: Bets[];
  loading: boolean;
  error: string | null;
  selectedBets: Record<string, SelectedBet>;
}

const initialState: BetsState = {
  items: [],
  loading: false,
  error: null,
  selectedBets: {},
};

export const fetchBets = createAsyncThunk(
  'bets/fetchBets',
  async () => {
    return await fetchBetsAPI();
  }
);

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    toggleBetSelection: (state, action: PayloadAction<SelectedBet>) => {
      const { nid, ocgId, ocId } = action.payload;
      const existing = state.selectedBets[nid];
      const isSame = existing?.ocgId === ocgId && existing?.ocId === ocId;
      if (isSame) {
        delete state.selectedBets[nid];
      } else {
        state.selectedBets[nid] = action.payload;
      }
    },
  },
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
        state.error = (action.payload as string) || 'Bir hata oluştu';
      });
  },
});

export const { toggleBetSelection } = betsSlice.actions;

export const selectBetByNid = (nid: string) =>
  (state: { bets: BetsState }): SelectedBet | undefined =>
    state.bets.selectedBets[nid];

export default betsSlice.reducer;
