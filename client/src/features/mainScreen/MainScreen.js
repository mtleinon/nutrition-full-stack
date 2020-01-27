import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPlansFromDb } from '../plans/plansSlice';
import { fetchMealsFromDb } from '../meals/mealsSlice';
import { fetchNutrientsFromDb } from '../nutrients/nutrientsSlice';
import { fetchFinelliDataFromDb } from '../finelliData/finelliDataSlice';


import PlansM from '../plans/PlansM';
import LoginUserM from '../user/LoginUserM';
import { signOutUser } from '../user/userSlice';
import SideDrawer from './SideDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    root: {
      backgroundColor: 'red'
    }
  }
}));

export default function MainScreen() {
  const theme = useTheme();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const email = useSelector(state => state.user.user.email);
  const dispatch = useDispatch();

  const drawerPaperStyle = { style: { backgroundColor: theme.palette.primary.main } };

  useEffect(() => {
    // dispatch(fetchUserDataFromDb());
    dispatch(fetchPlansFromDb());
    dispatch(fetchMealsFromDb());
    dispatch(fetchNutrientsFromDb());
    dispatch(fetchFinelliDataFromDb());
  }, [dispatch]);

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    dispatch(signOutUser());
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  console.debug('theme.palette.primary =', theme.palette.primary);
  return (
    <div>
      <Drawer
        PaperProps={drawerPaperStyle}
        open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SideDrawer />
      </Drawer>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}
            color="inherit" aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Diet Planner
          </Typography>
          <Button color="inherit" onClick={email ? handleLogout : handleOpenLogin}>
            {email ? 'Sign out' : 'Sign in'}
          </Button>
        </Toolbar>
      </AppBar>
      <LoginUserM showLogin={showLogin} handleCloseLogin={handleCloseLogin} />
      <div style={{ paddingTop: '70px' }} />
      <PlansM />
    </div>
  );
}