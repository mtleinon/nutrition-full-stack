import { createSlice } from '@reduxjs/toolkit';
import { fetchWithJwt } from '../../utils/fetchWithJwt';

const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    meals: [],
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
    addAllMeals(state, action) {
      state.meals.push(...action.payload);
      state.isLoading = false;
    },
    addMeal(state, action) {
      state.meals.push(action.payload);
      state.isLoading = false;
    },
    deleteMeal(state, action) {
      const { mealId } = action.payload;
      state.meals.splice(state.meals.findIndex(meal => meal.mealId === mealId), 1);
      state.isLoading = false;
    },
    updateMeal(state, action) {
      const { mealId, name, description } = action.payload;
      const meal = state.meals.find(meal => meal.mealId === mealId);
      if (meal) {
        meal.name = name;
        meal.description = description;
      }
      state.isLoading = false;
    }
  }
});

export const {
  addAllMeals,
  addMeal,
  deleteMeal,
  updateMeal,
  startDbOperation,
  setError } = mealsSlice.actions;

export default mealsSlice.reducer;

export const fetchMealsFromDb = () => {
  return async (dispatch) => {

    fetchWithJwt('/api/meals/', 'GET', null,
      dispatch, startDbOperation, addAllMeals, setError);
  }
};

export const addMealToDb = (name, description, planId) => {
  return async (dispatch) => {

    const newMeal = { newMeal: { name, description, planId } };

    fetchWithJwt('/api/meals/', 'POST', newMeal,
      dispatch, startDbOperation, addMeal, setError);
  }
}

export const deleteMealFromDb = (mealId) => {
  return async (dispatch) => {

    fetchWithJwt('/api/meals/' + mealId, 'DELETE', null,
      dispatch, startDbOperation, deleteMeal, setError);
  }
};

export const updateMealInDb = (mealId, name) => {
  return async (dispatch) => {

    const updateData = { meal: { name } };

    fetchWithJwt('/api/meals/' + mealId, 'PATCH', updateData,
      dispatch, startDbOperation, updateMeal, setError);
  }
};



