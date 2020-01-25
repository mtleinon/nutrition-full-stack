import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DataRow from './DataRow';

import './selectFinelliNutrient.css';
import { I_NAME, I_FINELLI_ID } from './constants'

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import DialogTitle from '@material-ui/core/DialogTitle';

// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';
// import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginLeft: 0,
    width: '80%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
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
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitleWithCloseButton = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

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

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="customized-dialog-title"
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitleWithCloseButton id="customized-dialog-title" onClose={onClose}
      >
        Select nutrient
      </DialogTitleWithCloseButton>
      <div>
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
      </div>

      <div className="selectFinelliNutrient"
      // style={{ width: '100%', maxWidth: '500px' }}
      >
        {finelliData
          .filter(nutrientData => {
            if (filterValue.trim() === '') {
              return true;
            }
            return filterValue.split(' ').every(word => nutrientData[I_NAME].toUpperCase().includes(word.toUpperCase()))
          })
          .slice(0, resultCountToShow)
          .map((nutrientData, i) => <>
            <DataRow
              key={nutrientData[I_FINELLI_ID]}
              nutrientData={nutrientData}
              selectDataHandler={selectDataHandler}
            />
            {(i === resultCountToShow - 1) && <Button variant="outlined" color="primary"
              onClick={handleShowAllResults}>Show next {RESULT_COUNT_TO_SHOW}</Button>
            }
          </>
          )
        }
      </div>
    </Dialog>
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