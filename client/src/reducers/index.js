import { combineReducers } from 'redux'
import plansReducer from '../features/plans/plansSlice'
import mealsReducer from '../features/meals/mealsSlice'
import nutrientsReducer from '../features/nutrients/nutrientsSlice'
import finelliDataReducer from '../features/finelliData/finelliDataSlice'
import userReducer from '../features/user/userSlice'

export default combineReducers({
  plans: plansReducer,
  meals: mealsReducer,
  nutrients: nutrientsReducer,
  finelliData: finelliDataReducer,
  user: userReducer
});