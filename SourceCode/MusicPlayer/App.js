import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import AppReducer from './src/reducers/AppReducer';
import AppWithNavigationState from './src/components/AppNavigator';



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class ReduxExampleApp extends React.Component {

  store = createStoreWithMiddleware(AppReducer);
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}



export default ReduxExampleApp;
