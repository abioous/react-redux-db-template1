
import ApiReducer from './api';

let userApiReducer =  ApiReducer('user');


export default function (state = {}, action) {
    return userApiReducer(state, action);
}
