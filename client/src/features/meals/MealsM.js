import React from 'react';
import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteMealFromDb, updateMealInDb, addMealToDb
} from './mealsSlice';

import MealM from './MealM';
import './meals.css';
import Button from '@material-ui/core/Button';

const DEFAULT_NEW_MEAL_NAME = "New meal";

export default React.memo(function MealsM({ planId }) {
  const meals = useSelector(state => state.meals.meals).filter(meal => meal.planId === planId);
  const error = useSelector(state => state.meals.error);
  const isLoading = useSelector(state => state.meals.isLoading);
  const dispatch = useDispatch();

  const editMealHandler = (id, name, description, planId) => {
    dispatch(updateMealInDb(id, name, description, planId));
  }

  const addMealHandler = (name, description, planId) => {
    dispatch(addMealToDb(name, description, planId));
  }

  const removeHandler = (id) => {
    dispatch(deleteMealFromDb(id));
  }

  return (
    <>
      {meals.map(meal => <MealM
        key={meal.mealId}
        meal={meal}
        removeHandler={removeHandler}
        editMealHandler={editMealHandler} />)}
      <div>
        <Button
          color='primary'
          onClick={() => addMealHandler(DEFAULT_NEW_MEAL_NAME, '', planId)}>
          ADD NEW MEAL
        </Button>
      </div>
      <div>isLoading: {isLoading ? 'Loading ...' : 'No'}</div>
      <div>Error: {error}</div>
      <SpinnerModal visible={isLoading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </>
  );
}, (prevMeals, nextMeals) => { return prevMeals.planId === nextMeals.planId });