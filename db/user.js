const knex = require('./connection')

module.exports ={

    getOne: function (user_id) {
        return knex('users').where('id', user_id).first();
    },
    getOneByUsername: function (username) {
        return knex('user').where('username', username).first();
    },
    create: function(user) {
        return knex('users').insert(user, 'user_id').then(ids => {
            return ids[0];
        })
    }
}
