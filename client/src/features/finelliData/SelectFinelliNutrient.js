import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import Input from '../../components/Input';
import Data from './Data';
import './selectFinelliNutrient.css';

export default React.memo(function SelectFinelliNutrient({ selectDataHandler }) {
  const finelliData = useSelector(state => state.finelliData.finelliData);
  // const error = useSelector(state => state.nutrients.error);
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
          .filter(data => {
            if (filterValue.trim() === '') {
              return true;
            }
            return filterValue.split(' ').every(word => data.name.toUpperCase().includes(word.toUpperCase()))
          })
          .map(data => <Data
            key={data.finelliId}
            data={data}
            selectDataHandler={selectDataHandler}
          />)
        }
        {/* <div>Error: {error}</div> */}
      </div>
    </div>
  );
});