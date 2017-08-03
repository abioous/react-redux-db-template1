import { combineReducers } from 'redux';


import User from './user';

const rootReducer = combineReducers({
    user: User
});

export default rootReducer;
