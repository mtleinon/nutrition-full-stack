import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DataRow from './DataRow';
import './selectFinelliNutrient.css';
import { I_NAME, I_FINELLI_ID } from './constants'

// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';
import List from '@material-ui/core/List';

export default React.memo(function SelectFinelliNutrientM(
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
        <List component="nav" aria-label="main mailbox folders">
          {finelliData
            .filter(nutrientData => {
              if (filterValue.trim() === '') {
                return true;
              }
              return filterValue.split(' ').every(word => nutrientData[I_NAME].toUpperCase().includes(word.toUpperCase()))
            })
            .map(nutrientData => (
              <ListItem button key={nutrientData[I_FINELLI_ID]}>
                <DataRow
                  nutrientData={nutrientData}
                  selectDataHandler={selectDataHandler}
                />)
            </ListItem>))
          }
        </List>
      </div>
    </div>
  );
});