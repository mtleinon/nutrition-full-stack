import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteMealFromDb, updateMealInDb, addMealToDb
} from './mealsSlice';

import Meal from './Meal';
import EditMeal from './EditMeal';
import './meals.css';
import Button from '../../components/Button';

const DEFAULT_NEW_MEAL_NAME = "New meal";

export default React.memo(function Meals({ planId }) {
  const meals = useSelector(state => state.meals.meals).filter(meal => meal.planId === planId);
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
      {meals.map(meal => <Meal
        key={meal.mealId}
        meal={meal}
        removeHandler={removeHandler}
        editMealHandler={editMealHandler} />)}
      {/* {addMode ? 
        <EditMeal addMealHandler={addMealHandler} planId={planId} /> : null} */}
      <div>
        {/* <button onClick={() => setAddMode(true)}>ADD NEW MEAL</button> */}
        <Button
          color='lightGreen'
          onClick={() => addMealHandler(DEFAULT_NEW_MEAL_NAME, '', planId)}>
          ADD NEW MEAL
        </Button>
      </div>
      <div>Error: {error}</div>
    </div>
  );
}, (prevMeals, nextMeals) => { return prevMeals.planId === nextMeals.planId });