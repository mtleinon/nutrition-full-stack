import React from 'react';
import SelectFinelliNutrient from '../finelliData/SelectFinelliNutrient';

import HeaderRow from '../../components/HeaderRow';
import CenterVertically from '../../components/CenterVertically';
import CancelIcon from '../../components/CancelIcon';

export default function AddNutrientToMeal({
  addNutrientToMealHandler, cancelHandler }) {

  const selectDataHandler = (finelliId) => {
    addNutrientToMealHandler(finelliId);
  }

  return (
    <div style={{ height: '80%' }}>
      <HeaderRow>
        <CenterVertically>
          Select nutrient by clicking it
        </CenterVertically>
        <CancelIcon onClick={cancelHandler} />
      </HeaderRow>
      <SelectFinelliNutrient selectDataHandler={selectDataHandler} />
    </div>);
}