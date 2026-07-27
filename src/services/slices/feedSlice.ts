import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
  selectedOrder: TOrder | null;
  selectedOrderLoading: boolean;
  selectedOrderError: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  selectedOrder: null,
  selectedOrderLoading: false,
  selectedOrderError: null
};

export const getFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  getOrderByNumberApi
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки ленты заказов';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.selectedOrderLoading = true;
        state.selectedOrderError = null;
        state.selectedOrder = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrderLoading = false;
        state.selectedOrder = action.payload.orders[0] ?? null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.selectedOrderLoading = false;
        state.selectedOrderError =
          action.error.message ?? 'Ошибка загрузки заказа';
      });
  }
});

export default feedSlice.reducer;
