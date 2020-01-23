import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// import NutrientRow from './NutrientRow';

const useStyles = makeStyles(({
  fullWidth: {
    width: '100%',
  },
}));

const numberInputStyle = {
  style: {
    textAlign: 'end',
    width: '60px',
    // TODO: set input type to number and remove arrows:
    // "-webkit-appearance": 'none',
    // margin: 0
  },

};


export default function InputFieldM({ label, id, initialValue, isLoading, lastlyUpdated, editHandler, type, unit }) {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    console.debug('onChange =', e.target.value);
  }

  const onClick = (e) => {
    console.debug('onClick e =', e);
    e.stopPropagation();
  };

  const onKeyUp = (e) => {
    // console.debug('onKeyUp e =', e.key);
    if (e.key === 'Enter') {
      if (value !== initialValue) {
        editHandler(id, value);
        console.debug('Update value to DB ', value);
      }
    }
    // e.stopPropagation();
  };

  const onBlur = (e) => {
    console.debug('onBlur e =', e);
    if (value !== initialValue) {
      editHandler(id, value);
      console.debug('Update value to DB ', value);
    }
    e.stopPropagation();
  };

  return (
    <TextField margin="dense"
      className={classes.fullWidth}
      // id="name1"
      label={label}
      onChange={onChange} value={value}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      color="primary"
      inputProps={(type === 'number') ? numberInputStyle : {}}
      InputProps={unit ? ({
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
      }) : {}
      }
    />
  );
}