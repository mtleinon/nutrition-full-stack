import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteNutrientFromDb, updateNutrientInDb, addNutrientToDb
} from './nutrientsSlice';

import Nutrient from './Nutrient';
import EditNutrient from './EditNutrient';
import './nutrients.css';

export default function Nutrients({ mealId }) {
  const nutrients = useSelector(state => state.nutrients.nutrients.filter(nutrient => nutrient.mealId === mealId));
  const error = useSelector(state => state.nutrients.error);
  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);

  const editNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    dispatch(updateNutrientInDb(nutrientId, amount, mealId, finelliId));
  }

  const addNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    console.debug('addNutrientHandler 1', new Date().getMilliseconds());
    dispatch(addNutrientToDb(nutrientId, amount, mealId, finelliId));
    console.debug('addNutrientHandler 2', new Date().getMilliseconds());
    setAddMode(false);
  }

  // useEffect(() => {
  //   dispatch(fetchNutrientsFromDb());
  // }, [dispatch]);

  const removeHandler = (id) => {
    dispatch(deleteNutrientFromDb(id));
  }

  return (
    <div className="nutrients">
      <h4>Nutrients</h4>
      {nutrients.map(nutrient => <Nutrient
        key={nutrient.nutrientId}
        nutrient={nutrient}
        removeHandler={removeHandler}
        editNutrientHandler={editNutrientHandler} />)}
      {addMode ? <EditNutrient addNutrientHandler={addNutrientHandler} mealId={mealId} /> : null}
      <div><button onClick={() => setAddMode(true)}>ADD NEW NUTRIENT</button></div>
      <div>Error: {error}</div>
    </div>
  );
}