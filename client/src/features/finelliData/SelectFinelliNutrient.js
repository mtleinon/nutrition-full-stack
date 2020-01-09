import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DataRow from './DataRow';
import './selectFinelliNutrient.css';
import { I_NAME, I_FINELLI_ID } from '../finelliData/constants'

export default React.memo(function SelectFinelliNutrient(
  { selectDataHandler }) {
  const finelliData = useSelector(state => state.finelliData.finelliData);
  const [filterValue, setFilterValue] = useState('');

  return (
    <div>
      <label htmlFor="filterValue">Search Nutrient: </label>
      <input
        id="filterValue"
        type="text"
        placeholder="word1 word2 word3..."
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
      />
      <div className="selectFinelliNutrient">
        {finelliData
          .filter(nutrientData => {
            if (filterValue.trim() === '') {
              return true;
            }
            return filterValue.split(' ').every(word => nutrientData[I_NAME].toUpperCase().includes(word.toUpperCase()))
          })
          .map(nutrientData => <DataRow
            key={nutrientData[I_FINELLI_ID]}
            nutrientData={nutrientData}
            selectDataHandler={selectDataHandler}
          />)
        }
      </div>
    </div>
  );
});