import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LongDialog from '../nutrientReport/LongDialog';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import { I_NAME, I_FINELLI_ID } from './constants'

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    margin: theme.spacing(1, 2, 2, 2),

  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    // transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   '&:focus': {
    //     width: 200,
    //   },
    // },
  },
  list: {
    width: '95vw',
    maxWidth: '100%',
    height: 'calc( 100% - 80px)',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
}));

const RESULT_COUNT_TO_SHOW = 20;

export default function SelectFinelliNutrientM(
  { open, onClose, selectDataHandler }) {

  const classes = useStyles();

  const finelliData = useSelector(state => state.finelliData.finelliData);
  const [filterValue, setFilterValue] = useState('');
  const [resultCountToShow, setResultCountToShow] = useState(RESULT_COUNT_TO_SHOW);

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
    setResultCountToShow(RESULT_COUNT_TO_SHOW);
  };

  const handleShowAllResults = () => {
    setResultCountToShow(state => state + RESULT_COUNT_TO_SHOW);
  };

  const onClickHandler = (finelliId) => {
    console.debug('handler clicked =', finelliId);
    selectDataHandler(finelliId);
  };
  return (
    <LongDialog
      dialogTitle='Select nutrient'
      open={open}
      hideModal={onClose}
      aria-labelledby="customized-dialog-title"
    >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          value={filterValue}
          onChange={handleFilterValueChange}
          placeholder="Search nutrient..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <List className={classes.list} component="nav" aria-label="main mailbox folders">

        {finelliData
          .filter(nutrientData => {
            if (filterValue.trim() === '') {
              return true;
            }
            return filterValue.split(' ').every(word => nutrientData[I_NAME].toUpperCase().includes(word.toUpperCase()))
          })
          .slice(0, resultCountToShow)
          .map((nutrientData, i) =>
            <React.Fragment key={nutrientData[I_FINELLI_ID]} >
              <ListItem button onClick={() => onClickHandler(nutrientData[I_FINELLI_ID])} >
                <ListItemText>
                  {nutrientData[I_NAME]}
                </ListItemText>
              </ListItem>
              <Divider light />

              {(i === resultCountToShow - 1) && <Button variant="outlined" color="primary"
                onClick={handleShowAllResults}>Show next {RESULT_COUNT_TO_SHOW}</Button>
              }
            </React.Fragment>
          )
        }
      </List>
    </LongDialog>
  );
};


        //TODO: Material UI List was too slow, check does the virtual list perform better
        //  <List component="nav" aria-label="main mailbox folders">
        //   {finelliData
        //     .filter(nutrientData => {
        //       if (filterValue.trim() === '') {
        //         return true;
        //       }
        //       return filterValue.split(' ').every(word => nutrientData[I_NAME].toUpperCase().includes(word.toUpperCase()))
        //     })
        //     .map(nutrientData => (
        //       <ListItem button key={nutrientData[I_FINELLI_ID]}>
        //         <DataRow
        //           nutrientData={nutrientData}
        //           selectDataHandler={selectDataHandler}
        //         />)
        //     </ListItem>))
        //   }
        // </List> 


      //   .map((nutrientData, i) =>
      //   <React.Fragment key={nutrientData[I_FINELLI_ID]}>
      //     <DataRow
      //       nutrientData={nutrientData}
      //       selectDataHandler={selectDataHandler}
      //     />
      //     {(i === resultCountToShow - 1) && <Button variant="outlined" color="primary"
      //       onClick={handleShowAllResults}>Show next {RESULT_COUNT_TO_SHOW}</Button>
      //     }
      //   </React.Fragment>
      // )
