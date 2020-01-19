import React from 'react';
import SelectFinelliNutrientM from '../finelliData/SelectFinelliNutrientM';

import HeaderRow from '../../components/HeaderRow';
import CenterVertically from '../../components/CenterVertically';
import CancelIcon from '../../components/CancelIcon';

const AddNutrientToMeal = React.forwardRef((
  { addNutrientToMealHandler, cancelHandler }, ref) => {

  const selectDataHandler = (finelliId) => {
    addNutrientToMealHandler(finelliId);
  }

  return (
    <div ref={ref} style={{ height: '80%', backgroundColor: 'white' }}>
      <HeaderRow>
        <CenterVertically>
          Select nutrient by clicking it
        </CenterVertically>
        <CancelIcon onClick={cancelHandler} />
      </HeaderRow>
      <SelectFinelliNutrientM selectDataHandler={selectDataHandler} />
    </div>);
});

export default AddNutrientToMeal;