import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteNutrientFromDb, updateNutrientInDb, addNutrientToDb
} from './nutrientsSlice';
// import Modal from '../../components/Modal';
// import Button from '../../components/Button';
import NutrientItemM from './NutrientItemM';
import AddNutrientToMealM from './AddNutrientToMealM';
// import './nutrients.css';
import { I_NAME, I_FINELLI_ID } from '../finelliData/constants'
import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

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
  const error = useSelector(state => state.nutrients.error);
  const isLoadingNutrients = useSelector(state => state.nutrients.isLoading);
  const isLoadingFinelli = useSelector(state => state.finelliData.isLoading);

  const isLoading = isLoadingNutrients || isLoadingFinelli;

  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);

  const editNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    dispatch(updateNutrientInDb(nutrientId, amount, mealId, finelliId));
  }

  const addNutrientToMealHandler = (finelliId) => {
    console.debug('addNutrientToMealHandler 1', new Date().getSeconds(), new Date().getMilliseconds());
    dispatch(addNutrientToDb(0, mealId, finelliId));
    console.debug('addNutrientToMealHandler 2', new Date().getSeconds(), new Date().getMilliseconds());
    setAddMode(false);
  }

  const removeHandler = (id) => {
    dispatch(deleteNutrientFromDb(id));
  }

  return (
    <div>
      {isLoadingFinelli ? (
        <SpinnerModal visible={isLoading}>
          <Ring size='100' sizeUnit='px' />
        </SpinnerModal>
      ) : (
          <NutrientListM >
            {nutrients.map(nutrient =>
              <NutrientItemM
                key={nutrient.nutrientId}
                name={finelliData.find(row => {
                  return row[I_FINELLI_ID] === nutrient.finelliId
                })[I_NAME]}
                nutrient={nutrient}
                removeHandler={removeHandler}
                editNutrientHandler={editNutrientHandler}
              />)}
          </NutrientListM >
        )}
      <div >
        <Button
          color='primary'
          style={{ marginTop: '5px' }}
          onClick={() => setAddMode(true)}
        >
          ADD NEW NUTRIENT
        </Button>
      </div>
      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
        open={addMode}
        onClose={() => setAddMode(false)}
      >
        <AddNutrientToMealM
          addNutrientToMealHandler={addNutrientToMealHandler}
          cancelHandler={() => setAddMode(false)} />
      </Modal>
      <div>isLoading: {isLoading ? 'Loading ...' : 'No'}</div>
      <div>Error: {error}</div>
      <SpinnerModal visible={isLoading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </div >
  );
});