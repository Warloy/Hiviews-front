import { TReview } from "@/types/Post.Type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IReviewState {
  reviews: TReview[];
};

const initialState: IReviewState = {
  reviews: []
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    updateReviews: (state, action: PayloadAction<TReview[]>) => {
      state.reviews = action.payload
    },
  }
});

export const { updateReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;