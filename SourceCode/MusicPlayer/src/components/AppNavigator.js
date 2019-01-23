import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import MusicItem from './MusicItem';

export const AppNavigator = StackNavigator({
    HomePage: { screen: HomePage },
    MusicItem: { 
        screen: MusicItem, 
        navigationOptions: {
            headerLeft: null,
        } 
    }
}, {
    initialRouteName: 'HomePage',
    mode: 'modal'
});
  
const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
    nav: state.nav,
});
  
export default connect(mapStateToProps)(AppWithNavigationState);
