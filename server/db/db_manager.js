//ORM (object to relationship mapping)


var DbManager = class DbManager {

    constructor(connection) {
        this.connection = connection;
    }


    selectAll(sql, provider, mapper, parameters) {
        var connection = this.connection;
        return new Promise(function (resolve, reject) {
            connection.query(sql, parameters,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }

                    var result = [];
                    for (var i = 0; i < rows.length; i++) {
                        var mappedRecord = rows[i];
                        if (mapper) {
                            mappedRecord = mapper(mappedRecord);
                        }
                        result.push(new provider(mappedRecord));
                    }
                    resolve(result);
                }
            )
        })
    }

    persist(table, record, mapper) {
        var connection = this.connection;
        return new Promise(function (resolve, reject) {
            if (mapper) {
                record = mapper(record);
            }
            var sql = "";
            var parameters = [];


            if (record.id) {
                var columnValues = "";
                for (var k in record) {
                    if (columnValues.length > 0) {
                        columnValues += ","
                    }
                    columnValues += " " + k + " = ?"
                    parameters.push(record[k]);
                }
                parameters.push(record.id);
                sql = "UPDATE " + table + " SET " + columnValues + " WHERE id = ?"

            } else {
                var columns = "";
                var values = ""
                for (var k in record) {
                    if (columns.length > 0) {
                        columns += ","
                        values += ","
                    }
                    columns += k;
                    values += "?"
                    parameters.push(record[k]);
                }
                sql = "INSERT INTO " + table + "(" + columns + ") VALUES( " + values + ")";

            }
            connection.query(sql, parameters, function (err, result) {
                if (err) {
                    console.log(err);
                    if (err.sqlMessage) {
                        reject(err.sqlMessage);
                        return;
                    }
                    reject(err);
                    return;
                }
                if (result && 'insertId' in result && result.insertId) {
                    record.id = result.insertId;
                }
                resolve(record)
            });
        });
    }

    remove(table, record) {
        var connection = this.connection;
        let sql = "DELETE FROM " + table + " WHERE id = ?";
        let parameters  = [record.id];
        return new Promise(function (resolve, reject) {
            connection.query(sql, parameters, function (err) {
                if (err) {
                    console.log(err);
                    if (err.sqlMessage) {
                        reject(err.sqlMessage);
                        return;
                    }
                    reject(err);
                    return;
                }
                resolve([record])
            });
        });
    }

};


module.exports = DbManager;





