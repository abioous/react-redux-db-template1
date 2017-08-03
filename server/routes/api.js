const controller = require('../controllers/');

const {onSuccess, onError} = controller.api;


module.exports = (app) => {



    //user api routes starts
    app.get('/api/user',  (httpRequest, httpResponse) => {
        controller.user.readAll().then(onSuccess(httpResponse), onError(httpResponse));
    });

    app.get('/api/user/:id',(httpRequest, httpResponse) => {
        const id = parseInt(httpRequest.params["id"]);
        controller.user.readById(id).then(onSuccess(httpResponse), onError(httpResponse));
    });


    app.post('/api/user/', (httpRequest, httpResponse) => {
        controller.user.persist(httpRequest.body).then(onSuccess(httpResponse), onError(httpResponse));
    });

    app.delete('/api/user/:id', (httpRequest, httpResponse) => {
        const id = parseInt(httpRequest.params["id"]);
        controller.user.remove({'id':id}).then(onSuccess(httpResponse), onError(httpResponse));
    });

    //user api routes ends



};
