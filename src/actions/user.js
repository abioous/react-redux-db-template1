

var {ApiAction, updateRecordCallback, removeRecordCallback} = require('../middlewear/action');


export function fetchAll(dispatch) {
    let action = new ApiAction('user', 'fetchAll', 'records').get('/api/user', 'get');
    return action(dispatch);
}

export function persist(dispatch, record, next) {
    let action = new ApiAction('user', 'persist', 'record', updateRecordCallback('records'), next).get('/api/user', 'post', record);
    return action(dispatch);
}


export function remove(dispatch, record, next) {
    let action = new ApiAction('user', 'remove', 'record', removeRecordCallback('records'), next).get('/api/user/' + record.id, 'delete');
    return action(dispatch);
}


