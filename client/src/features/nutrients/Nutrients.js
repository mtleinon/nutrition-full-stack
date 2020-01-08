import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteNutrientFromDb, updateNutrientInDb, addNutrientToDb
} from './nutrientsSlice';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Nutrient from './Nutrient';
import AddNutrientToMeal from './AddNutrientToMeal';
import './nutrients.css';

export default React.memo(function Nutrients({ mealId }) {
  const nutrients = useSelector(state => state.nutrients.nutrients.filter(nutrient => nutrient.mealId === mealId));
  const finelliData = useSelector(state => state.finelliData.finelliData);
  const error = useSelector(state => state.nutrients.error);
  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);

  const editNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    dispatch(updateNutrientInDb(nutrientId, amount, mealId, finelliId));
  }

  const addNutrientToMealHandler = (nutrientId, amount, mealId, finelliId) => {
    console.debug('addNutrientToMealHandler 1', new Date().getSeconds(), new Date().getMilliseconds());
    dispatch(addNutrientToDb(nutrientId, amount, mealId, finelliId));
    console.debug('addNutrientToMealHandler 2', new Date().getSeconds(), new Date().getMilliseconds());
    setAddMode(false);
  }

  const removeHandler = (id) => {
    dispatch(deleteNutrientFromDb(id));
  }

  return (
    <div>
      {nutrients.map(nutrient =>
        <Nutrient
          key={nutrient.nutrientId}
          name={finelliData.find(row => row.finelliId === nutrient.finelliId).name}
          nutrient={nutrient}
          removeHandler={removeHandler}
          editNutrientHandler={editNutrientHandler}
        />)}
      <div>
        <Button
          color='lightGreen'
          style={{ marginTop: '5px' }}
          onClick={() => setAddMode(true)}
        >
          ADD NEW NUTRIENT
        </Button>
      </div>
      <Modal visible={addMode} dismiss={() => setAddMode(false)}>
        <h3>Add nutrient to meal</h3>
        <AddNutrientToMeal
          addNutrientToMealHandler={addNutrientToMealHandler}
          mealId={mealId}
          cancelHandler={() => setAddMode(false)} />
      </Modal>
      <div>Error: {error}</div>
    </div>
  );
});