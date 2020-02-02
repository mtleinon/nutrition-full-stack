import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { setError } from '../mainPage/mainPageSlice';

export default function MainPage() {
  const dispatch = useDispatch();
  const error = useSelector(state => state.mainPage.error);

  return (
    <Dialog
      open={Boolean(error)}
      onClose={() => dispatch(setError(''))}
    >
      <DialogTitle id="form-dialog-title">Error {error}</DialogTitle>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => dispatch(setError(''))} color="primary"
        >
          OK
          </Button>
      </DialogActions>
    </Dialog>
  )
}