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
import { I_NAME, I_FINELLI_ID } from '../finelliData/constants'
import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'


export default React.memo(function Nutrients({ mealId }) {
  const nutrients = useSelector(state => state.nutrients.nutrients.filter(nutrient => nutrient.mealId === mealId));
  const finelliData = useSelector(state => state.finelliData.finelliData);
  const error = useSelector(state => state.nutrients.error);
  const isLoading = useSelector(state => state.nutrients.isLoading);
  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);

  const editNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    dispatch(updateNutrientInDb(nutrientId, amount, mealId, finelliId));
  }

  const addNutrientToMealHandler = (finelliId) => {
    dispatch(addNutrientToDb(0, mealId, finelliId));
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
          name={finelliData.find(row => {
            return row[I_FINELLI_ID] === nutrient.finelliId
          })[I_NAME]}
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
        <AddNutrientToMeal
          addNutrientToMealHandler={addNutrientToMealHandler}
          cancelHandler={() => setAddMode(false)} />
      </Modal>
      <div>isLoading: {isLoading ? 'Loading ...' : 'No'}</div>
      <div>Error: {error}</div>
      <SpinnerModal visible={isLoading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </div>
  );
});