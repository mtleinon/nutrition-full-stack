import { createSlice } from '@reduxjs/toolkit';
import { fetchWithJwt } from '../../utils/fetchWithJwt';

const initialState = {
  plans: [],
};
const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    initializePlans(state, _) {
      state.plans = initialState.plans;
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
  initializePlans,
  addAllPlans,
  addPlan,
  deletePlan,
  updatePlan,
} = plansSlice.actions;

export default plansSlice.reducer;

export const fetchPlansFromDb = () => {
  return async (dispatch) => {

    fetchWithJwt('/api/plans/', 'GET', null,
      dispatch, addAllPlans);
  }
};

export const addPlanToDb = (name, description = '') => {
  return async (dispatch) => {

    const newPlan = { newPlan: { name, description } };

    fetchWithJwt('/api/plans/', 'POST', newPlan,
      dispatch, addPlan);
  }
}

export const deletePlanFromDb = (planId) => {
  return async (dispatch) => {

    fetchWithJwt('/api/plans/' + planId, 'DELETE', null,
      dispatch, deletePlan);
  }
};

export const updatePlanInDb = (planId, name, description) => {
  return async (dispatch) => {

    const updateData = { plan: { name } };

    fetchWithJwt('/api/plans/' + planId, 'PATCH', updateData,
      dispatch, updatePlan);
  }
};



