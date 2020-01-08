import React, { useState, useCallback } from 'react';
import FinelliData from '../finelliData/SelectFinelliNutrient';

import HeaderRow from '../../components/HeaderRow';
import CenterVertically from '../../components/CenterVertically';
import CancelIcon from '../../components/CancelIcon';
import CheckIcon from '../../components/CheckIcon';
// import NutrientRow from '../../components/NutrientRow';
import EditableValue from '../../components/EditableValue';
import WrapText from '../../components/WrapText';

export default function AddNutrientToMeal({
  nutrient, AddNutrientToMealHandler, addNutrientToMealHandler, cancelHandler, mealId }) {
  const [amount, setAmount] = useState('0');
  const [selectedFinelliId, setSelectedFinelliId] = useState(0);
  const [selectedFinelliName, setSelectedFinelliName] = useState('');

  // const selectDataHandler = (finelliId) => {
  //   setSelectedFinelliId(finelliId);
  //   console.debug('selectDataHandler: finelliId =', finelliId);
  // }

  const selectDataHandler = useCallback(
    (finelliId, name) => {
      setSelectedFinelliId(finelliId);
      setSelectedFinelliName(name);
      console.debug('selectDataHandler: finelliId =', finelliId, name);
    }, []
  );

  return (
    <div style={{ height: '80%' }}>
      <HeaderRow>
        <WrapText>
          {selectedFinelliName}
        </WrapText>
        <CenterVertically>
          <EditableValue
            type="number"
            okHandler={(amount) => setAmount(amount)}
            value={amount}
          />
          <CenterVertically style={{ marginLeft: '3px', marginRight: '10px', marginBottom: '3px' }}>
            g
          </CenterVertically>
          <CenterVertically>
            <CheckIcon onClick={() => addNutrientToMealHandler(+amount, mealId, selectedFinelliId)} />
            <CancelIcon onClick={cancelHandler} />
          </CenterVertically>
        </CenterVertically>
      </HeaderRow>
      <FinelliData selectDataHandler={selectDataHandler} />
    </div>);
}