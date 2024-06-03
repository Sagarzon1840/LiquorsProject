import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IReviews {
  data: string[];
}
const initialState: IReviews = {
  data: [],
};
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    createReviews: (state, action: PayloadAction<string>) => {
      state.data.push(action.payload);
    },
    readReviews: (state, action) => {
      state.data = state.data.concat(action.payload);
    },
    updateReviews: (state, action) => {},
    deleteReviews: (state, action) => {},
  },
});

export const { createReviews, readReviews, updateReviews, deleteReviews } =
  reviewsSlice.actions;

export default reviewsSlice;
