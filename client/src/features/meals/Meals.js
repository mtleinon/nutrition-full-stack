import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMealsFromDb,
  deleteMealFromDb, updateMealInDb, addMealToDb
} from './mealsSlice';

import Meal from './Meal';
import EditMeal from './EditMeal';

export default function Meals({ planId }) {
  const meals = useSelector(state => state.meals.meals.filter(meal => meal.planId === planId));
  const error = useSelector(state => state.meals.error);
  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);

  const editMealHandler = (id, name, description, planId) => {
    dispatch(updateMealInDb(id, name, description, planId));
  }

  const addMealHandler = (name, description, planId) => {
    dispatch(addMealToDb(name, description, planId));
    setAddMode(false);
  }

  // useEffect(() => {
  //   dispatch(fetchMealsFromDb());
  // }, [dispatch]);

  const removeHandler = (id) => {
    dispatch(deleteMealFromDb(id));
  }

  return (
    <div>
      <h2>Meals</h2>
      {meals.map(meal => <Meal
        key={meal.mealId}
        meal={meal}
        removeHandler={removeHandler}
        editMealHandler={editMealHandler} />)}
      {addMode ? <EditMeal addMealHandler={addMealHandler} planId={planId} /> : null}
      <div><button onClick={() => setAddMode(true)}>ADD NEW MEAL</button></div>
      <div>Error: {error}</div>
    </div>
  );
}