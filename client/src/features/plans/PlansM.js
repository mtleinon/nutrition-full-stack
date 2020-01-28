import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  deletePlanFromDb, updatePlanInDb, addPlanToDb
} from './plansSlice';


// import Plan from './Plan';
// import Input from '../../components/Input';
// import Button from '../../components/Button';
// import './plans.css';

import PlanM from './PlanM';

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const NEW_PLAN_DEFAULT_NAME = '';

export default function Plans() {
  const plans = useSelector(state => state.plans.plans);
  const dispatch = useDispatch();
  const [lastlyUpdatedId, setLastlyUpdatedId] = useState(0);

  // const [addMode, setAddMode] = useState(false);
  // const [error, setError] = useState('');

  const editPlanHandler = (id, name) => {
    setLastlyUpdatedId(id);
    dispatch(updatePlanInDb(id, name));
  }

  const addPlanHandler = (name) => {
    dispatch(addPlanToDb(name, ''));
    // setAddMode(false);
  }

  // const cancelAddPlanHandler = () => {
  //   setAddMode(false);
  // }

  // useEffect(() => {
  //   dispatch(fetchPlansFromDb(userId));
  //   dispatch(fetchMealsFromDb(userId));
  //   dispatch(fetchNutrientsFromDb(userId));
  //   dispatch(fetchFinelliDataFromDb());
  // }, [dispatch, userId]);


  const removeHandler = (id) => {
    dispatch(deletePlanFromDb(id));
  }

  return (
    <div className="plans">
      {plans.map(plan => <PlanM
        key={plan.planId}
        plan={plan}
        lastlyUpdatedId={lastlyUpdatedId}
        editPlanHandler={editPlanHandler}
        removeHandler={removeHandler} />
      )}
      <Container style={{ justifyItems: 'center' }}>
        <Button
          variant="contained" color="primary"
          onClick={() => addPlanHandler(NEW_PLAN_DEFAULT_NAME)}
        >
          ADD NEW PLAN
        </Button>
      </Container>
      {/* <div>Error: {error}</div>
      <div>isLoading: {isLoading ? 'Loading ...' : 'No'}</div> */}
    </div>
  );
}