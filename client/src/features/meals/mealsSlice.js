import { createSlice } from '@reduxjs/toolkit';
import { fetchWithJwt } from '../../utils/fetchWithJwt';

const initialState = {
  meals: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    initializeMeals(state, _) {
      state.meals = initialState.meals;
    },
    addAllMeals(state, action) {
      state.meals.push(...action.payload);
    },
    addMeal(state, action) {
      state.meals.push(action.payload);
    },
    deleteMeal(state, action) {
      const { mealId } = action.payload;
      state.meals.splice(state.meals.findIndex(meal => meal.mealId === mealId), 1);
    },
    updateMeal(state, action) {
      const { mealId, name, description } = action.payload;
      const meal = state.meals.find(meal => meal.mealId === mealId);
      if (meal) {
        meal.name = name;
        meal.description = description;
      }
    }
  }
});

export const {
  initializeMeals,
  addAllMeals,
  addMeal,
  deleteMeal,
  updateMeal,
} = mealsSlice.actions;

export default mealsSlice.reducer;

export const fetchMealsFromDb = () => {
  return async (dispatch) => {

    fetchWithJwt('/api/meals/', 'GET', null,
      dispatch, addAllMeals);
  }
};

export const addMealToDb = (name, description, planId) => {
  return async (dispatch) => {

    const newMeal = { newMeal: { name, description, planId } };

    fetchWithJwt('/api/meals/', 'POST', newMeal,
      dispatch, addMeal);
  }
}

export const deleteMealFromDb = (mealId) => {
  return async (dispatch) => {

    fetchWithJwt('/api/meals/' + mealId, 'DELETE', null,
      dispatch, deleteMeal);
  }
};

export const updateMealInDb = (mealId, name) => {
  return async (dispatch) => {

    const updateData = { meal: { name } };

    fetchWithJwt('/api/meals/' + mealId, 'PATCH', updateData,
      dispatch, updateMeal);
  }
};



