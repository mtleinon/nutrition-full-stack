import React from 'react';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';

import {
  deleteMealFromDb, updateMealInDb, addMealToDb
} from './mealsSlice';

import MealM from './MealM';
import './meals.css';
import Button from '@material-ui/core/Button';

// const StyledDialog = withStyles({
//   root: {
//     BackDrop: {
//       root: {
//         backgroundColor: 'red'
//       }
//     }
//   }
// })(Dialog);



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
      {meals.map(meal => <MealM
        key={meal.mealId}
        meal={meal}
        removeHandler={removeHandler}
        editMealHandler={editMealHandler} />)}
      <div style={{ margin: '4px' }}>
        <Button
          color='primary'
          variant='contained'
          fullWidth
          onClick={() => addMealHandler(DEFAULT_NEW_MEAL_NAME, '', planId)}>
          ADD NEW MEAL
        </Button>
      </div>
    </>
  );
}, (prevMeals, nextMeals) => { return prevMeals.planId === nextMeals.planId });