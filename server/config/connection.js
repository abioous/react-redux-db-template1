var mysql = require('mysql')
var connection = mysql.createConnection({
    host	:'localhost',
    user	:'root',
    password:'dev',
    database:'test'

});

module.exports = connection;

