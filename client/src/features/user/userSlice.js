import { createSlice } from '@reduxjs/toolkit';
import { fetchWithJwt } from '../../utils/fetchWithJwt';

const initialState = {
  user: {
    userId: 0,
    email: '',
    name: '',
    gender: '',
    age: 0,
    weight: 0,
    height: 0,
  },
};

const plansSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
      console.log('User updation not implemented yet =', action);
    }
  }
});

export const { addUser, signInUser, signUpUser, signOutUser, updateUser } = plansSlice.actions;

export default plansSlice.reducer;

export const fetchUserDataFromDb = () => {
  return async (dispatch) => {

    fetchWithJwt('/api/users/', 'GET', null,
      dispatch, d => addUser(d[0]));
  }
};


export const signinUserToBackend = (email, password) => {
  return async (dispatch) => {

    const credentials = { user: { email, password } };

    const handleSuccessfulSignIn = (data) => {
      localStorage.setItem('jwtToken', data.token);
      return addUser(data.userData);
    }

    fetchWithJwt('/api/users/signin', 'POST', credentials,
      dispatch, handleSuccessfulSignIn, false);
  }
  //     });
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     const data = await response.json();
  //     if (data.userData) {
  //       dispatch(addUser(data.userData));
  //       localStorage.setItem('jwtToken', data.token);
  //     } else {
  //       const errorMessage = 'Email or password is erroneous';
  //       dispatch(mainPageSlice.setError(errorMessage));
  //       console.error(errorMessage);
  //     }
  //   } catch (err) {
  //     dispatch(mainPageSlice.setError(err.message));
  //     console.error(err.message)
  //   }
  // }
};

export const addUserToDb = (user) => {
  return async (dispatch) => {

    const newUser = { newUser: { ...user } };
    fetchWithJwt('/api/users/create', 'POST', newUser,
      dispatch, addUser, false);

    // dispatch(startDbOperation());

    // try {
    //   const create = { newUser: { ...user } };
    //   const response = await fetch("/api/users", {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(create)
    //   })
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   const data = await response.json();
    //   dispatch(addUser(data));
    // } catch (err) {
    //   dispatch(setError(err.message));
    //   console.error(err)
    // };
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



