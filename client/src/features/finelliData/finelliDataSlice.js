import { createSlice } from '@reduxjs/toolkit';

const finelliDataSlice = createSlice({
  name: 'finelliData',
  initialState: {
    finelliData: [],
    error: '',
    isLoading: false
  },
  reducers: {
    startDbOperation(state, _) {
      state.error = '';
      state.isLoading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    addAllFinelliData(state, action) {
      state.finelliData.push(...action.payload);
      state.isLoading = false;
    }
  }
});

export const { addAllFinelliData, startDbOperation, setError } = finelliDataSlice.actions;

export default finelliDataSlice.reducer;

export const fetchFinelliDataFromDb = () => {
  return async (dispatch) => {
    dispatch(startDbOperation());
    try {
      const response = await fetch('/api/finellidata');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const finelliData = await response.json();
      dispatch(addAllFinelliData(finelliData));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err.message)
    }
  }
};
