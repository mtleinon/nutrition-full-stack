import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteNutrientFromDb, updateNutrientInDb, addNutrientToDb
} from './nutrientsSlice';
// import Modal from '../../components/Modal';
// import Button from '../../components/Button';
import NutrientItemM from './NutrientItemM';
// import './nutrients.css';
import { I_NAME, I_FINELLI_ID } from '../finelliData/constants'

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import SelectFinelliNutrientM from '../finelliData/SelectFinelliNutrientM';

const NutrientListM = withStyles({
  root: {
    // background: 'red',
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  }
})(List);

export default React.memo(function NutrientsM({ mealId }) {
  const nutrients = useSelector(state => state.nutrients.nutrients.filter(nutrient => nutrient.mealId === mealId));
  const finelliData = useSelector(state => state.finelliData.finelliData);

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
      {finelliData.length > 0 &&
        <NutrientListM >
          {nutrients.map(nutrient =>
            <NutrientItemM
              key={nutrient.nutrientId}
              name={finelliData.find(row => {
                return row[I_FINELLI_ID] === nutrient.finelliId
              })[I_NAME]}
              nutrientData={finelliData.find(row => {
                return row[I_FINELLI_ID] === nutrient.finelliId
              })}
              nutrient={nutrient}
              removeHandler={removeHandler}
              editNutrientHandler={editNutrientHandler}
            />)}
        </NutrientListM >
      }
      <div style={{ margin: '4px' }} >
        <Button
          color='primary'
          variant='contained'

          style={{ marginTop: '5px' }}
          onClick={() => setAddMode(true)}
        >
          ADD NEW NUTRIENT
        </Button>
      </div>
      <SelectFinelliNutrientM open={addMode} onClose={() => setAddMode(false)}
        selectDataHandler={addNutrientToMealHandler} />
    </div >
  );
});