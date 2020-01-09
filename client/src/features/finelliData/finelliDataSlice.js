import { createSlice } from '@reduxjs/toolkit';

/*
  convertFinelliData converts finelli data object to 
  array.
  From API (and SQL database) finelli data row comes in an
  object. However it is more convenient and efficient to do
  calculations when data is in array form. So this function 
  converts an array of objects to array of arrays.
*/
function convertFinelliData(finelliDataObjects) {
  return finelliDataObjects
    .map(finelliObject => Object.values(finelliObject));
}

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
      state.finelliData.push(...convertFinelliData(action.payload));
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
