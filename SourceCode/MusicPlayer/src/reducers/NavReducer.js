import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../components/AppNavigator';

const router = AppNavigator.router;
const mainNavAction = router.getActionForPathAndParams('HomePage');
const initialNavState = router.getStateForAction(mainNavAction);

const NavReducer = (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
    case 'MusicItem':
        nextState = router.getStateForAction(
            NavigationActions.navigate({ routeName: 'MusicItem' }),
            state);
        break;
    default:
        nextState = router.getStateForAction(action, state);
        break;
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

export default NavReducer;