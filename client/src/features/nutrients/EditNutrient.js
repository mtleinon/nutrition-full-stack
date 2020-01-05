import React, { useState, useCallback } from 'react';
import FinelliData from '../finelliData/FinelliData';

export default function EditNutrient({
  nutrient, editNutrientHandler, addNutrientHandler, cancelHandler, mealId }) {
  const [amount, setAmount] = useState(nutrient ? nutrient.amount : '');
  const [selectedFinelliId, setSelectedFinelliId] = useState(0);

  // const selectDataHandler = (finelliId) => {
  //   setSelectedFinelliId(finelliId);
  //   console.debug('selectDataHandler: finelliId =', finelliId);
  // }

  const selectDataHandler = useCallback(
    (finelliId) => {
      setSelectedFinelliId(finelliId);
      console.debug('selectDataHandler: finelliId =', finelliId);
    }, []
  );

  return (
    <div>
      <input type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)} />
      {editNutrientHandler &&
        <button onClick={() => editNutrientHandler(nutrient.nutrientId, +amount, nutrient.mealId, nutrient.finelliId)}>
          Ok
        </button>
      }
      {addNutrientHandler &&
        <>
          <button onClick={() => addNutrientHandler(+amount, mealId, selectedFinelliId)}>Ok</button>
          <FinelliData selectDataHandler={selectDataHandler} />
        </>
      }
      <button onClick={cancelHandler}>Cancel</button>
    </div>);
}