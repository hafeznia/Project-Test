import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesSlice from '../Redux/Categories'
import categoryDetail from '../Redux/CategoryDetail'

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    categoryDetail: categoryDetail
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
