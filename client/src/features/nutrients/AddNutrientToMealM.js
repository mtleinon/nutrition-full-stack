import React from 'react';
import SelectFinelliNutrientM from '../finelliData/SelectFinelliNutrientM';


const AddNutrientToMeal = React.forwardRef((
  { addNutrientToMealHandler, cancelHandler }, ref) => {

  const selectDataHandler = (finelliId) => {
    // addNutrientToMealHandler(finelliId);
    console.debug('select handler =', finelliId);
  }

  return (
    <div ref={ref} style={{ height: '80%', backgroundColor: 'white' }}>
      {/* <HeaderRow>
        <CenterVertically>
          Select nutrient by clicking it
        </CenterVertically>
        <CancelIcon onClick={cancelHandler} />
      </HeaderRow> */}
      <SelectFinelliNutrientM selectDataHandler={selectDataHandler} />
    </div>);
});

export default AddNutrientToMeal;