let axios = require('axios');


const REQUESTED = "REQUESTED";
const RECEIVED = "RECEIVED";
const FAILED = "FAILED";


function updateRecordCallback(recordsKey) {
    return function (state, response) {
        if (!response.data) {
            return
        }
        let records = state[recordsKey] || [];
        let record = response.data[0];
        if (record) {
            for (let i = 0; i < records.length; i++) {
                if (records[i].id === record.id) {
                    records[i] = record;
                    return;
                }
            }
            //if record was not found, then must be new thus inserted at the begining
            records.unshift(record);
        }
    }
}


function removeRecordCallback(recordsKey) {
    return function (state, response) {
        if (!response.data) {
            return
        }

        let records = state[recordsKey] || [];
        let record = response.data[0];
        if (record) {
            let newRecords = [];
            for (let i = 0; i < records.length; i++) {
                if (records[i].id === record.id) {
                    continue
                }
                newRecords.push(records[i]);
            }
            state[recordsKey] = newRecords;
        }
    }
}


function ApiAction(namespace, actionName, target, onReducer, next) {
    this.namespace = namespace;
    this.actionName = actionName;
    this.target = target || namespace;
    this.actionPrefix = namespace.toUpperCase() + "_" + actionName.toUpperCase();
    this.onReducer = onReducer; //current state, and response
    this.next = next;
    let self = this;

    this.requested = function () {
        return {
            type: this.actionPrefix + "_" + REQUESTED,
            apiAction: this,
            response: {
                status: 'pending',
            }
        }
    };

    this.received = function (response) {
        return {
            type: this.actionPrefix + "_" + RECEIVED,
            apiAction: this,
            response: response
        }
    };

    this.failed = function (response) {
        return {
            type: this.actionPrefix + "_" + FAILED,
            apiAction: this,
            response: response
        }
    };



    this.executeOnReducerIfNeeded = function (newState, response) {
        if (self.onReducer) {
            self.onReducer(newState, response);
        }
    };


    this.get = function (url, httpMethod, body) {
        return (dispatch) => {

            dispatch(self.requested());
            try {
                let httpCall = axios[httpMethod];
                let promise = httpCall(url, body);
                return promise.then(function (response) {
                    let data = response.data || response
                    dispatch(self.received(data));
                    if(data.status === 'ok' && self.next) {
                        self.next(data);
                    }
                }, function(response) {
                    dispatch(self.failed(response.data || response));
                });

            } catch (err) {
                dispatch(self.failed({status:'error', error:err}));
            }
        };
    };
}


module.exports = {
    'updateRecordCallback': updateRecordCallback,
    'removeRecordCallback':removeRecordCallback,
    'ApiAction': ApiAction,
};

