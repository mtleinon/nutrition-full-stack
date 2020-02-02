import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toolbar: {
    width: '600px',
    justifyContent: 'space-between',
  },
}));

export default function UpperAppBar({ handleOpenDrawer, handleSignIn, handleSignOut, userId }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} >
      <Toolbar className={classes.toolbar}>

        <IconButton edge="start" className={classes.menuButton}
          color="inherit" aria-label="menu"
          onClick={handleOpenDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" >Diet Planner</Typography>

        <Button color="inherit" onClick={userId ? handleSignOut : handleSignIn}>
          {userId ? 'Sign out' : 'Sign in'}
        </Button>

      </Toolbar>
    </AppBar>
  )
}