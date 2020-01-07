import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteNutrientFromDb, updateNutrientInDb, addNutrientToDb
} from './nutrientsSlice';
import Modal from '../../components/Modal';
import Nutrient from './Nutrient';
import EditNutrient from './EditNutrient';
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

  const addNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    console.debug('addNutrientHandler 1', new Date().getSeconds(), new Date().getMilliseconds());
    dispatch(addNutrientToDb(nutrientId, amount, mealId, finelliId));
    console.debug('addNutrientHandler 2', new Date().getSeconds(), new Date().getMilliseconds());
    setAddMode(false);
  }

  const removeHandler = (id) => {
    dispatch(deleteNutrientFromDb(id));
  }

  return (
    <div>
      {nutrients.map(nutrient => <Nutrient
        key={nutrient.nutrientId}
        name={finelliData.find(row => row.finelliId === nutrient.finelliId).name}
        nutrient={nutrient}
        removeHandler={removeHandler}
        editNutrientHandler={editNutrientHandler} />)}
      <div><button onClick={() => setAddMode(true)}>ADD NEW NUTRIENT</button></div>
      <Modal visible={addMode} dismiss={() => setAddMode(false)}>
        <p>Select nutrient</p>
        <EditNutrient addNutrientHandler={addNutrientHandler} mealId={mealId} />
      </Modal>
      <div>Error: {error}</div>
    </div>
  );
});