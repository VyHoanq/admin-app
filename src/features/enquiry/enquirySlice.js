// colorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enquiryService from '../enquiry/enquiryService';

export const getEnquiries = createAsyncThunk(
  'enquiry/get-enquiries',
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const enquiriySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default enquiriySlice.reducer;
