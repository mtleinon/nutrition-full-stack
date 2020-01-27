import { createSlice } from '@reduxjs/toolkit';
import { fetchWithJwt } from '../../utils/fetchWithJwt';

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
      state
        .plans
        .splice(state.plans.findIndex(plan => plan.planId === planId), 1);
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

export const {
  addAllPlans,
  addPlan,
  deletePlan,
  updatePlan,
  startDbOperation,
  setError
} = plansSlice.actions;

export default plansSlice.reducer;

export const fetchPlansFromDb = () => {
  return async (dispatch) => {

    fetchWithJwt('/api/plans/', 'GET', null,
      dispatch, startDbOperation, addAllPlans, setError);
  }
};

export const addPlanToDb = (name, description = '') => {
  return async (dispatch) => {

    const newPlan = { newPlan: { name, description } };

    fetchWithJwt('/api/plans/', 'POST', newPlan,
      dispatch, startDbOperation, addPlan, setError);
  }
}

export const deletePlanFromDb = (planId) => {
  return async (dispatch) => {

    fetchWithJwt('/api/plans/' + planId, 'DELETE', null,
      dispatch, startDbOperation, deletePlan, setError);
  }
};


export const updatePlanInDb = (planId, name, description) => {
  return async (dispatch) => {

    const updateData = { plan: { name } };

    fetchWithJwt('/api/plans/' + planId, 'PATCH', updateData,
      dispatch, startDbOperation, updatePlan, setError);
  }
};



