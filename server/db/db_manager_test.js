
var connection =  require('../config/connection')
var DbManager  = require('./db_manager');
var User = require('../models/user');


var manager = new DbManager(connection);

var onSuccess = function(rows) {
    console.log('data:');
    console.log(rows);
};


var onError = function (err) {
    console.log(err);
};

manager.selectAll('SELECT id, name FROM user', User).then(onSuccess, onError);




manager.persist('user', {id:1, name:'Rob'}).then(function(record) {
    console.log(record);
},function(err) {
    console.log(err);
});

