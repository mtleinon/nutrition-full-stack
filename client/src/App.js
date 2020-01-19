import React from 'react';
// import Plans from './features/plans/Plans';
import PlansM from './features/plans/PlansM';

import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer
})

function App() {
  return (
    <Provider store={store}>
      <PlansM />
    </Provider>
  );
}

export default App;
