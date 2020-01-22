import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ErrorDialog({ error, clearError }) {
  return <Dialog
    open={error !== ''}
    onClose={clearError}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Error happened"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {error}
      </DialogContentText>
    </DialogContent>
    <DialogActions>

      <Button onClick={clearError} color="primary" autoFocus>
        Ok
          </Button>
    </DialogActions>
  </Dialog>
}