import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: 0,
  showDetails: {
    plan: true,
    meal: true,
    nutrient: true,
  }
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
    setShowDetails(state, action) {
      state.showDetails = action.payload;
    },
  }
});

export const {
  setError, setLoading, setShowDetails
} = mainPageSlice.actions;

export default mainPageSlice.reducer;
