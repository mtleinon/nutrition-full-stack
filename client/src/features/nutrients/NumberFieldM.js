import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

const NumberFieldInput = withStyles({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'end'
  }
})(TextField);

export default function NumberFieldM({ intialValue, onChange }) {

  return (
    <NumberFieldInput size="small" id="standard-basic" label="Amount" type="text"
      InputProps={{
        endAdornment: <InputAdornment position="end">g</InputAdornment>,
      }}
      inputProps={{
        style: {
          textAlign: 'end',
          width: '60px',
          // TODO: set input type to number and remove arrows:
          // "-webkit-appearance": 'none',
          // margin: 0
        }
      }}
      margin="dense"
    />
  )
}