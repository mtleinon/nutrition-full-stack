import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';

import Typography from '@material-ui/core/Typography';
import InputFieldM from '../plans/InputFieldM';
import NutrientRow from '../nutrientReport/NutrientRow';

const useStyles = makeStyles({
  listItemIconRoot: {
    minWidth: '24px',
    cursor: 'pointer'
  },
  nutrientContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  nutrientColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  nutrientRowText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  nutrientRowNumber: {
    marginLeft: '12px',
    display: 'flex',
    flexDirection: 'row',
  },
  iconContainer: {
    margin: '12px 0 12px 12px',
    alignSelf: 'flex-end'
  },
  nutrientName: {
    padding: '8px'
  }
});


export default function NutrientM(props) {
  const classes = useStyles();

  const editNutrientHandler = (id, amount) => {
    props.editNutrientHandler(
      id, amount, props.nutrient.mealId, props.nutrient.finelliId);
  };

  return (
    <div id="1" className={classes.nutrientContainer}>
      <div id="2" className={classes.nutrientRowText}>
        <Typography
          className={classes.nutrientName}
          component="div"
          variant="body2"
          color="textPrimary"
        >
          {props.name}
        </Typography>
        <div id="3" className={classes.nutrientRowNumber}>
          <InputFieldM
            label='Amount'
            id={props.nutrient.nutrientId}
            initialValue={props.nutrient.amount}
            editHandler={editNutrientHandler}
            type='number'
            unit='g'
          />
          <div className={classes.iconContainer}>
            <ListItemIcon onClick={() => props.removeHandler(props.nutrient.nutrientId)}
              classes={{ root: classes.listItemIconRoot }}>
              <DeleteIcon />
            </ListItemIcon>
          </div>
        </div>
      </div>
      <NutrientRow nutrientId={props.nutrient.nutrientId} sideMargins={'5px'} />
    </div>
  );
}