import { combineReducers } from 'redux'
import plansReducer from '../features/plans/plansSlice'
import mealsReducer from '../features/meals/mealsSlice'

export default combineReducers({
  plans: plansReducer,
  meals: mealsReducer,
});