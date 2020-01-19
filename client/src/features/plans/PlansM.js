import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPlansFromDb,
  deletePlanFromDb, updatePlanInDb, addPlanToDb
} from './plansSlice';
import { fetchMealsFromDb } from '../meals/mealsSlice';
import { fetchNutrientsFromDb } from '../nutrients/nutrientsSlice';
import { fetchFinelliDataFromDb } from '../finelliData/finelliDataSlice';

import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'

// import Plan from './Plan';
// import Input from '../../components/Input';
// import Button from '../../components/Button';
// import './plans.css';

import PlanM from './PlanM';

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const NEW_PLAN_DEFAULT_NAME = 'New plan';

export default function Plans() {
  const plans = useSelector(state => state.plans.plans);
  const error = useSelector(state => state.plans.error);
  const isLoading = useSelector(state => state.plans.isLoading);
  const dispatch = useDispatch();

  // const [addMode, setAddMode] = useState(false);
  // const [error, setError] = useState('');

  const editPlanHandler = (id, name) => {
    dispatch(updatePlanInDb(id, name));
  }

  const addPlanHandler = (name) => {
    dispatch(addPlanToDb(name, ''));
    // setAddMode(false);
  }

  // const cancelAddPlanHandler = () => {
  //   setAddMode(false);
  // }

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
      {plans.map(plan => <PlanM
        key={plan.planId}
        plan={plan}
        editPlanHandler={editPlanHandler}
        removeHandler={removeHandler} />
      )}
      <div style={{ justifyContent: 'center' }}>
        <Button
          variant="contained" color="primary"
          onClick={() => addPlanHandler(NEW_PLAN_DEFAULT_NAME)}
        >
          ADD NEW PLAN
        </Button>
      </div>
      <div>Error: {error}</div>
      <div>isLoading: {isLoading ? 'Loading ...' : 'No'}</div>
      <SpinnerModal visible={isLoading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </div>
  );
}