import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'

import { fetchUserDataFromDb } from '../user/userSlice';
import { fetchPlansFromDb, initializePlans } from '../plans/plansSlice';
import { fetchMealsFromDb, initializeMeals } from '../meals/mealsSlice';
import { fetchNutrientsFromDb, initializeNutrients } from '../nutrients/nutrientsSlice';
import { addAllFinelliData } from '../finelliData/finelliDataSlice';

import PlansM from '../plans/PlansM';
import SignInM from '../user/SignInUserM';
import { signOutUser } from '../user/userSlice';
import UpperAppBar from './UpperAppBar';
import SideDrawer from './SideDrawer';
import ErrorDialog from './ErrorDialog';

const finelli = require('../../data/finelli3con.json');

const useStyles = makeStyles(theme => ({
  mainPage: {
    maxWidth: '600px',
    margin: 'auto',
    height: '100vh',
  },
  upperAppBarSpace: {
    paddingTop: '70px'
  }
}));

// Main page of the app
export default function MainPage() {
  const loading = useSelector(state => state.mainPage.loading);
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const userId = useSelector(state => state.user.user.userId);
  const dispatch = useDispatch();

  // When application starts, fetch user data if user has been logged in.
  useEffect(() => {
    dispatch(fetchUserDataFromDb());
    dispatch(addAllFinelliData(finelli));
  }, [dispatch]);

  // When a different user signs in, fetch user data newly.
  useEffect(() => {
    if (userId > 0) {
      dispatch(fetchUserDataFromDb());
      dispatch(fetchPlansFromDb());
      dispatch(fetchMealsFromDb());
      dispatch(fetchNutrientsFromDb());
    }
  }, [dispatch, userId]);

  const handleSignIn = () => {
    setShowSignin(true);
  };

  // If user signed out, clear user data.
  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    dispatch(signOutUser());
    dispatch(initializePlans());
    dispatch(initializeMeals());
    dispatch(initializeNutrients());
  };

  const handleCloseSignin = () => {
    setShowSignin(false);
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  }

  const handleCloseSideDrawer = () => {
    setDrawerOpen(false);
  }

  return (
    <div className={classes.mainPage}>
      <div className={classes.upperAppBarSpace} />

      <SideDrawer
        drawerOpen={drawerOpen} handleCloseSideDrawer={handleCloseSideDrawer}>
      </SideDrawer>

      <UpperAppBar
        handleOpenDrawer={handleOpenDrawer}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
        userId={userId} />

      <SignInM showSignin={showSignin} handleCloseSignin={handleCloseSignin} />

      <PlansM />

      <ErrorDialog />

      <SpinnerModal visible={loading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>

    </div>
  );
}