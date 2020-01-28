import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: 0
};

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading += action.payload ? 1 : -1
    },
  }
});

export const {
  setError, setLoading
} = mainPageSlice.actions;

export default mainPageSlice.reducer;
