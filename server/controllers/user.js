const {User} = require('./../models/');

module.exports = (manager) => {

    return {

        readAll: function () {
            return manager.selectAll("SELECT id, name, email FROM user", User)
        },

        readById: function (id) {
            return manager.selectAll("SELECT id, name, email FROM user WHERE id = ?", User, undefined, id);
        },

        persist: function (record) {
            let self = this;
            return new Promise((resolve, reject) => {
                let onSucess = (record) => {
                    self.readById(record.id).then(resolve, reject);
                };
                manager.persist('user', record).then(onSucess, reject)

            });
        },

        remove: function (record) {
            return new Promise((resolve, reject) => {
                manager.remove('user', record).then(resolve, reject)
            });
        }
    }
};

