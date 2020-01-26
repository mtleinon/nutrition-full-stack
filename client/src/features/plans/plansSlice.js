import { createSlice } from '@reduxjs/toolkit';

const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: [],
    error: '',
    isLoading: false
  },
  reducers: {
    startDbOperation(state, _) {
      state.error = '';
      state.isLoading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    addAllPlans(state, action) {
      state.plans.push(...action.payload);
      state.isLoading = false;
    },
    addPlan(state, action) {
      state.plans.push(action.payload);
      state.isLoading = false;
    },
    deletePlan(state, action) {
      const { planId } = action.payload;
      state.plans.splice(state.plans.findIndex(plan => plan.planId === planId), 1);
      state.isLoading = false;
    },
    updatePlan(state, action) {
      const { planId, name, description } = action.payload;
      const plan = state.plans.find(plan => plan.planId === planId);
      if (plan) {
        plan.name = name;
        plan.description = description;
      }
      state.isLoading = false;
    }
  }
});

export const { addAllPlans, addPlan, deletePlan, updatePlan, startDbOperation, setError } = plansSlice.actions;

export default plansSlice.reducer;

export const fetchPlansFromDb = (userId) => {
  return async (dispatch, getState) => {
    dispatch(startDbOperation());
    const rootState = getState();
    try {
      const response = await fetch('/api/plans/' + userId);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const plansData = await response.json();
      dispatch(addAllPlans(plansData));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err.message)
    }
  }
};

export const addPlanToDb = (name, description = '') => {
  return async (dispatch) => {
    dispatch(startDbOperation());

    try {
      const create = { create: { name, description } };
      const response = await fetch("/api/plans", {
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
      dispatch(addPlan(data));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err)
    };
  }
}


export const deletePlanFromDb = (planId) => {
  return async (dispatch) => {
    dispatch(startDbOperation());

    try {
      const response = await fetch('/api/plans/' + planId,
        {
          method: 'DELETE'
        });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(deletePlan(data));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err)
    }
  }
};

export const updatePlanInDb = (id, name, description) => {
  return async (dispatch) => {
    const update = { update: { name } };
    dispatch(startDbOperation());

    try {
      const response = await fetch("/api/plans/" + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(updatePlan(data));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err)
    }
  }
};



