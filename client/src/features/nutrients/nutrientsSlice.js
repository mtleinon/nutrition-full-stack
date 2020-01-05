import { createSlice } from '@reduxjs/toolkit';

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

export const { addAllMeals, addMeal, deleteMeal, updateMeal, startDbOperation, setError } = mealsSlice.actions;

export default mealsSlice.reducer;

export const fetchMealsFromDb = () => {
  return async (dispatch) => {
    dispatch(startDbOperation());
    try {
      const response = await fetch('/api/meals');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const mealsData = await response.json();
      dispatch(addAllMeals(mealsData));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err.message)
    }
  }
};

export const addMealToDb = (name, description, planId) => {
  return async (dispatch) => {
    dispatch(startDbOperation());

    try {
      const create = { create: { name, description, planId } };
      const response = await fetch("/api/meals", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
      })
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(addMeal(data));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err)
    };
  }
}

export const deleteMealFromDb = (mealId) => {
  return async (dispatch) => {
    dispatch(startDbOperation());

    try {
      const response = await fetch('/api/meals/' + mealId,
        {
          method: 'DELETE'
        });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(deleteMeal(data));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err)
    }
  }
};

export const updateMealInDb = (id, name, description, planId) => {
  return async (dispatch) => {
    const update = { update: { name, description, planId } };
    dispatch(startDbOperation());
    try {
      const response = await fetch("/api/meals/" + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(updateMeal(data));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err)
    }
  }
};



