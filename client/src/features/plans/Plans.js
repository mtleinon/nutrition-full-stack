import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPlansFromDb,
  deletePlanFromDb, updatePlanInDb, addPlanToDb
} from './plansSlice';
import { fetchMealsFromDb } from '../meals/mealsSlice';
import { fetchNutrientsFromDb } from '../nutrients/nutrientsSlice';
import { fetchFinelliDataFromDb } from '../finelliData/finelliDataSlice';

import Plan from './Plan';
import Input from '../../components/Input';
import './plans.css';

export default function Plans() {
  const plans = useSelector(state => state.plans.plans);
  const error = useSelector(state => state.plans.error);
  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);
  // const [error, setError] = useState('');

  const editPlanHandler = (id, name) => {
    dispatch(updatePlanInDb(id, name));
  }

  const addPlanHandler = (name) => {
    dispatch(addPlanToDb(name, ''));
    setAddMode(false);
  }

  const cancelAddPlanHandler = () => {
    setAddMode(false);
  }

  useEffect(() => {
    dispatch(fetchPlansFromDb());
    dispatch(fetchMealsFromDb());
    dispatch(fetchNutrientsFromDb());
    dispatch(fetchFinelliDataFromDb());
  }, [dispatch]);


  const removeHandler = (id) => {
    dispatch(deletePlanFromDb(id));
  }

  return (
    <div className="plans">
      <h2>Plans</h2>
      {plans.map(plan => <Plan
        key={plan.planId}
        plan={plan}
        removeHandler={removeHandler}
        editPlanHandler={editPlanHandler} />)}
      {addMode ? <Input okHandler={addPlanHandler} cancelHandler={cancelAddPlanHandler} /> : null}
      <div><button onClick={() => setAddMode(true)}>ADD NEW PLAN</button></div>
      <div>Error: {error}</div>
    </div>
  );
}