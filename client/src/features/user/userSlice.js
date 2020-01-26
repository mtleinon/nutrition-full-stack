import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    userId: 0,
    email: '',
    name: '',
    age: 0,
    weight: 0,
    height: 0,
  },
  error: '',
  isLoading: false
};

const plansSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startDbOperation(state, _) {
      state.error = '';
      state.isLoading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    addUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    signInUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    signUpUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    signOutUser(state, action) {
      state.user = initialState.user;
    },
    updateUser(state, action) {
      console.debug('User updation not implemented yet =', action);
    }
  }
});

export const { addUser, signInUser, signUpUser, signOutUser, updateUser, setError, startDbOperation } = plansSlice.actions;

export default plansSlice.reducer;

export const getUserFromDb = (email, password) => {
  return async (dispatch) => {
    dispatch(startDbOperation());
    try {
      const response = await fetch(`/api/users/${email}/${password}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const user = await response.json();
      if (user.length === 1) {
        dispatch(addUser(user[0]));
      } else {
        const errorMessage = 'Email or password is erroneous';
        dispatch(setError(errorMessage));
        console.error(errorMessage);
      }
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err.message)
    }
  }
};

export const addUserToDb = (user) => {
  return async (dispatch) => {
    dispatch(startDbOperation());

    try {
      const create = { create: { ...user } };
      const response = await fetch("/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
      })
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(addUser(data));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err)
    };
  }
}


// export const deletePlanFromDb = (planId) => {
//   return async (dispatch) => {
//     dispatch(startDbOperation());

//     try {
//       const response = await fetch('/api/plans/' + planId,
//         {
//           method: 'DELETE'
//         });
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       const data = await response.json();
//       dispatch(deletePlan(data));
//     } catch (err) {
//       dispatch(setError(err.message));
//       console.error(err)
//     }
//   }
// };

// export const updatePlanInDb = (id, name, description) => {
//   return async (dispatch) => {
//     const update = { update: { name } };
//     dispatch(startDbOperation());

//     try {
//       const response = await fetch("/api/plans/" + id, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(update)
//       });
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       const data = await response.json();
//       dispatch(updatePlan(data));
//     } catch (err) {
//       dispatch(setError(err.message));
//       console.error(err)
//     }
//   }
// };



