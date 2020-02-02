import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  deleteMealFromDb, updateMealInDb, addMealToDb
} from './mealsSlice';

import MealM from './MealM';
import './meals.css';
import Button from '@material-ui/core/Button';
import ButtonContainer from '../../componentsM/ButtonContainer';

const DEFAULT_NEW_MEAL_NAME = "";

export default React.memo(function MealsM({ planId }) {
  const meals = useSelector(state => state.meals.meals).filter(meal => meal.planId === planId);
  const dispatch = useDispatch();

  const editMealHandler = (mealId, name) => {
    dispatch(updateMealInDb(mealId, name, planId));
  }

  const addMealHandler = (name, description = '') => {
    dispatch(addMealToDb(name, description, planId));
  }

  const removeHandler = (mealId) => {
    dispatch(deleteMealFromDb(mealId));
  }

  return (
    <>
      {meals.map(meal =>
        <MealM
          key={meal.mealId}
          meal={meal}
          removeHandler={removeHandler}
          editMealHandler={editMealHandler}
        />)
      }
      <ButtonContainer>
        <Button
          color='primary'
          variant='contained'
          onClick={() => addMealHandler(DEFAULT_NEW_MEAL_NAME, '', planId)}>
          ADD NEW MEAL
        </Button>
      </ButtonContainer>
    </>
  );
}, (prevMeals, nextMeals) => { return prevMeals.planId === nextMeals.planId });