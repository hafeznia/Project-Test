import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { getAllCategories } from "api";
import { RootState } from "app/store";

export type CategoriesState = {
  categories: Array<unknown>;
  isLoading: Boolean;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
};

export const FetchAllCategories = createAsyncThunk(
  "category/FetchAllCategories",
  async () => {
    const response = await getAllCategories();
    return response;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.isLoading = false;
    });
    builder.addCase(FetchAllCategories.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const selectSlice = (state: RootState) =>
  state[categoriesSlice.name] || initialState;

export const selectCategories = createSelector(
  selectSlice,
  (slice) => slice?.categories
);
export const selectLoading = createSelector(
  selectSlice,
  (slice) => slice?.isLoading
);

export default categoriesSlice.reducer;
