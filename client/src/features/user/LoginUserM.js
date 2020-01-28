import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'

import { useSelector, useDispatch } from 'react-redux';
import { addUserToDb, signinUserToBackend } from './userSlice';

const modes = {
  SIGNIN: 'signIn',
  SIGNUP: 'signUp',
}

const useStyles = makeStyles(theme => ({
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //     width: 200,
  //   },
  // },
  // dialog: {
  root: {
    width: '100%',
  }
  // }
}));

export default function LoginUserM({ showLogin, handleCloseLogin }) {

  const error = useSelector(state => state.user.error);
  const isLoading = useSelector(state => state.plans.isLoading);

  const [mode, setMode] = useState(modes.SIGNIN);
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    gender: '',
    age: 0,
    weight: 0,
    height: 0
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSetUser = field => event => {
    const value = event.target.value;
    setUser(state => ({ ...state, [field]: value }))
  };

  const handleSignIn = () => {
    if (mode === modes.SIGNIN) {
      dispatch(signinUserToBackend(user.email, user.password));
      handleCloseLogin();
    } else {
      setMode(modes.SIGNIN);
    }
  };

  const handleSignUp = () => {
    if (mode === modes.SIGNUP) {
      dispatch(addUserToDb(user));
      handleCloseLogin();
    } else {
      setMode(modes.SIGNUP);
    }
  };

  console.debug('error =', error);
  return (
    <div>
      <Dialog
        open={showLogin}
        onClose={handleCloseLogin}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{mode === modes.SIGNIN ? 'Sign in' : 'Sign Up'}</DialogTitle>
        < DialogContent >
          {/* <DialogContentText>
            Login.
          </DialogContentText> */}
          <form className={classes.root}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={user.email}
              onChange={handleSetUser('email')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={user.password}
              onChange={handleSetUser('password')}
            />
            {mode === modes.SIGNUP && (
              <>
                <TextField
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={user.name}
                  onChange={handleSetUser('name')}
                />
                <TextField
                  margin="dense"
                  id="gender"
                  label="Gender"
                  type="text"
                  fullWidth
                  value={user.gender}
                  onChange={handleSetUser('gender')}
                />
                <TextField
                  margin="dense"
                  id="age"
                  label="Age"
                  type="number"
                  fullWidth
                  value={user.age}
                  onChange={handleSetUser('age')}
                />
                <TextField
                  margin="dense"
                  id="weight"
                  label="Weight"
                  type="number"
                  fullWidth
                  value={user.weight}
                  onChange={handleSetUser('weight')}
                />
                <TextField
                  margin="dense"
                  id="height"
                  label="Height"
                  type="number"
                  fullWidth
                  value={user.height}
                  onChange={handleSetUser('height')}
                />
              </>)
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant={mode === modes.SIGNIN ? 'contained' : 'outlined'}
            onClick={handleSignIn} color="primary"
          >
            Sign in
          </Button>
          <Button
            variant={mode === modes.SIGNUP ? 'contained' : 'outlined'}
            onClick={handleSignUp} color="primary"
          >
            Sign up
          </Button>
          <Button onClick={handleCloseLogin} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <SpinnerModal visible={isLoading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </div>
  );
}
