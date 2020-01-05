import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPlansFromDb,
  deletePlanFromDb, updatePlanInDb, addPlanToDb
} from './plansSlice';
import { fetchMealsFromDb } from '../meals/mealsSlice';
import Plan from './Plan';
import EditPlan from './EditPlan';
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

  const addPlanHandler = (name, description = '') => {
    dispatch(addPlanToDb(name, description));
    setAddMode(false);
  }

  useEffect(() => {
    dispatch(fetchPlansFromDb());
    dispatch(fetchMealsFromDb());
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
      {addMode ? <EditPlan addPlanHandler={addPlanHandler} /> : null}
      <div><button onClick={() => setAddMode(true)}>ADD NEW PLAN</button></div>
      <div>Error: {error}</div>
    </div>
  );
}