import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../mainPage/mainPageSlice';
import { fetchUserDataFromDb } from '../user/userSlice';

import { fetchPlansFromDb, initializePlans } from '../plans/plansSlice';
import { fetchMealsFromDb, initializeMeals } from '../meals/mealsSlice';
import { fetchNutrientsFromDb, initializeNutrients } from '../nutrients/nutrientsSlice';
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

export default function MainPage() {
  const error = useSelector(state => state.mainPage.error);
  const loading = useSelector(state => state.mainPage.loading);
  const theme = useTheme();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const userId = useSelector(state => state.user.user.userId);
  const dispatch = useDispatch();

  const drawerPaperStyle = { style: { backgroundColor: theme.palette.primary.main } };

  // Fetch initial user data
  useEffect(() => {
    dispatch(fetchUserDataFromDb());
  }, [dispatch]);

  useEffect(() => {
    if (userId > 0) {
      dispatch(fetchUserDataFromDb());
      dispatch(fetchPlansFromDb());
      dispatch(fetchMealsFromDb());
      dispatch(fetchNutrientsFromDb());
      dispatch(fetchFinelliDataFromDb());
    }
  }, [dispatch, userId]);

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    dispatch(signOutUser());
    dispatch(initializePlans());
    dispatch(initializeMeals());
    dispatch(initializeNutrients());
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
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
          <Button color="inherit" onClick={userId ? handleLogout : handleOpenLogin}>
            {userId ? 'Sign out' : 'Sign in'}
          </Button>
        </Toolbar>
      </AppBar>
      <LoginUserM showLogin={showLogin} handleCloseLogin={handleCloseLogin} />
      <div style={{ paddingTop: '70px' }} />
      <PlansM />
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
      <SpinnerModal visible={loading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </div>
  );
}