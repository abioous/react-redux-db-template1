

const connection =  require('./../config/connection');
const DbManager  = require('../db/db_manager');
const manager = new DbManager(connection);


const user = require('./user')(manager);

const onSuccess = (httpResponse) => {
    return  (records) =>  {
        let appResponse = {
            status: 'ok',
            data: records
        };
        httpResponse.json(appResponse);
    }
};


const onError =  (httpResponse) => {
    return  (err) => {
        let appResponse = {
            status: 'error',
            error: err
        };
        httpResponse.json(appResponse);

    }
};


module.exports = {
    user: user,
    api: {
        'onSuccess':onSuccess,
        'onError':onError
    }
};
