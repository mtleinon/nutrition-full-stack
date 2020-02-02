import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  dialogContent: {
    height: 'calc(90vh - 70px)',
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary.contrastText
  },
}));

export default function LongDialog({ open, dialogTitle, hideModal, ref2, children }) {
  const classes = useStyles();
  const narrowScreen = useMediaQuery('(max-width:600px)');

  return (
    <Dialog
      fullScreen={narrowScreen}
      onClose={hideModal}
      open={open}
    // aria-labelledby="customized-dialog-title"
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>

        <Typography variant="h6">{dialogTitle}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={hideModal}>
          <CloseIcon />
        </IconButton>

      </DialogTitle>

      <DialogContent className={classes.dialogContent}>

        {children}

      </DialogContent>
    </Dialog>
  );
}

