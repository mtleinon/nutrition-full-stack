import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
  deletePlanFromDb, updatePlanInDb, addPlanToDb
} from './plansSlice';

import PlanM from './PlanM';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ButtonContainer from '../../componentsM/ButtonContainer';

const useStyles = makeStyles(theme => ({
  plansContainer: {
    height: 'calc(100% - 80px)',
    overflowY: 'overlay',
    overflowX: 'hidden',
    paddingRight: '20px'
  }
}));

const NEW_PLAN_DEFAULT_NAME = '';

export default function Plans() {
  const classes = useStyles();

  const plans = useSelector(state => state.plans.plans);
  const userId = useSelector(state => state.user.user.userId);

  const dispatch = useDispatch();
  const [lastlyUpdatedId, setLastlyUpdatedId] = useState(0);

  const editPlanHandler = (id, name) => {
    setLastlyUpdatedId(id);
    dispatch(updatePlanInDb(id, name));
  }

  const addPlanHandler = (name) => {
    dispatch(addPlanToDb(name, ''));
  }

  const removeHandler = (id) => {
    dispatch(deletePlanFromDb(id));
  }

  return (
    <Paper style={{ padding: '4px', backgroundColor: '#eee', overflowY: 'scroll', maxHeight: 'calc(100% - 80px)' }}>
      {plans.map(plan =>
        <PlanM
          key={plan.planId}
          plan={plan}
          lastlyUpdatedId={lastlyUpdatedId}
          editPlanHandler={editPlanHandler}
          removeHandler={removeHandler}
        />
      )}
      <ButtonContainer>
        <Button

          style={{ margin: '4px auto 4px auto' }}
          disableRipple
          variant="contained" color="primary"
          onClick={() => addPlanHandler(NEW_PLAN_DEFAULT_NAME)}
          disabled={userId === 0}
        >
          ADD NEW PLAN
        </Button>
      </ButtonContainer>
    </Paper>
  );
}