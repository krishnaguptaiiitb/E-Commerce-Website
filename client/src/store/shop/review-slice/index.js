import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ productId, userId, userName, reviewMessage, reviewValue }) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/products/review/${productId}`,
      {
        userId,
        userName,
        reviewMessage,
        reviewValue,
      }
    );
    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (productId) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/review/${productId}`
    );
    return result?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally push new review or refetch all
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data || [];
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
