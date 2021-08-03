import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { getCategoryDetail } from "api";
import { RootState } from "app/store";

export type categoryDetailState = {
  categoryDetail: Array<unknown>;
  isLoading: Boolean;
};

const initialState: categoryDetailState = {
  categoryDetail: [],
  isLoading: false,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategoryDetail",
  async (categoryId: String) => {
    const response = await getCategoryDetail(categoryId);
    return response;
  }
);

export const fetchMore = createAsyncThunk(
  "category/fetchMore",
  async (args: any) => {
    const response = await getCategoryDetail(args.categoryId, args.page);
    return response;
  }
);

const categoryDetailSlice = createSlice({
  name: "categoryDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
      state.categoryDetail = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMore.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMore.fulfilled, (state, { payload }) => {
      state.categoryDetail = [...state.categoryDetail, ...payload];
      state.isLoading = false;
    });
  },
});

export const selectSlice = (state: RootState) =>
  state[categoryDetailSlice.name] || initialState;

export const selectCategory = createSelector(
  selectSlice,
  (slice) => slice?.categoryDetail
);
export const selectLoading = createSelector(
  selectSlice,
  (slice) => slice?.isLoading
);

export default categoryDetailSlice.reducer;
