import React from 'react';
// import Plans from './features/plans/Plans';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers'
import MainScreen from './features/mainScreen/MainScreen';

const theme = createMuiTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        // Original background was a lot darker with .5 opacity.
        backgroundColor: 'rgba(0,0,0,.3)',
      },
    },
  },
});

const store = configureStore({
  reducer: rootReducer
})

function App() {


  return (

    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainScreen />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
