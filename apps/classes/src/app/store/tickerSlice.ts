import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticker } from '../TickerData.interface';

export type State = { data: Ticker[] | null };

const addTicker: CaseReducer<State, PayloadAction<Ticker>> = (
  state,
  action
) => {
  state.data = state.data ? [action.payload, ...state.data] : [action.payload];
};

const initialState: State = { data: null };

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: { add: addTicker },
});

export const { add } = tickerSlice.actions;
export default tickerSlice.reducer;
