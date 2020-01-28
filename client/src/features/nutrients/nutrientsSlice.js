import { createSlice } from '@reduxjs/toolkit';
import { fetchWithJwt } from '../../utils/fetchWithJwt';

const initialState = {
  nutrients: [],
};

const nutrientsSlice = createSlice({
  name: 'nutrients',
  initialState,
  reducers: {
    initializeNutrients(state, _) {
      state.nutrients = initialState.nutrients;
    },
    addAllNutrients(state, action) {
      state.nutrients.push(...action.payload);
      state.isLoading = false;
    },
    addNutrient(state, action) {
      state.nutrients.push(action.payload);
      state.isLoading = false;
    },
    deleteNutrient(state, action) {
      const { nutrientId } = action.payload;
      state.nutrients.splice(
        state
          .nutrients
          .findIndex(nutrient => nutrient.nutrientId === nutrientId),
        1
      );
      state.isLoading = false;
    },
    updateNutrient(state, action) {
      const { nutrientId, amount, mealId, finelliId } = action.payload;
      const nutrient =
        state.nutrients.find(nutrient => nutrient.nutrientId === nutrientId);
      if (nutrient) {
        nutrient.amount = amount;
        nutrient.mealId = mealId;
        nutrient.finelliId = finelliId;
      }
      state.isLoading = false;
    }
  }
});

export const {
  initializeNutrients,
  addAllNutrients,
  addNutrient,
  deleteNutrient,
  updateNutrient,
} = nutrientsSlice.actions;

export default nutrientsSlice.reducer;

export const fetchNutrientsFromDb = () => {
  return async (dispatch) => {

    fetchWithJwt('/api/nutrients/', 'GET', null,
      dispatch, addAllNutrients);

    // dispatch(startDbOperation());
    // try {
    //   const response = await fetch('/api/nutrients/' + userId);
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   const nutrientsData = await response.json();
    //   dispatch(addAllNutrients(nutrientsData));
    // } catch (err) {
    //   dispatch(setError(err.message));
    //   console.error(err.message)
    // }
  }
};

export const addNutrientToDb = (amount, mealId, finelliId) => {
  return async (dispatch) => {

    const newNutrient = { newNutrient: { amount, mealId, finelliId } };

    fetchWithJwt('/api/nutrients/', 'POST', newNutrient,
      dispatch, addNutrient);


    // console.debug('addNutrientToDb 1', new Date().getSeconds(), new Date().getMilliseconds());
    // dispatch(startDbOperation());

    // try {
    //   const create = { create: { amount, mealId, finelliId } };
    //   const response = await fetch("/api/nutrients", {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(create)
    //   })
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   const data = await response.json();

    //   dispatch(addNutrient(data));
    // } catch (err) {
    //   dispatch(setError(err.message));
    //   console.error(err)
    // };
  }
}

export const deleteNutrientFromDb = (nutrientId) => {
  return async (dispatch) => {

    fetchWithJwt('/api/nutrients/' + nutrientId, 'DELETE', null,
      dispatch, deleteNutrient);


    // dispatch(startDbOperation());

    // try {
    //   const response = await fetch('/api/nutrients/' + nutrientId,
    //     {
    //       method: 'DELETE'
    //     });
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   const data = await response.json();
    //   dispatch(deleteNutrient(data));
    // } catch (err) {
    //   dispatch(setError(err.message));
    //   console.error(err)
    // }
  }
};

export const updateNutrientInDb = (nutrientId, amount, mealId, finelliId) => {
  return async (dispatch) => {
    const nutrient = { nutrient: { amount, mealId, finelliId } };

    fetchWithJwt('/api/nutrients/' + nutrientId, 'PATCH', nutrient,
      dispatch, updateNutrient);


    // dispatch(startDbOperation());
    // try {
    //   const response = await fetch("/api/nutrients/" + id, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(update)
    //   });
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   const data = await response.json();
    //   dispatch(updateNutrient(data));
    // } catch (err) {
    //   dispatch(setError(err.message));
    //   console.error(err)
    // }
  }
};



